import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

// Fetch user profile action
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is missing from localStorage.");
      }
      const response = await axiosInstance.get(`user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update user profile action
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is missing from localStorage.");
      }
      const response = await axiosInstance.put(`user/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
