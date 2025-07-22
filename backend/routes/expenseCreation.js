const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseCreation');

router.post('/expense-create', expenseController.createExpense);
router.get('/all-expense', expenseController.getAllExpenses);

module.exports = router;