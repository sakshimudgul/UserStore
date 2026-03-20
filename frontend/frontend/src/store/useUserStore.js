// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import * as api from '../api/api';

// const useUserStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isLoading: false,
//       error: null,
//       users: [],

//       // Register user
//       register: async (userData) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.register(userData);
//           const { user, token } = response.data;
          
//           localStorage.setItem('token', token);
//           set({ user, token, isLoading: false, error: null });
          
//           return response.data;
//         } catch (error) {
//           set({ 
//             isLoading: false, 
//             error: error.response?.data?.message || 'Registration failed' 
//           });
//           throw error;
//         }
//       },

//       // Login user
//       login: async (credentials) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.login(credentials);
//           const { user, token } = response.data;
          
//           localStorage.setItem('token', token);
//           set({ user, token, isLoading: false, error: null });
          
//           return response.data;
//         } catch (error) {
//           set({ 
//             isLoading: false, 
//             error: error.response?.data?.message || 'Login failed' 
//           });
//           throw error;
//         }
//       },

//       // Logout user
//       logout: () => {
//         localStorage.removeItem('token');
//         set({ user: null, token: null, error: null });
//       },

//       // Fetch user profile
//       fetchProfile: async () => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.getProfile();
//           set({ user: response.data.user, isLoading: false });
//           return response.data;
//         } catch (error) {
//           set({ 
//             isLoading: false, 
//             error: error.response?.data?.message || 'Failed to fetch profile' 
//           });
//           throw error;
//         }
//       },

//       // Update profile
//       updateProfile: async (userData) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.updateProfile(userData);
//           set({ user: response.data.user, isLoading: false });
//           return response.data;
//         } catch (error) {
//           set({ 
//             isLoading: false, 
//             error: error.response?.data?.message || 'Failed to update profile' 
//           });
//           throw error;
//         }
//       },

//       // Fetch all users (admin only)
//       fetchAllUsers: async () => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.getAllUsers();
//           set({ users: response.data.users, isLoading: false });
//           return response.data;
//         } catch (error) {
//           set({ 
//             isLoading: false, 
//             error: error.response?.data?.message || 'Failed to fetch users' 
//           });
//           throw error;
//         }
//       },

//       // Clear error
//       clearError: () => set({ error: null })
//     }),
//     {
//       name: 'user-storage',
//       getStorage: () => localStorage,
//       partialize: (state) => ({ user: state.user, token: state.token })
//     }
//   )
// );

// export default useUserStore;

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
      
      // Add these for request deduplication
      profileFetchPromise: null,
      profileFetchInProgress: false,

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
          
          // Reset profile fetch state on login
          set({ 
            user, 
            token, 
            isLoading: false, 
            error: null,
            profileFetchPromise: null,
            profileFetchInProgress: false 
          });
          
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
        set({ 
          user: null, 
          token: null, 
          error: null,
          profileFetchPromise: null,
          profileFetchInProgress: false 
        });
      },

      // Fetch user profile with deduplication
      fetchProfile: async () => {
        const state = get();
        
        // If we already have user data, return it immediately
        if (state.user) {
          return state.user;
        }
        
        // If a fetch is already in progress, return the existing promise
        if (state.profileFetchInProgress && state.profileFetchPromise) {
          console.log('Profile fetch already in progress, reusing promise');
          return state.profileFetchPromise;
        }
        
        // Set loading state and create new promise
        set({ isLoading: true, error: null, profileFetchInProgress: true });
        
        // Create the fetch promise
        const fetchPromise = (async () => {
          try {
            const response = await api.getProfile();
            const userData = response.data.user;
            
            set({ 
              user: userData, 
              isLoading: false, 
              error: null,
              profileFetchInProgress: false,
              profileFetchPromise: null 
            });
            
            return userData;
          } catch (error) {
            set({ 
              isLoading: false, 
              error: error.response?.data?.message || 'Failed to fetch profile',
              profileFetchInProgress: false,
              profileFetchPromise: null 
            });
            throw error;
          }
        })();
        
        // Store the promise
        set({ profileFetchPromise: fetchPromise });
        
        return fetchPromise;
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