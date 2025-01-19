import Course from "@/models/courses.model";
import Trainer from "@/models/trainer.model";
import connectDB from "@/utils/db";
import transporter from "@/utils/nodemailer";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await connectDB();
  const { courseId, trainerId } = await req.json();

  try {
    const course = await Course.findById(courseId);
    const trainer = await Trainer.findById(trainerId);

    if (!course || !trainer) {
      return NextResponse.json(
        { message: "Course or Trainer not found." },
        { status: 404 }
      );
    }

    // Check for scheduling conflicts
    const conflictingCourse = await Course.findOne({
      trainer: trainer._id,
      date: course.date,
    });

    if (conflictingCourse) {
      return NextResponse.json(
        {
          message:
            "Trainer is already scheduled for another course on this date.",
        },
        { status: 400 }
      );
    }

    // Assign trainer
    course.trainer = trainer._id;
    await course.save();

    // Send email
    await transporter.sendMail({
      from: "admin@seminars.com",
      to: trainer.email,
      subject: "New Course Assignment",
      text: `You have been assigned to the course "${course.name}" on ${course.date}.`,
    });

    return NextResponse.json({ message: "Trainer assigned successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to assign trainer." },
      { status: 500 }
    );
  }
}
