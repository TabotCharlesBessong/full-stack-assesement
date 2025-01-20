"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post("/api/auth", {
        ...values,
        action: "login",
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Store the token in localStorage
      toast.success("Login successful!");
      router.push("/"); // Redirect to dashboard or another page
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Username:
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password:
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}
