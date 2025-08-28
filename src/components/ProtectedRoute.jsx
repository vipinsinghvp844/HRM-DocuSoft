import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Component,
  allowedRoles,
  userRole,
  ...rest
}) => {
  // agar login hi nahi hai
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  // agar role match nahi hua
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
