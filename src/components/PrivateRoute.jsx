import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "./api/api_lofin"; // ton auth.js

export default function PrivateRoute({ children }) {
  const token = getToken();
  const role = getUserRole();
  if (role !== "agent") {
    return <Navigate to="/" replace />;
  }
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
