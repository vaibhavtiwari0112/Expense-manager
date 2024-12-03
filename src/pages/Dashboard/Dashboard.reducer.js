import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions, sendEmail } from "./Dashboard.actions";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    transactions: [],
    status: "idle",
    emailStatus: "idle", // For email actions
    emailSuccess: null,  // To store email response
    emailError: null,    // To store email error
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload.data;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })

      // Send Email
      .addCase(sendEmail.pending, (state) => {
        state.emailStatus = "loading";
        state.emailSuccess = null;
        state.emailError = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.emailStatus = "succeeded";
        state.emailSuccess = action.payload;
        state.emailError = null;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.emailStatus = "failed";
        state.emailSuccess = null;
        state.emailError = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
