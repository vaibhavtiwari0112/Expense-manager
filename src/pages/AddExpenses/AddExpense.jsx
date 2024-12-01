import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addExpense } from "./AddExpenses.actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const AddExpense = () => {
  const dispatch = useDispatch();
  const initialValues = {
    type: "",
    amount: "",
    currency: { value: "INR", label: "INR" },
    description: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Select a type"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Must be a positive number"),
    currency: Yup.object().required("Select a currency"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const dataToSend = {
      type: values.type,
      amount: values.amount,
      currency: values.currency.value,
      description: values.description,
    };

    dispatch(addExpense(dataToSend)).then((res) => {
      toast.success("Added expense Successfully!");
    });
    resetForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Add Expense
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring focus:ring-purple-300"
                >
                  <option value="" label="Select type" />
                  <option value="expense" label="Expense" />
                  <option value="saving" label="Saving" />
                  <option value="investment" label="Investment" />
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <Field
                  type="number"
                  name="amount"
                  className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring focus:ring-purple-300"
                  placeholder="Enter amount"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Currency</label>
                <div className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 text-gray-700">
                  INR
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring focus:ring-purple-300"
                  placeholder="Enter a brief description"
                  rows="3"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-700 text-white hover:bg-purple-800 rounded-lg px-4 py-2 w-full"
              >
                Add Expense
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddExpense;
