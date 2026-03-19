import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Home, Shield, Menu, X } from 'lucide-react';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">UserStore</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;