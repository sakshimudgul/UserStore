import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const PrivateRoute = ({ children }) => {
  const { user, token, isLoading } = useUserStore();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user || !token) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if account is active
  if (user && !user.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Inactive</h2>
          <p className="text-gray-600 mb-6">
            Your account has been deactivated. Please contact support for assistance.
          </p>
          <button
            onClick={() => {
              useUserStore.getState().logout();
              window.location.href = '/login';
            }}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // If authenticated and active, render the protected component
  return children;
};

export default PrivateRoute;