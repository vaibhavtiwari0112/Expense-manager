const express = require("express");
const TransactionsController = require("../controllers/transactions.controller.js");
const authenticate = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authenticate, TransactionsController.createTransaction);
router.get("/", authenticate, TransactionsController.getTransactions);

module.exports = router;
