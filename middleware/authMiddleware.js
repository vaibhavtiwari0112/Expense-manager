const jwt = require("jsonwebtoken");
 const {JWT_SECRET_KEY } = process.env
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const user = jwt.verify(token, JWT_SECRET_KEY); 
    req.user = user; // Add user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;