import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "./user.actions";
import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from "./user.selectors";
import { toast } from "react-hot-toast";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CurrencyInput from "react-currency-input-field";
import NavigateButton from "../../component/NavigateButton";
import LoadingComponent from "../../component/Loading";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  salary: Yup.number().required("Salary is required").positive().integer(),
  salary_type: Yup.string().required("Salary type is required"),
  salaryDate: Yup.number().required("Salary date is required").min(1).max(31),
});

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    salary_type: "",
    salaryDate: "",
    profileImageUrl: "",
    profileImagePath: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setInitialValues({
        name: user.name,
        email: user.email,
        phone: user.phone,
        salary: user.salary,
        salary_type: user.salary_type,
        salaryDate: new Date(user.salaryDate).getDate(),
        profileImageUrl: user.profileImageUrl || "",
        profileImagePath: user.profileImagePath || "",
      });
    }
  }, [user]);

  const handleSalaryChange = (value) => {
    setFieldValue("salary", value);
  };

  const handleSubmit = (values) => {
    const formattedSalaryDate = new Date(
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        values.salaryDate
      )
    ).toISOString();

    dispatch(
      updateUserProfile({
        ...values,
        salaryDate: formattedSalaryDate,
        profileImagePath: newProfileImage || user.profileImagePath,
      })
    );
    toast.success("User profile updated successfully!");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  const handleImageSave = async () => {
    try {
      await dispatch(
        updateUserProfile({
          profileImagePath: newProfileImage,
        })
      );
      toast.success("Profile image updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile image. Please try again.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size is too large. Please upload a smaller image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <NavigateButton
        path="login"
        message="Authentication failed. Please log in again."
        isOpen={true}
      />
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-xl border border-white">
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsModalOpen(true)}
            className="h-20 w-20 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-3xl font-bold shadow-lg cursor-pointer"
          >
            {user?.profileImagePath ? (
              <img
                src={user.profileImagePath}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-lg w-80 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Upload Profile Picture
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full mb-4 rounded-lg bg-white p-2"
                />
                <p className="text-sm text-white mb-4">
                  <span className="font-bold">Note:</span> Profile image size
                  must be less than 2MB.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageSave}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-semibold mt-4 text-white">
            User Profile
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white">
                  Name
                </label>
                <Field
                  name="name"
                  className="mt-1 block w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Phone
                </label>
                <div className="relative">
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={initialValues.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    className="w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Salary
                </label>
                <Field name="salary">
                  {({ field }) => (
                    <CurrencyInput
                      {...field}
                      id="salary"
                      name="salary"
                      prefix="₹"
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalScale={2}
                      allowNegative={false}
                      value={field.value}
                      onValueChange={(value) => setFieldValue("salary", value)}
                      className="mt-1 block w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                      placeholder="₹0"
                    />
                  )}
                </Field>
                {errors.salary && touched.salary && (
                  <div className="text-red-500 text-sm">{errors.salary}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Salary Type
                </label>
                <Field
                  as="select"
                  name="salary_type"
                  className="mt-1 block w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                {errors.salary_type && touched.salary_type && (
                  <div className="text-red-500 text-sm">
                    {errors.salary_type}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Salary Date (Day of the Month)
                </label>
                <Field
                  as="select"
                  name="salaryDate"
                  className="mt-1 block w-full rounded-lg p-3 text-gray-800 border border-gray-300 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-500 transition"
                >
                  {[...Array(31).keys()].map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Field>
                {errors.salaryDate && touched.salaryDate && (
                  <div className="text-red-500 text-sm">
                    {errors.salaryDate}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-purple-600 text-white text-lg font-semibold rounded-lg transition hover:bg-purple-700"
              >
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default User;
