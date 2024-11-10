import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    welcomeMessage: 'Welcome to Expense Tracker!',
  },
  reducers: {
    updateWelcomeMessage(state, action) {
      state.welcomeMessage = action.payload;
    },
  },
});

export const { updateWelcomeMessage } = homeSlice.actions;
export default homeSlice.reducer;
