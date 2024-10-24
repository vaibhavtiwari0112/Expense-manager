import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Make sure this path is correct
import AppRoutes from "./Routes"; // This should also be correctly set
import Navbar from "./component/Navbar";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
