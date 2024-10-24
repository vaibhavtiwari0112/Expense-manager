const session = require("express-session");
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore; // Ensure you are importing PrismaSessionStore
const prisma = require("../prismaClient");

const sessionMiddleware = session({
  cookie: {
    maxAge: 20 * 60 * 1000, // 20 minutes
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // Check session store every 2 minutes
  }),
  secret: process.env.SESSION_SECRET || 'defaultSecret', // Fallback in case process.env.SESSION_SECRET is not set
  resave: false,
  saveUninitialized: false,
});

module.exports = sessionMiddleware;
