import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { ICourse } from "@/types";

export const CourseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  date: Yup.date().required("Course date is required"),
  subject: Yup.string().required("Course subject is required"),
  location: Yup.string().required("Course location is required"),
  participants: Yup.number().min(1, "At least one participant is required"),
  price: Yup.number().min(0, "Price cannot be negative"),
  notes: Yup.string(),
});

export default function CourseForm({
  initialValues,
  onClose,
  fetchCourses,
}: {
  initialValues?: ICourse | null;
  onClose: () => void;
  fetchCourses: () => void;
}) {
  const handleSubmit = async (values: any) => {
    try {
      if (initialValues) {
        console.log("Updating course:", initialValues._id, values); // Debug log
        const response = await axios.put("/api/courses", {
          id: initialValues._id, // Changed from courseId to id to match API
          ...values,
        });
        console.log("Update response:", response.data); // Debug log
        toast.success("Course updated successfully!");
      } else {
        await axios.post("/api/courses", values);
        toast.success("Course created successfully!");
      }
      onClose();
      fetchCourses();
    } catch (error) {
      console.error("Submit error:", error); // Debug log
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={
        initialValues || {
          name: "",
          date: "",
          location: "",
          price: "",
          notes: "",
          participants: "",
          subject: "",
        }
      }
      validationSchema={CourseSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <Field
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter course name"
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Course Note</label>
            <Field
              name="notes"
              as="textarea"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter course note"
            />
            {errors.notes && touched.notes && (
              <p className="text-red-500 text-sm">{errors.notes}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Course Date</label>
            <Field
              name="date"
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.date && touched.date && (
              // @ts-ignore
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <Field
              name="location"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter course location"
            />
            {errors.location && touched.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <Field
              name="price"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter course price"
            />
            {errors.price && touched.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <Field
              name="subject"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter subject"
            />
            {errors.subject && touched.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <Field
              name="participants"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter number of participants"
            />
            {errors.participants && touched.participants && (
              <p className="text-red-500 text-sm">{errors.participants}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {initialValues ? "Update Course" : "Add Course"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
