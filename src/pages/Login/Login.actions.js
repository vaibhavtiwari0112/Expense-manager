import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

export const login = createAsyncThunk('login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('auth/login', credentials);
    const token = response.data.data.token;
    localStorage.setItem("authToken", token);
    return response.data.data;
     // Ensure this returns the user data correctly
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
