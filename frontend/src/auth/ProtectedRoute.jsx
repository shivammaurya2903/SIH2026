import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1D4ED8' }}>Authenticating session...</div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role) && role !== 'admin') {
    return <Navigate to="/auth/unauthorized" replace />;
  }

  return children;
};
