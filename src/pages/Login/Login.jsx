import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Login.actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(login(values)).then((res) => {
        if(res.payload.token){
        toast.success(
          "Login successful! Check your email for the verification OTP."
        );
        navigate("/verify-email", { state: { email: values.email } });
        resetForm();}
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async (response) => {
    const { credential } = response;
    try {
      const { data } = await axiosInstance.post("/auth/google", {
        token: credential,
      });
      dispatch(login({ user: data.user, token: data.token }));
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Log In
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
              Log In
            </button>
          </Form>
        </Formik>
        <div id="google-login-btn" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Login;
