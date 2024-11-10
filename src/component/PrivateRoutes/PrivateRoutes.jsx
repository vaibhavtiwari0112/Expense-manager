// src/components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginState } from "../../pages/Login/Login.selectors";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");

  return token || token != undefined ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
