import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, loadTokenFromStorage } from "../../pages/Login/Login.reducer";
import { fetchTransactions } from "../../pages/Dashboard/Dashboard.actions";
import Avatar from "react-avatar";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const isVerified = localStorage.getItem("isVerified");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
    dispatch(loadTokenFromStorage());
  }

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDashboardClick = () => {
    const page = 0;
    const itemsPerPage = 5;
    const interval = "monthly";
    const type = "expenses";
    dispatch(fetchTransactions({ page, itemsPerPage, interval, expenses }))
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        <div className="flex space-x-6 items-center">
          {!token || isVerified !== "true" ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-indigo-300 px-4 py-2 rounded transition duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-indigo-300 px-4 py-2 rounded transition duration-300 ease-in-out"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:text-indigo-300 px-4 py-2 rounded transition duration-300 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-white hover:text-indigo-300 px-4 py-2 rounded transition duration-300 ease-in-out"
                onClick={handleDashboardClick}
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                {user && user.profileImagePath ? (
                  <img
                    src={user.profileImagePath} // Display the profile picture
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <Avatar
                    name={user?.name || "User"}
                    size="40"
                    round
                    textSizeRatio={2}
                  />
                )}
                <Link
                  to="/user"
                  className="text-white hover:text-indigo-300 transition duration-300 ease-in-out"
                >
                  {user?.name || "User"}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-300 px-4 py-2 rounded transition duration-300 ease-in-out"
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
