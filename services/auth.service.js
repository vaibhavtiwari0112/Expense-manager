const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient"); // Adjust the path based on your project structure
const {JWT_SECRET_KEY } = process.env

const AuthService = {
  async register({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET_KEY,
    );

    return { user, token }; 
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } 
    );

    return { user, token }; 
  },

  async logout(req) {
    return true; 
  },

  async isLoggedIn(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return { loggedIn: false };
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, JWT_SECRET_KEY);
      return { loggedIn: true, user };
    } catch (error) {
      return { loggedIn: false };
    }
  },
};

module.exports = AuthService;
