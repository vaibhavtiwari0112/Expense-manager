import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../pages/Login/Login.reducer"; // Adjust the path if necessary
import { fetchTransactions } from "../../pages/Dashboard/Dashboard.actions";

const Navbar = () => {
  const token = localStorage.getItem("authToken"); // Get user from either login or signup state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDashboardClick = () => {
    const page = 0;
    const itemsPerPage = 5;
    const interval = "monthly";
    dispatch(fetchTransactions({ page, itemsPerPage, interval }))
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        <div className="flex space-x-6">
          {!token ? (
            <>
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
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition duration-300"
                onClick={handleDashboardClick}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-red-600 px-4 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
