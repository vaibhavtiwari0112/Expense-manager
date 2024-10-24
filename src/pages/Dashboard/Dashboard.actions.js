import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/AxiosInstance';

// Fetch data for the dashboard (expenses, savings, investments)
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/dashboard/data'); // Replace with actual API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);