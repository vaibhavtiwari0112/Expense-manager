// services/dashboard.service.js
const prisma = require("../prismaClient"); // Adjust the path based on your project structure

const DashboardService = {
  async getDashboardData(userId) {
    const expenses = await prisma.expense.findMany({ where: { userId } });
    const savings = await prisma.saving.findMany({ where: { userId } });
    const investments = await prisma.investment.findMany({ where: { userId } });

    return { expenses, savings, investments };
  },
};

module.exports = DashboardService;
