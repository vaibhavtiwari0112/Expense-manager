import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpenses/AddExpense";
import PrivateRoute from "./component/PrivateRoutes";
import VerifyEmail from "./pages/VerifyEmail";
import User from "./pages/user";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route
        path="/add-expense"
        element={<PrivateRoute element={<AddExpense />} />}
      />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
