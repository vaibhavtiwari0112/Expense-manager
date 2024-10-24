const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const savingsRoutes = require("./routes/savings.routes");
const investmentsRoutes = require("./routes/investments.routes");
const expensesRoutes = require("./routes/expenses.routes");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const { configDotenv } = require("dotenv");
const cors = require('cors');

const app = express();
// app.use(sessionMiddleware);
configDotenv();
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allow all origins (for testing purposes)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (like cookies)
  }));
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/savings", savingsRoutes);
app.use("/investments", investmentsRoutes);
app.use("/expenses", expensesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error.message);
});