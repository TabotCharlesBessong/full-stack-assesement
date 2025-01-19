import Header from "../components/Header";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [stats] = useState({
    totalCourses: 5,
    totalTrainers: 12,
    upcomingCourses: 3,
    completedCourses: 2,
  });

  const user = "John Doe"; // Replace with actual user logic

  const handleSignOut = () => {
    // Add sign-out logic here
    console.log("User signed out");
  };

  return (
    <div>
      <Header user={user} onSignOut={handleSignOut} />
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalCourses}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Trainers</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalTrainers}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Courses</h2>
            <p className="text-3xl font-bold text-orange-600">
              {stats.upcomingCourses}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
            <p className="text-3xl font-bold text-gray-600">
              {stats.completedCourses}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/courses"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            View Courses
          </Link>
          <Link
            href="/trainers"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
          >
            View Trainers
          </Link>
        </div>
      </main>
    </div>
  );
}
