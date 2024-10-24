const AuthService = require("../services/auth.service");

const AuthController = {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.status(200).json({
        message: "Login successful",
        data: { user, token },
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  },
};

module.exports = AuthController;
