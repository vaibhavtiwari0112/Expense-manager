import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
          >
            Signup
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
