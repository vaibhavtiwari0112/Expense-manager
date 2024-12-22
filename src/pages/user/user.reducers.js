import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "./user.actions";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isVerified: localStorage.getItem("isVerified") === "true" || false,
  status: "idle", // Possible values: 'idle', 'loading', 'succeeded', 'failed'
  error: null, // To store any error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear user-related information from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("isVerified");

      state.user = null;
      state.token = null;
      state.isVerified = false;
      state.status = "idle";
      state.error = null;
    },
    loadTokenFromStorage: (state) => {
      // Load token and verification status from localStorage
      const isVerified = localStorage.getItem("isVerified") === "true";
      const token = isVerified ? localStorage.getItem("authToken") : null;

      if (token) {
        state.token = token;
        state.isVerified = isVerified;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Update user profile
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch user profile.";
      })

      // Handle updateUserProfile actions
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Update user with new profile data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update user profile.";
      });
  },
});

// Export actions for dispatch
export const { logout, loadTokenFromStorage } = userSlice.actions;

// Export reducer for store configuration
export default userSlice.reducer;
