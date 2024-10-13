const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

const authMiddleware = require('../middleware/auth');


router.post('/add', authMiddleware, expenseController.addExpense);
router.get('/:userId', authMiddleware, expenseController.getAllExpenses);
router.get('/filter/category/:userId/:category', authMiddleware, expenseController.filterByCategory);
router.get('/filter/subcategory/:userId/:subcategory', authMiddleware, expenseController.filterBySubcategory);
router.get('/stats/monthly/:userId', authMiddleware, expenseController.getMonthlyStatistics);
router.get('/stats/weekly/:userId', authMiddleware, expenseController.getWeeklyStatistics);
module.exports = router;