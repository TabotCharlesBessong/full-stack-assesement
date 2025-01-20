import Trainer from "@/models/trainer.model";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortOrder = url.searchParams.get("sortOrder") === "desc" ? -1 : 1;

  try {
    const query = search ? { name: new RegExp(search, "i") } : {};
    const total = await Trainer.countDocuments(query);
    const trainers = await Trainer.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      trainers,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch trainers." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  try {
    const trainer = new Trainer({
      ...body,
      trainerSubjects: Array.isArray(body.trainerSubjects)
        ? body.trainerSubjects
        : body.trainerSubjects.split(",").map((s: string) => s.trim()),
    });
    await trainer.save();
    return NextResponse.json(trainer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create trainer." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await connectDB();
  const { trainerId, trainerSubjects, ...updates } = await req.json();

  try {
    const processedSubjects = Array.isArray(trainerSubjects)
      ? trainerSubjects
      : trainerSubjects.split(",").map((s: string) => s.trim());

    const trainer = await Trainer.findByIdAndUpdate(
      trainerId,
      { ...updates, trainerSubjects: processedSubjects },
      { new: true }
    );

    if (!trainer) {
      return NextResponse.json(
        { message: "Trainer not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(trainer);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update trainer." },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  await connectDB();
  const { trainerId } = await req.json();

  try {
    const trainer = await Trainer.findByIdAndDelete(trainerId);
    if (!trainer) {
      return NextResponse.json(
        { message: "Trainer not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Trainer deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete trainer." },
      { status: 500 }
    );
  }
}
