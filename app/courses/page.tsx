"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import CourseForm from "../components/CourseForm";
import { ICourse, ITrainer } from "@/types";
import {format} from "date-fns"

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[] | null>(null);
  const [trainers, setTrainers] = useState<ITrainer[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses", {
        params: { page, search, sortBy, sortOrder },
      });
      setCourses(response.data.courses);
      setTotalPages(response.data.pages);
    } catch (error) {
      toast.error("Failed to fetch courses. Please try again.");
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("/api/trainers");
      setTrainers(response.data.trainers);
    } catch (error) {
      toast.error("Failed to fetch trainers. Please try again.");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      console.log("Deleting course with ID:", courseId); // Debug log
      await axios.delete(`/api/courses?id=${courseId}`); // Changed to use query parameter
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Delete error:", error); // Debug log
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const handleAssignTrainer = async (courseId: string, trainerId: string) => {
    try {
      console.log("Assigning trainer:", { courseId, trainerId }); // Debug log
      if (trainerId === "") {
        // For removing trainer
        await axios.post("/api/courses/assign", {
          courseId,
          trainerId: null,
        });
        toast.success("Trainer removed successfully!");
      } else {
        // For assigning trainer
        await axios.post("/api/courses/assign", {
          courseId,
          trainerId,
        });
        toast.success("Trainer assigned successfully!");
      }
      fetchCourses();
    } catch (error) {
      console.error("Assignment error:", error); // Debug log
      toast.error("Failed to update trainer assignment. Please try again.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page
  };

  const handleSort = (field: string) => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
  }, [page, search, sortBy, sortOrder]);
  console.log(courses)

  return (
    <div>
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setSelectedCourse(null);
              setIsModalOpen(true);
            }}
          >
            Add Course
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th
                className="py-3 px-4 border-b cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Course Name
              </th>
              <th
                className="py-3 px-4 border-b cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date
              </th>
              <th className="py-3 px-4 border-b">Subject</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Trainer</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course._id}>
                <td className="py-3 px-4 border-b">{course.name}</td>
                <td className="py-3 px-4 border-b">{format(course.date,"dd/MM/yyyy")}</td>
                <td className="py-3 px-4 border-b">{course.subject}</td>
                <td className="py-3 px-4 border-b">{course.location}</td>
                <td className="py-3 px-4 border-b">
                  {course.trainer ? course.trainer.name : "No trainer assigned"}
                </td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Delete
                  </button>
                  {course.trainer ? (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => handleAssignTrainer(course._id, "")}
                    >
                      Remove Trainer
                    </button>
                  ) : (
                    <select
                      className="border px-4 py-2 rounded"
                      onChange={(e) =>
                        handleAssignTrainer(course._id, e.target.value)
                      }
                    >
                      <option value="">Select Trainer</option>
                      {trainers?.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
        <Modal
          title={selectedCourse ? "Edit Course" : "Create Course"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <CourseForm
            initialValues={selectedCourse}
            onClose={() => setIsModalOpen(false)}
            fetchCourses={fetchCourses}
          />
        </Modal>
      </main>
    </div>
  );
}
