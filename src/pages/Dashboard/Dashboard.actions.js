
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import getAuthToken from "../../utils/GetAuthtoken";

export const fetchTransactions = createAsyncThunk(
  "dashboard/fetchTransactions",
  async ({ page = 0, itemsPerPage = 5, interval = "monthly" }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = getAuthToken();
      const response = await axiosInstance.get("transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page, 
          itemsPerPage, 
          interval, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error); 
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
