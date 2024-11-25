import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { sendOTP, verifyOTP, resendOTP } from "./verifyEmail.actions";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);

  const email = location.state?.email;

  useEffect(() => {
    const isVerified = localStorage.getItem("isVerified");

    if (!email) {
      toast.error("No email provided for verification.");
      navigate("/login");
      return;
    }

    if (isVerified === "true") {
      toast.success("Email already verified.");
      navigate("/");
      return;
    }

    sendOTP(email);
  }, [email, navigate]);

  const initialValues = { otp: "" };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await verifyOTP(email, values.otp);
      if (response.success) {
        toast.success("Email verified successfully!");
        localStorage.setItem("isVerified", true);
        navigate("/");
      }
    } finally {
      resetForm();
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      await resendOTP(email);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500">
      <Toaster position="top-center" />
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-extrabold text-center text-white mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-white/80 text-sm mb-6">
          Please enter the OTP sent to{" "}
          <span className="font-medium">{email}</span>.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="otp"
              >
                One-Time Password (OTP)
              </label>
              <Field
                type="text"
                id="otp"
                name="otp"
                className="border border-white/30 rounded-lg p-3 w-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 placeholder-white/70"
                placeholder="Enter 6-digit OTP"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-300 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 rounded-lg px-4 py-2 w-full mt-4 transition duration-300 transform hover:scale-105"
            >
              Verify
            </button>
          </Form>
        </Formik>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isResending}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold hover:from-blue-700 hover:to-teal-700 rounded-lg px-4 py-2 w-full mt-4 transition duration-300 transform hover:scale-105 flex justify-center items-center"
        >
          {isResending ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : null}
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
