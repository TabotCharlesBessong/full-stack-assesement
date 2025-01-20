import { ITrainer } from "@/types";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  trainer,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (trainerId: string) => void;
  trainer: ITrainer | null;
}) => {
  if (!isOpen || !trainer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Trainer</h2>
        <p>Are you sure you want to delete {trainer.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(trainer.id!)} // Non-null assertion because trainer is defined
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;