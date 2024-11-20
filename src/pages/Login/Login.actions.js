import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

export const login = createAsyncThunk('login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('auth/login', credentials);
    const token = response.data?.data?.token;
    const user = response.data?.data?.user;  // Assuming the response has user data here
    localStorage.setItem("authToken", token);
    return { user, token };  // Return user and token together
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

