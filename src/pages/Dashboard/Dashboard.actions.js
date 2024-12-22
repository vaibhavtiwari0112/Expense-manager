import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import getAuthToken from "../../utils/GetAuthtoken";

export const fetchTransactions = createAsyncThunk(
  "dashboard/fetchTransactions",
  async (
    { page = 0, itemsPerPage = 20, interval = "monthly", type },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get("transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          itemsPerPage,
          interval,
          type,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendEmail = createAsyncThunk(
  "dashboard/sendTransactionReport",
  async () => {
    try {
      const token = getAuthToken();
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not available in local storage.");
      }

      const response = await axiosInstance.post(
        "dashboard/sendTransactionReport",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
