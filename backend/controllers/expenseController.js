const Expense = require('../models/Expense');

const mongoose = require('mongoose');
const categoriesData = require('../categories.json');

exports.addExpense = async (req, res) => {
  const { userId, amount, category, subcategory } = req.body;

  
  const categoryData = categoriesData.find(cat => cat.category === category);
  
  if (!categoryData) return res.status(400).json({ error: 'Invalid category' });

  const subcategoryData = categoryData.subcategories.find(subcat => subcat.name === subcategory);
  
  if (!subcategoryData) return res.status(400).json({ error: 'Invalid subcategory' });

  const newExpense = new Expense({
    userId,
    amount,
    category,
    subcategory,
    icon: subcategoryData.icon 
  });
  
  try {
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error });
  }
};



exports.getAllExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error });
  }
};


exports.filterByCategory = async (req, res) => {
  const { userId, category } = req.params;

  try {
    const expenses = await Expense.find({ userId, category });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error });
  }
};


exports.filterBySubcategory = async (req, res) => {
  const { userId, subcategory } = req.params;
  console.log(`Filtering expenses for userId: ${userId}, subcategory: ${subcategory}`);

  try {
    const expenses = await Expense.find({ userId, subcategory });
    console.log('Filtered expenses:', expenses);
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(400).json({ error });
  }
};


exports.getMonthlyStatistics = async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching monthly statistics for userId: ${userId}`);

  try {
    const stats = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    console.log('Monthly statistics:', stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching monthly statistics:', error);
    res.status(400).json({ error });
  }
};


exports.getWeeklyStatistics = async (req, res) => {
  const { userId } = req.params;

  try {
    const stats = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $week: "$date" },
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({ error });
  }
};

