import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWelcomeMessage } from "./Home.selectors";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchTransactions } from "../Dashboard/Dashboard.actions";

const Home = () => {
  const welcomeMessage = useSelector(selectWelcomeMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewExpenses = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const page = 0;
      const itemsPerPage = 5;
      const interval = "monthly";

      dispatch(fetchTransactions({ page, itemsPerPage, interval }))
        .then(() => navigate("/dashboard"))
        .catch((error) => console.error("Error fetching transactions:", error));
    } else {
      navigate("/login");
    }
  };

  const handleAddExpense = () => {
    navigate("/add-expense");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-4">{welcomeMessage}</h1>
      <p className="mb-8 text-lg">
        Track your expenses easily and efficiently.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleViewExpenses}
          className="bg-white text-purple-700 hover:bg-gray-200 rounded-lg px-4 py-2 shadow-lg"
        >
          View Expenses
        </button>
        <button
          onClick={handleAddExpense}
          className="bg-white text-purple-700 hover:bg-gray-200 rounded-lg px-4 py-2 shadow-lg"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default Home;
