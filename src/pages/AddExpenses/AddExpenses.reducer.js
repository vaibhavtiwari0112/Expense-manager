import { createSlice } from "@reduxjs/toolkit";
import { addExpense } from "./AddExpenses.actions";

const initialState = {
  expenses: [],
  status: "idle", 
  error: null,
};

const addExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    resetExpensesState: (state) => {
      state.status = "idle";
      state.error = null;
      state.expenses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses.push(action.payload); 
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetExpensesState } = addExpenseSlice.actions;
export default addExpenseSlice.reducer;
