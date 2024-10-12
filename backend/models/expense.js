const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  date: { type: Date, default: Date.now },
  icon: { type: String } 
});

module.exports = mongoose.model('Expense', expenseSchema);