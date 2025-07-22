
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/csv');

router.get('/log-csv', tableController.logCSV);
router.get('/expense-csv', tableController.expenseCSV);

module.exports = router;
