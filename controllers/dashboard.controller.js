const SavingsService = require("../services/savings.service");
const InvestmentsService = require("../services/investments.service");
const ExpensesService = require("../services/transactions.service");

const DashboardController = {
  async getDashboardData(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const savings = await SavingsService.getSavings(userId);
      const investments = await InvestmentsService.getInvestments(userId);
      const expenses = await ExpensesService.getExpenses(userId);

      res.status(200).json({
        message: "Dashboard data retrieved successfully",
        data: {
          savings,
          investments,
          expenses,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving dashboard data",
        error: error.message,
      });
    }
  },
};

module.exports = DashboardController;