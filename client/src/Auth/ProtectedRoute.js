// Auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  console.log('Token:', token);  // Adjust if needed
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
