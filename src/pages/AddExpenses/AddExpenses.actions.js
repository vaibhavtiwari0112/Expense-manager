import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import getAuthToken from "../../utils/GetAuthtoken";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { rejectWithValue }) => {
    const token = getAuthToken();

    if (!token) {
      console.error("Token is missing");
      return rejectWithValue("Token is missing");
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID is missing");
      return rejectWithValue("User ID is missing");
    }

    try {
      const response = await axiosInstance.post(
        "/transactions",
        {
          ...expenseData,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error in try block:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
