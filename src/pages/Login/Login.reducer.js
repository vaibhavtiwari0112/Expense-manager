import { createSlice } from "@reduxjs/toolkit";
import { login } from "./Login.actions.js";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  status: 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
    loadTokenFromStorage: (state) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; 
        state.token = action.payload.token;
        localStorage.setItem("userId", action.payload.user.id);
        localStorage.setItem("authToken", action.payload.token); 
      })      
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout ,loadTokenFromStorage} = loginSlice.actions;
export default loginSlice.reducer;
