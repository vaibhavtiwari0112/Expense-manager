import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import getAuthToken from "../../utils/GetAuthtoken";

// Fetch user profile action
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is missing from localStorage.");
      }

      const response = await axiosInstance.get(`user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is missing from localStorage.");
      }
      const response = await axiosInstance.put(
        `user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
