import Course from "@/models/courses.model";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sortBy") || "date";
  const sortOrder = url.searchParams.get("sortOrder") === "desc" ? -1 : 1;

  try {
    const query = search ? { name: new RegExp(search, "i") } : {};
    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("trainer");

    return NextResponse.json({
      courses,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courses." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  try {
    const course = new Course(body);
    await course.save();
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create course." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  console.log("Received ID for deletion:", id); // Debug log

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Course ID is required." },
        { status: 400 }
      );
    }
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Delete error in API:", error); // Debug log
    return NextResponse.json(
      { message: "Failed to delete course." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...updates } = await req.json();

  console.log("Updating course with ID:", id, "Updates:", updates); // Debug log

  try {
    const course = await Course.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("trainer");

    if (!course) {
      console.log("Course not found with ID:", id); // Debug log
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error("Update error in API:", error); // Debug log
    return NextResponse.json(
      { message: "Failed to update course." },
      { status: 500 }
    );
  }
}
