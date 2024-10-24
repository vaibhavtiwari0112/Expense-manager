import React from "react";
import { useSelector } from "react-redux";
import { selectWelcomeMessage } from "./Home.selectors";

const Home = () => {
  const welcomeMessage = useSelector(selectWelcomeMessage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-4">{welcomeMessage}</h1>
      <p className="mb-8 text-lg">
        Track your expenses easily and efficiently.
      </p>
      <div className="flex space-x-4">
        <button className="bg-white text-purple-700 hover:bg-gray-200 rounded-lg px-4 py-2 shadow-lg">
          View Expenses
        </button>
        <button className="bg-white text-purple-700 hover:bg-gray-200 rounded-lg px-4 py-2 shadow-lg">
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default Home;
