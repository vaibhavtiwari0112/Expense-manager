const express = require("express");
const ExpensesController = require("../controllers/expenses.controller");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, ExpensesController.createExpense);
router.get("/", authenticate, ExpensesController.getExpenses);

module.exports = router;