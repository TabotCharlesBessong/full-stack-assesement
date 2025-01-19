import { useState } from "react";
import Header from "../components/Header";

export default function Trainers() {
  const [trainers] = useState([
    {
      id: "1",
      trainerName: "Jane Doe",
      trainerSubjects: ["React.js", "Next.js"],
      trainerLocation: "Stuttgart, Germany",
      trainerEmail: "jane.doe@example.com",
    },
  ]);

  const user = "John Doe"; // Replace with actual user logic

  const handleSignOut = () => {
    // Add sign-out logic here
    console.log("User signed out");
  };

  return (
    <div>
      <Header user={user} onSignOut={handleSignOut} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trainers</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Create Trainer
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="w-full bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Trainer Name
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Subjects
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Location
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-b">
                  <td className="py-3 px-4">{trainer.trainerName}</td>
                  <td className="py-3 px-4">
                    {trainer.trainerSubjects.join(", ")}
                  </td>
                  <td className="py-3 px-4">{trainer.trainerLocation}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`mailto:${trainer.trainerEmail}`}
                      className="text-blue-500 hover:underline"
                    >
                      {trainer.trainerEmail}
                    </a>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
