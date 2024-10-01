import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );
        console.log("Login response:", response.data);
        router.push("/");
      } catch (error: any) {
        console.error("Error logging in:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to login. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard Login</h1>
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>
          {/* Password field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
