import React, { useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  return userDetails ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
