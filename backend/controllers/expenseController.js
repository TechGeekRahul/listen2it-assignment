const Expense = require('../models/Expense');


const categoriesData = [
  {
    category: "Essential Expenses",
    subcategories: [
      { name: "Housing", icon: "🏠" },
      { name: "Transportation", icon: "🚗" },
      { name: "Food", icon: "🍔" },
      { name: "Utilities and Services", icon: "💡" },
      { name: "Healthcare", icon: "⚕️" },
      { name: "Insurance", icon: "📑" },
      { name: "Debt Repayments", icon: "💳" }
    ]
  },
  {
    category: "Non-Essential Expenses",
    subcategories: [
      { name: "Entertainment and Leisure", icon: "🎉" },
      { name: "Personal Care", icon: "💅" },
      { name: "Clothing and Accessories", icon: "👗" }
    ]
  },
  {
    category: "Savings and Investments",
    subcategories: [
      { name: "Savings", icon: "💰" },
      { name: "Investments", icon: "📈" }
    ]
  },
  {
    category: "Miscellaneous",
    subcategories: [
      { name: "Education and Self-Improvement", icon: "🎓" },
      { name: "Gifts and Donations", icon: "🎁" },
      { name: "Miscellaneous", icon: "🛠️" }
    ]
  }
];

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

