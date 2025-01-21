import Course from "@/models/courses.model";
import Trainer from "@/models/trainer.model";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  try {
    // Total number of courses
    const totalCourses = await Course.countDocuments();

    // Total number of trainers
    const totalTrainers = await Trainer.countDocuments();

    // Upcoming courses (courses with date in the future)
    const upcomingCourses = await Course.countDocuments({
      date: { $gt: new Date() }, // Greater than current date
    });

    // Completed courses (courses with date in the past)
    const completedCourses = await Course.countDocuments({
      date: { $lt: new Date() }, // Less than current date
    });

    // const upcomingCourses = totalCourses - completedCourses

    return NextResponse.json({
      totalCourses,
      totalTrainers,
      upcomingCourses,
      completedCourses,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch stats." },
      { status: 500 }
    );
  }
}
