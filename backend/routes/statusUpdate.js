const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusUpdate");

router.put("/expense/:id/status", statusController.updateExpenseStatus);

module.exports = router;
