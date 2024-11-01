import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { selectLoginState } from "../Login/Login.selectors";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { getState, rejectWithValue }) => {
    console.log("Checking state at start:", getState());

    const loginData = selectLoginState(getState());
    const token = localStorage.getItem("authToken") || loginData?.token;
    const userId = loginData?.user?.id;

    console.log("Token:", token);
    console.log("User ID:", userId);

    if (!token || !userId) {
      console.error("Token or User ID is missing");
      return rejectWithValue("Token or User ID is missing");
    }

    try {
      console.log("inside try >>>>>>>>>>>>>");

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
