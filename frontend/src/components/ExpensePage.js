
import React, { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../ExpenseContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; 
import Stats from './Stats';
import WeeklyExpensesChart from './WeeklyExpenseChart'; // Import WeeklyExpensesChart component

const ExpensesPage = () => {
  const { expenses, addExpense, logout } = useContext(ExpenseContext);
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
    
    if (!amount || !category || !subcategory) return;

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
      amount: parseFloat(amount),
      category,
      subcategory,
      date: new Date().toISOString(), // Store current date in ISO format
      emoji: emojiMap[subcategory] || '📝' // Add emoji based on subcategory
    };

    // Add expense using context method
    await addExpense(newExpense); // Ensure this is awaited

    // Reset form fields and close modal
    setAmount('');
    setCategory('');
    setSubcategory('');
    setIsModalOpen(false);
  };

  // Filtered expenses based on selected filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    const matchesSubcategory = filterSubcategory ? expense.subcategory === filterSubcategory : true;
    return matchesCategory && matchesSubcategory;
  });

  return (
    <div className="flex flex-col md:flex-row">
      
       {/* Left Section */}
       <div className="w-full md:w-1/3 p-4">
         <Stats expenses={expenses} />
         <WeeklyExpensesChart expenses={expenses} />
       </div>

       {/* Right Section */}
       <div className="w-full md:w-2/3 p-4 bg-white rounded shadow">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-lg font-bold">Your Expenses</h2>
           <button 
             onClick={() => {
               logout();
               navigate('/'); // Redirect to login page after logout
             }} 
             className="bg-red-500 text-white p-2 rounded"
           >
             Logout
           </button>
         </div>

         {/* Filter Dropdowns */}
         <div className="mb-4">
           <h3 className="text-md font-semibold">Filters</h3>
           
           {/* Category Filter */}
           <select value={filterCategory} onChange={(e) => {
               setFilterCategory(e.target.value);
               setFilterSubcategory(''); // Reset subcategory when category changes
             }} className="border p-2 rounded w-full mb-2">
             <option value="">All Categories</option>
             {categoriesData.map((cat) => (
               <option key={cat.category} value={cat.category}>{cat.category}</option>
             ))}
           </select>

           {/* Subcategory Filter */}
           <select value={filterSubcategory} onChange={(e) => setFilterSubcategory(e.target.value)} className="border p-2 rounded w-full mb-2" disabled={!filterCategory}>
             <option value="">All Subcategories</option>
             {categoriesData.find(cat => cat.category === filterCategory)?.subcategories.map((subcat) => (
               <option key={subcat} value={subcat}>{subcat}</option>
             ))}
           </select>
         </div>

         {/* Button to open modal */}
         <button 
           onClick={() => setIsModalOpen(true)} 
           className="bg-blue-500 text-white p-2 rounded mb-4"
         >
           Add Expense
         </button>

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

             {/* Subcategory Dropdown */}
             <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="border p-2 rounded w-full mb-2" required disabled={!category}>
               <option value="">Select Subcategory</option>
               {categoriesData.find(cat => cat.category === category)?.subcategories.map((subcat) => (
                 <option key={subcat} value={subcat}>{subcat}</option>
               ))}
             </select>

             <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Expense</button>
           </form>
         </Modal>

         {/* List of Filtered Expenses */}
         <ul>
           {filteredExpenses.length > 0 ? (
             filteredExpenses.map((expense, index) => (
               <li key={index} className="border-b py-2">
                 {expense.emoji} {expense.category} - {expense.subcategory}: ₹{expense.amount}
               </li>
             ))
           ) : (
             <li>No expenses found.</li>
           )}
         </ul>
       </div>
     </div>
   );
};

export default ExpensesPage;
