// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./component/Navbar";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/Store";
import { loadTokenFromStorage } from "./pages/Login/Login.reducer";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
