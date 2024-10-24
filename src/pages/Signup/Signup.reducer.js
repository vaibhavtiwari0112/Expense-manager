import { createSlice } from "@reduxjs/toolkit";
import { register } from "./Signup.actions.js";

const initialState = {
  user: null,
  status: 'idle', 
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; 
      });
  },
});

export const { resetSignupState } = signupSlice.actions; 
export default signupSlice.reducer;