import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

export const login = createAsyncThunk(
  "login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials);
      const token = response.data?.data?.token;
      const user = response.data?.data?.user;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
