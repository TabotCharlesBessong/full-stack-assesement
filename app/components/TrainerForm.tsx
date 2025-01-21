import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

interface TrainerFormProps {
  onClose: () => void;
  fetchData: () => void;
  initialValues?: TrainerFormValues;
}

interface TrainerFormValues {
  _id?: string;
  name: string;
  trainerSubjects: string[];
  location: string;
  email: string;
}

const TrainerSchema = Yup.object().shape({
  name: Yup.string().required("Trainer name is required"),
  trainerSubjects: Yup.string().required("At least one subject is required"),
  location: Yup.string().required("Location is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const TrainerForm: React.FC<TrainerFormProps> = ({
  onClose,
  fetchData,
  initialValues = { name: "", trainerSubjects: [], location: "", email: "" },
}) => {
  const handleSubmit = async (values: TrainerFormValues) => {
    try {
      const processedValues = {
        ...values,
        trainerSubjects: values.trainerSubjects
          .toString()
          .split(",")
          .map((s) => s.trim()),
      };

      if (initialValues._id) {
        // Change from values.id to initialValues._id
        await axios.put("/api/trainers", {
          id: initialValues._id, // Change to match the API expectation
          ...processedValues,
        });
        toast.success("Trainer updated successfully!");
      } else {
        await axios.post("/api/trainers", processedValues);
        toast.success("Trainer created successfully!");
      }
      fetchData();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save trainer.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={TrainerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Trainer Name</label>
              <Field
                type="text"
                name="name"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Training Subjects</label>
              <Field
                type="text"
                name="trainerSubjects"
                className="w-full border px-3 py-2 rounded"
                placeholder="Comma-separated (e.g., React.js, Node.js)"
              />
              <ErrorMessage
                name="trainerSubjects"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <Field
                type="text"
                name="location"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TrainerForm