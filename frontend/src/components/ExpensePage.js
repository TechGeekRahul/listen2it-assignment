// src/components/ExpensesPage.js
import React, { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../ExpenseContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component
import Stats from './Stats'; // Import Stats component
import WeeklyExpensesChart from './WeeklyExpenseChart'; // Import WeeklyExpensesChart component
import TransactionsList from './TransactionsList'; // Import TransactionsList component
import ProfileIcon from './ProfileIcon';
import AddExpenseButton from './AddExpenseButton'; // Import AddExpenseButton

const ExpensesPage = () => {
  const { expenses, addExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  // State for the new expense and modal visibility
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // State for filters
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSubcategory, setFilterSubcategory] = useState('');

  // Predefined categories and subcategories
  const categoriesData = [
    {
      category: "Essential Expenses",
      subcategories: ["Housing", "Transportation", "Food", "Utilities", "Healthcare"]
    },
    {
      category: "Non-Essential Expenses",
      subcategories: ["Entertainment", "Personal Care", "Clothing"]
    },
    {
      category: "Savings and Investments",
      subcategories: ["Savings", "Investments"]
    },
    {
      category: "Miscellaneous",
      subcategories: ["Education", "Gifts", "Miscellaneous"]
    }
  ];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !category || !subcategory) {
        alert("Please fill in all fields.");
        return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Create a new expense object with current date and emoji
    const emojiMap = {
      "Housing": "🏠",
      "Transportation": "🚗",
      "Food": "🍔",
      "Utilities": "💡",
      "Healthcare": "⚕️",
      "Entertainment": "🎉",
      "Personal Care": "💅",
      "Clothing": "👗",
      "Savings": "💰",
      "Investments": "📈",
      "Education": "🎓",
      "Gifts": "🎁",
      "Miscellaneous": "🛠️"
    };

    const newExpense = {
      amount: parsedAmount,
      category,
      subcategory,
      date: new Date().toISOString(), // Store current date in ISO format
      emoji: emojiMap[subcategory] || '📝' // Add emoji based on subcategory
    };

    try {
        // Add expense using context method
        await addExpense(newExpense); // Ensure this is awaited

        // Reset form fields and close modal
        setAmount('');
        setCategory('');
        setSubcategory('');
        setIsModalOpen(false);
    } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again.");
    }
};

  // Filtered expenses based on selected filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    const matchesSubcategory = filterSubcategory ? expense.subcategory === filterSubcategory : true;
    return matchesCategory && matchesSubcategory;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
        <ProfileIcon />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">This Month</h2>
            <Stats expenses={expenses} />
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Last Week</h2>
            <WeeklyExpensesChart expenses={expenses} />
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transactions</h2>
            <select value={filterCategory} onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterSubcategory(''); // Reset subcategory when category changes
                setSubcategory(''); // Reset selected subcategory when category changes
              }} className="border p-2 rounded w-48 mb-2">
              <option value="">All Categories</option>
              {categoriesData.map((cat) => (
                <option key={cat.category} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Buttons */}
          {filterCategory && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categoriesData.find(cat => cat.category === filterCategory)?.subcategories.map((subcat) => (
                <button 
                  key={subcat} 
                  onClick={() => {
                    setFilterSubcategory(subcat);
                    setSubcategory(subcat); // Set selected subcategory for adding expenses
                  }} 
                  className={`px-4 py-2 rounded text-white ${filterSubcategory === subcat ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600 transition duration-200`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}

          {/* Transactions List */}
          <TransactionsList transactions={filteredExpenses} />
        </div>
      </div>

      {/* Add Expense Button Component */}
      <AddExpenseButton onClick={() => setIsModalOpen(true)} />

      {/* Add Expense Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-md font-semibold">Add New Expense</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="border p-2 rounded w-full mb-2"
            required
          />
          
          {/* Category Dropdown */}
          <select value={category} onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(''); // Reset subcategory when category changes
              }} className="border p-2 rounded w-full mb-2" required>
            <option value="">Select Category</option>
            {categoriesData.map((cat) => (
              <option key={cat.category} value={cat.category}>{cat.category}</option>
            ))}
          </select>

          {/* Subcategory Display as Buttons */}
          {category && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categoriesData.find(cat => cat.category === category)?.subcategories.map((subcat) => (
                <button 
                  key={subcat} 
                  onClick={() => setSubcategory(subcat)} 
                  className={`px-4 py-2 rounded text-white ${subcategory === subcat ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600 transition duration-200`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Expense</button>
        </form>
      </Modal>

    </div>
  );
};

export default ExpensesPage; 