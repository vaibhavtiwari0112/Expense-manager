import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
 

export const register = createAsyncThunk('signup', async (formData) => {
  try {
    const response = await axiosInstance.post('auth/signup', formData);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message); 
  }
});