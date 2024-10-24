import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";


export const login = createAsyncThunk('login', async (credentials) => {
  try {
    const response = await axiosInstance.post('auth/login', credentials);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});