import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Save } from 'lucide-react';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, isLoading } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email
    }
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                <p className="text-primary-100">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    disabled={!isEditing}
                    className={`input-field pl-10 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
                {errors.name && (
                  <p className="error-text">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    disabled={!isEditing}
                    className={`input-field pl-10 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>

              {/* Password Change Section (only when editing) */}
              {isEditing && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          {...register('password', { 
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                          className="input-field pl-10"
                          placeholder="Leave blank to keep current"
                        />
                      </div>
                      {errors.password && (
                        <p className="error-text">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </>
                )}
              </div>
            </form>

            {/* Account Information */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account ID</span>
                  <span className="font-mono text-sm text-gray-900">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className="capitalize text-gray-900">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;