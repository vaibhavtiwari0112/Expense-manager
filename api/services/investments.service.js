const prisma = require("../prismaClient");

const InvestmentsService = {
  async createInvestment(userId, amount) {
    const investment = await prisma.investment.create({
      data: {
        userId,
        amount,
      },
    });
    return investment;
  },

  async getInvestments(userId) {
    const investments = await prisma.investment.findMany({
      where: { userId },
    });
    return investments;
  },
};

module.exports = InvestmentsService;