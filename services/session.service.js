const prisma = require("../prismaClient");

const SessionService = {
  async createSession(userId) {
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
    const session = await prisma.session.create({
      data: {
        userId,
        expiresAt,
      },
    });
    return session;
  },

  async isSessionValid(userId) {
    const session = await prisma.session.findFirst({
      where: {
        userId,
        expiresAt: {
          gte: new Date(),
        },
      },
    });
    return !!session; // Return true if session exists and is valid
  },
};

module.exports = SessionService;