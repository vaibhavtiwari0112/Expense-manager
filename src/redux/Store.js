import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Slices/Home.slice.js'
import loginReducer from '../pages/Login/Login.reducer.js';
import signupReducer from '../pages/Signup/Signup.reducer.js';
import dashboardReducer from '../pages/Dashboard/Dashboard.reducer.js';
import addExpenseReducer from '../pages/AddExpenses/AddExpenses.reducer.js';
const store = configureStore({
  reducer: {
    home: homeReducer,
    login: loginReducer,
    signup: signupReducer,
    dashboard: dashboardReducer,
    expenses: addExpenseReducer, 
  },
});

export default store;