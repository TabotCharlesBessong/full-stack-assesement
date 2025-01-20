"use client"

import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import CourseForm from "../components/CourseForm";


const sampleCourses = [
  {
    id: 1,
    name: "React.js Fundamentals",
    date: "2024-10-15",
    subject: "React.js",
    location: "Stuttgart",
    participants: 15,
    notes: "Introduction to React.js",
    price: 250,
    trainer: {
      name: "Jane Doe",
      trainingSubjects: ["React.js"],
      location: "Stuttgart",
      email: "jane.doe@example.com",
    },
  },
  {
    id: 2,
    name: "Node.js Basics",
    date: "2024-10-22",
    subject: "Node.js",
    location: "Stuttgart",
    participants: 10,
    notes: "Introduction to Node.js",
    price: 200,
    trainer: null,
  },
];

const sampleTrainers = [
  {
    id: 1,
    name: "Jane Doe",
    trainingSubjects: ["React.js"],
    location: "Stuttgart",
    email: "jane.doe@example.com",
  },
  {
    id: 2,
    name: "John Smith",
    trainingSubjects: ["Node.js"],
    location: "Stuttgart",
    email: "john.smith@example.com",
  },
];

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("/api/trainers");
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleAssignTrainer = async (courseId:string, trainerId:string) => {
    try {
      await axios.put(`/api/courses/${courseId}/assign`, { trainerId });
      toast.success("Trainer assigned successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Error assigning trainer:", error);
      toast.error("Failed to assign trainer.");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
  }, []);
  return (
    <div>
      {/* <Header user="John Doe" onSignOut={() => {}} /> */}
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
        >
          Add Course
        </button>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Course Name</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Subject</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Trainer</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleCourses.map((course) => (
              <tr key={course.id}>
                <td className="py-3 px-4 border-b">{course.name}</td>
                <td className="py-3 px-4 border-b">{course.date}</td>
                <td className="py-3 px-4 border-b">{course.subject}</td>
                <td className="py-3 px-4 border-b">{course.location}</td>
                <td className="py-3 px-4 border-b">
                  {course.trainer ? (
                    <div>
                      <div>
                        <strong>{course.trainer.name}</strong>
                      </div>
                      <div>{course.trainer.trainingSubjects.join(", ")}</div>
                      <div>{course.trainer.email}</div>
                    </div>
                  ) : (
                    <span>No trainer assigned</span>
                  )}
                </td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
                    Delete
                  </button>
                  {course.trainer ? (
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
                      Remove Trainer
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <select className="border border-gray-300 px-4 py-2 rounded-lg shadow-md">
                        <option value="">Select Trainer</option>
                        {sampleTrainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Assign Trainer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal title="Create a new course" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CourseForm
            // initialValues={selectedCourse}
            onClose={() => setIsModalOpen(false)}
            // fetchData={fetchCourses}
          />
        </Modal>
      </main>
    </div>
  );
}
