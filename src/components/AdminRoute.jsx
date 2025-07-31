import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  return children;
};

export default AdminRoute;