// app/api/courses/assign/route.ts
import Course from "@/models/courses.model";
import Trainer from "@/models/trainer.model";
import connectDB from "@/utils/db";
import { assignmentTemplate, removalTemplate } from "@/utils/emailTemplates";
import transporter from "@/utils/transport";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { courseId, trainerId } = await req.json();

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    // Handle trainer removal
    if (!trainerId || trainerId === "") {
      if (course.trainer) {
        // Get the current trainer's details before removal
        const currentTrainer = await Trainer.findById(course.trainer);
        if (currentTrainer) {
          // Send removal notification
          await transporter.sendMail({
            from: process.env.VERIFICATION_EMAIL,
            to: currentTrainer.email,
            subject: "Course Assignment Removal Notification",
            html: removalTemplate(currentTrainer.name, course.name),
          });
        }
      }

      course.trainer = undefined;
      await course.save();
      return NextResponse.json({ message: "Trainer removed successfully." });
    }

    // Handle new trainer assignment
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return NextResponse.json(
        { message: "Trainer not found." },
        { status: 404 }
      );
    }

    // Check for scheduling conflicts
    const conflictingCourse = await Course.findOne({
      trainer: trainerId,
      date: course.date,
      _id: { $ne: courseId }, // Exclude current course
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

    // If there's a current trainer, send them a removal notification
    if (course.trainer) {
      const currentTrainer = await Trainer.findById(course.trainer);
      if (currentTrainer) {
        await transporter.sendMail({
          from: process.env.VERIFICATION_EMAIL,
          to: currentTrainer.email,
          subject: "Course Assignment Removal Notification",
          html: removalTemplate(currentTrainer.name, course.name),
        });
      }
    }

    // Assign new trainer
    course.trainer = trainerId;
    await course.save();

    // Send assignment notification to new trainer
    await transporter.sendMail({
      from: process.env.VERIFICATION_EMAIL,
      to: trainer.email,
      subject: "New Course Assignment Notification",
      html: assignmentTemplate(trainer.name, course.name, course.date),
    });

    return NextResponse.json({ message: "Trainer assigned successfully." });
  } catch (error) {
    console.error("Assignment error:", error);
    return NextResponse.json(
      { message: "Failed to manage trainer assignment." },
      { status: 500 }
    );
  }
}
