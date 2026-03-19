import React, { useEffect } from 'react';
import { User, Calendar, Mail, Shield, Award } from 'lucide-react';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, fetchProfile, isLoading } = useUserStore();

  useEffect(() => {
    fetchProfile().catch(() => {
      toast.error('Failed to fetch profile');
    });
  }, [fetchProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin-slow h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-lg p-3">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Role</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Account ID</p>
                  <p className="font-medium text-gray-900 text-sm">{user?.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="font-medium text-gray-900">
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'First login'}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium text-gray-900">
                  {new Date(user?.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(user?.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;