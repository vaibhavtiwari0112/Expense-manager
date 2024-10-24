const prisma = require("../prismaClient");

const SavingsService = {
  async createSaving(userId, amount) {
    const saving = await prisma.saving.create({
      data: {
        userId,
        amount,
      },
    });
    return saving;
  },

  async getSavings(userId) {
    const savings = await prisma.saving.findMany({
      where: { userId },
    });
    return savings;
  },
};

module.exports = SavingsService;