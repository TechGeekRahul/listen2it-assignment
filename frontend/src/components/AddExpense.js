
import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../ExpenseContext';
import categoriesData from '../categories.json'; 
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const { addExpense } = useContext(ExpenseContext);
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const {token } = useContext(ExpenseContext);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
     navigate('/')
    }
})

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!category || !subcategory || !amount) return;

    addExpense({ amount: parseFloat(amount), category, subcategory });
    

    setAmount('');
    setCategory('');
    setSubcategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Add Expense</h2>
      
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
        className="border p-2 rounded w-full mb-2" 
        required 
      />
      
      <select value={category} onChange={(e) => {
          setCategory(e.target.value);
          setSubcategory(''); 
        }} className="border p-2 rounded w-full mb-2">
          <option value="">Select Category</option>
          {categoriesData.map((cat) => (
            <option key={cat.category} value={cat.category}>{cat.category}</option>
          ))}
      </select>

      <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="border p-2 rounded w-full mb-2" disabled={!category}>
          <option value="">Select Subcategory</option>
          {categoriesData.find(cat => cat.category === category)?.subcategories.map((subcat) => (
            <option key={subcat.name} value={subcat.name}>{subcat.name}</option>
          ))}
      </select>
      
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Expense</button>
    </form>
  );
};

export default AddExpense;