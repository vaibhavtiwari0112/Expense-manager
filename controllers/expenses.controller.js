const ExpensesService = require("../services/expenses.service");

const ExpensesController = {
  async createExpense(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    const { amount, description } = req.body;

    try {
      const expense = await ExpensesService.createExpense(userId, amount, description);
      res.status(201).json({
        message: "Expense created successfully",
        data: expense,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating expense",
        error: error.message,
      });
    }
  },

  async getExpenses(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const expenses = await ExpensesService.getExpenses(userId);
      res.status(200).json({
        message: "Expenses retrieved successfully",
        data: expenses,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving expenses",
        error: error.message,
      });
    }
  },
};

module.exports = ExpensesController;