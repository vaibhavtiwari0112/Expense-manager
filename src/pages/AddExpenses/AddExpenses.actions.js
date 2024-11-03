import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { selectLoginState } from "../Login/Login.selectors";
import getAuthToken from "../../utils/GetAuthtoken";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { getState, rejectWithValue }) => {

    const loginData = selectLoginState(getState());
    const token = getAuthToken();
    const userId = loginData?.user?.id;

    if (!token || !userId) {
      console.error("Token or User ID is missing");
      return rejectWithValue("Token or User ID is missing");
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
