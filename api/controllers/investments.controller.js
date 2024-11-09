const InvestmentsService = require("../services/investments.service");

const InvestmentsController = {
  async createInvestment(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    const { amount } = req.body;

    try {
      const investment = await InvestmentsService.createInvestment(userId, amount);
      res.status(201).json({
        message: "Investment created successfully",
        data: investment,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating investment",
        error: error.message,
      });
    }
  },

  async getInvestments(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const investments = await InvestmentsService.getInvestments(userId);
      res.status(200).json({
        message: "Investments retrieved successfully",
        data: investments,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving investments",
        error: error.message,
      });
    }
  },
};

module.exports = InvestmentsController;