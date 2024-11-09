const prisma = require("../prismaClient");

const TransactionsService = {
  async createTransaction(userId, amount, description, currency, type) {
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount,
        description,
        currency,
        type, // Include type in the transaction creation
      },
    });
    return transaction;
  },

  async getTransactions(userId, page, itemsPerPage) {
    try {
      // Ensure userId is an integer
      if (isNaN(userId)) {
        console.error("Invalid userId:", userId);
        return [];
      }
  
      console.log("Fetching transactions for userId:", userId);
  
      const transactions = await prisma.transaction.findMany({
        where: { userId }, // Ensure userId matches the integer type
        skip: page * itemsPerPage,         // Skip based on page number
        take: itemsPerPage,                // Limit based on page size
      });
  
      console.log("Transactions found:", transactions.length);
      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }
  
  
  }
module.exports = TransactionsService;
