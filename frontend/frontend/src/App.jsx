import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useUserStore from './store/useUserStore';

// Pages (you'll need to create these)
import Login from '../src/pages/Login';
import Register from '../src/pages/Registration';
import Profile from '../src/pages/Profile';
import Dashboard from '../src/pages/Dashboard';
import AdminDashboard from '../src/pages/AdminDashboard';

// Components
import PrivateRoute from '../src/components/PrivateRoute';
import AdminRoute from '../src/components/AdminRoute';
import Navbar from '../src/components/Navbar';

function App() {
  const { user } = useUserStore();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;