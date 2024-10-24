const prisma = require("../prismaClient");

const ExpensesService = {
  async createExpense(userId, amount, description) {
    const expense = await prisma.expense.create({
      data: {
        userId,
        amount,
        description,
      },
    });
    return expense;
  },

  async getExpenses(userId) {
    const expenses = await prisma.expense.findMany({
      where: { userId },
    });
    return expenses;
  },
};

module.exports = ExpensesService;