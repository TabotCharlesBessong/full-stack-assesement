"use client";

import { ITrainer } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import TrainerForm from "../components/TrainerForm";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

export default function Trainers() {
  const [trainers, setTrainers] = useState<ITrainer[] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("/api/trainers", {
        params: { page, search, sortBy, sortOrder },
      });
      setTrainers(response.data.trainers);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setTrainers([]);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [page, search, sortBy, sortOrder]);

  const handleDelete = async (trainerId: string) => {
    try {
      await axios.delete(`/api/trainers?id=${trainerId}`); // Change to use query parameter
      toast.success("Trainer deleted successfully!");
      fetchTrainers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete trainer.");
    }
  };


  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trainers</h1>

        <div className="mb-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search trainers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-1/3"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setSelectedTrainer(null);
              setIsCreateModalOpen(true);
            }}
          >
            Create a new trainer
          </button>
        </div>

        <div className="overflow-x-auto">
          {trainers && trainers.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    onClick={() => {
                      setSortBy("name");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                    className="py-3 px-4 cursor-pointer text-gray-600 font-semibold"
                  >
                    Trainer Name
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">
                    Subjects
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">
                    Location
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer._id} className="border-b">
                    <td className="py-3 px-4">{trainer.name}</td>
                    <td className="py-3 px-4">
                      {trainer.trainerSubjects.join(", ")}
                    </td>
                    <td className="py-3 px-4">{trainer.location}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`mailto:${trainer.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {trainer.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setSelectedTrainer(trainer);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setSelectedTrainer(trainer);
                          setIsDeleteModalOpen(true);
                          // handleDelete(trainer.id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 mt-4">No trainers found.</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>

        {/* Create Modal */}
        <Modal
          title="Create Trainer"
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <TrainerForm
            onClose={() => setIsCreateModalOpen(false)}
            fetchData={fetchTrainers}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Edit Trainer"
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          {selectedTrainer && (
            <TrainerForm
              initialValues={selectedTrainer}
              onClose={() => setIsEditModalOpen(false)}
              fetchData={fetchTrainers}
            />
          )}
        </Modal>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
          trainer={selectedTrainer}
        />
      </div>
    </div>
  );
}
