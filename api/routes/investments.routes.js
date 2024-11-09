const express = require("express");
const InvestmentsController = require("../controllers/investments.controller");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, InvestmentsController.createInvestment);
router.get("/", authenticate, InvestmentsController.getInvestments);

module.exports = router;