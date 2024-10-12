const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/add', expenseController.addExpense);
router.get('/:userId', expenseController.getExpenses);


module.exports = router;