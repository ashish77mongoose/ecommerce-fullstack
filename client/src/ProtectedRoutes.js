import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("ashishToken")) {
    return children;
  }
  return <Navigate to="/login" />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
