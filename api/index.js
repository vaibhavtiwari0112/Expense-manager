const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const savingsRoutes = require("./routes/savings.routes");
const investmentsRoutes = require("./routes/investments.routes");
const transactionRoutes = require("./routes/transactions.routes");
const sessionMiddleware = require("./middleware/sessionMiddleware");
import path from 'path';
const { configDotenv } = require("dotenv");
const cors = require('cors');

const app = express();

// Load environment variables
configDotenv();

// CORS Configuration to allow requests from all origins
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies/credentials to be sent
}));

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/savings", savingsRoutes);
app.use("/investments", investmentsRoutes);
app.use("/transactions", transactionRoutes);

// Serve static files from the 'dist' directory (where Vite build output is)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for client-side routing (for Vite React app)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error.message);
});
