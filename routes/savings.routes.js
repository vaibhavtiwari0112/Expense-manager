const express = require("express");
const SavingsController = require("../controllers/savings.controller");
const authenticate = require("../middleware/authMiddleware");
const sessionMiddleware = require("../middleware/sessionMiddleware");

const router = express.Router();

router.post("/", authenticate,  SavingsController.createSaving);
router.get("/", authenticate, SavingsController.getSavings);

module.exports = router;
