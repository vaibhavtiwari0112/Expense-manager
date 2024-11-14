
import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./Dashboard.actions";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    transactions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload.data; 
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.messsage;
      });
  },
});

export default dashboardSlice.reducer;
