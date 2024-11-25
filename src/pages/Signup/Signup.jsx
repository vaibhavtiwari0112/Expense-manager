import React from "react";
import { useDispatch } from "react-redux";
import { register } from "./Signup.actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { REGEX_PATTERNS } from "../../constants";
import { useNavigate } from "react-router-dom";

const { NAME, EMAIL, PASSWORD } = REGEX_PATTERNS;
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(NAME, "Invalid name format")
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .matches(EMAIL, "Invalid email format")
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        PASSWORD,
        "Password must contain at least One Uppercase, One Lowercase, and One Number"
      )
      .min(8, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values)).then((res) => {
      if (res.payload.token) {
        toast.success(
          "SignUp successful! Check your email for the verification OTP."
        );
        navigate("/verify-email", { state: { email: values.email } });
        resetForm();
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Create Your Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="John Doe"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="you@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white hover:bg-purple-800 rounded-lg px-4 py-2 w-full"
            >
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
