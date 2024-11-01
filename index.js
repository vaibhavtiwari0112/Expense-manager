const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const savingsRoutes = require("./routes/savings.routes");
const investmentsRoutes = require("./routes/investments.routes");
const transactionRoutes = require("./routes/transactions.routes");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const { configDotenv } = require("dotenv");
const cors = require('cors');

const app = express();
// app.use(sessionMiddleware);
configDotenv();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  }));
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/savings", savingsRoutes);
app.use("/investments", investmentsRoutes);
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error.message);
});