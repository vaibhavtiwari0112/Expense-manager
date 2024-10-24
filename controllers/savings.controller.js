const SavingsService = require("../services/savings.service");

const SavingsController = {
  async createSaving(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    const { amount } = req.body;

    try {
      const saving = await SavingsService.createSaving(userId, amount);
      res.status(201).json({
        message: "Saving created successfully",
        data: saving,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating saving",
        error: error.message,
      });
    }
  },

  async getSavings(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const savings = await SavingsService.getSavings(userId);
      res.status(200).json({
        message: "Savings retrieved successfully",
        data: savings,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving savings",
        error: error.message,
      });
    }
  },
};

module.exports = SavingsController;