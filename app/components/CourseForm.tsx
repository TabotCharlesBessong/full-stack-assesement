import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const CourseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  date: Yup.date().required("Course date is required"),
  subject: Yup.string().required("Course subject is required"),
  location: Yup.string().required("Course location is required"),
  participants: Yup.number().min(1, "At least one participant is required"),
  price: Yup.number().min(0, "Price cannot be negative"),
  notes: Yup.string(),
});

export default function CourseForm({ onClose }: { onClose: () => void }) {
  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Course added successfully!");
        onClose();
      } else {
        toast.error("Failed to add course. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{ title: "", description: "", startDate: "", endDate: "" }}
      validationSchema={CourseSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <Field
              name="title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.title && touched.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <Field
              name="description"
              as="textarea"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <Field
              name="startDate"
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.startDate && touched.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <Field
              name="endDate"
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.endDate && touched.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Course
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
