import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/db";
import User from "@/models/user.model";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  await connectDB();
  const { username, password, action } = await req.json();

  if (action === "register") {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.json(
          { message: "Username already exists." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      return NextResponse.json(
        { message: "User registered successfully." },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
  } else if (action === "login") {
    try {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
          { message: "Invalid credentials." },
          { status: 401 }
        );
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return NextResponse.json({ token, message: "Login successful." });
    } catch (error) {
      return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Invalid action." }, { status: 400 });
}

export async function GET(req: Request) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  return NextResponse.json({ message: "Logout successful." });
}
