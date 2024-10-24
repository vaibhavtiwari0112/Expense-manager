import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from './Dashboard.actions';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    totalExpenses: 0,
    totalSavings: 0,
    totalInvestments: 0,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // Local reducers (if needed)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the API response has expense, savings, and investment data
        state.totalExpenses = action.payload.expenses;
        state.totalSavings = action.payload.savings;
        state.totalInvestments = action.payload.investments;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
