import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select"; // Import Select from react-select
import { addExpense } from "./AddExpenses.actions";
import { useDispatch } from "react-redux";

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "INR", label: "INR" },
  { value: "GBP", label: "GBP" },
];

const AddExpense = () => {
  const dispatch = useDispatch();
  const initialValues = {
    type: "",
    amount: "",
    currency: null,
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
    console.log("<<<<<<<<<<<<<<<<<<");
    dispatch(addExpense(dataToSend));
    console.log("MMMMMMMMMMMMMMMMMMMMMM");
    resetForm(); // Reset the form after submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Add Expense
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="border border-gray-300 rounded-lg p-2 w-full"
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
                <label className="block text-gray-700 mb-2" htmlFor="amount">
                  Amount
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className="border border-gray-300 rounded-lg p-2 w-full"
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
                <Select
                  options={currencyOptions}
                  onChange={(option) => setFieldValue("currency", option)}
                  isClearable
                />
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="border border-gray-300 rounded-lg p-2 w-full"
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
