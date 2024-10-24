export const selectDashboardData = (state) => ({
    totalExpenses: state.dashboard.totalExpenses,
    totalSavings: state.dashboard.totalSavings,
    totalInvestments: state.dashboard.totalInvestments,
    status: state.dashboard.status,
    error: state.dashboard.error,
  });
  