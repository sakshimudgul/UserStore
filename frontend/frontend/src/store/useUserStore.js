import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../api/api';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      users: [],

      // Register user
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(userData);
          const { user, token } = response.data;
          
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false, error: null });
          
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Registration failed' 
          });
          throw error;
        }
      },

      // Login user
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(credentials);
          const { user, token } = response.data;
          
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false, error: null });
          
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Login failed' 
          });
          throw error;
        }
      },

      // Logout user
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, error: null });
      },

      // Fetch user profile
      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.getProfile();
          set({ user: response.data.user, isLoading: false });
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to fetch profile' 
          });
          throw error;
        }
      },

      // Update profile
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.updateProfile(userData);
          set({ user: response.data.user, isLoading: false });
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to update profile' 
          });
          throw error;
        }
      },

      // Fetch all users (admin only)
      fetchAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.getAllUsers();
          set({ users: response.data.users, isLoading: false });
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to fetch users' 
          });
          throw error;
        }
      },

      // Clear error
      clearError: () => set({ error: null })
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
);

export default useUserStore;