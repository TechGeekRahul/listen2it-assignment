// src/ExpenseContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isRegistering, setIsRegistering] = useState(false);


  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    if (storedExpenses.length > 0) {
      setExpenses(storedExpenses);
    }

    
    const fetchExpenses = async () => {
      if (token) {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        try {
          const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log("Fetched expenses:", response.data); 
          setExpenses(response.data);
        } catch (error) {
          console.error('Failed to fetch expenses:', error);
        }
      }
    };
    
    
    
    fetchExpenses();
  }, [token]);


const addExpense = async (expense) => {
  try {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    const response = await axios.post(`http://localhost:5000/api/expenses/add`, {
      ...expense,
      userId, 
    }, {
      headers: { Authorization: `Bearer ${token}` } 
    });

  
    const newExpense = response.data;


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

    newExpense.emoji = emojiMap[expense.subcategory] || '📝';

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Failed to add expense:', error);
  }
};



  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, userId } = response.data; 
      setToken(token);
      localStorage.setItem('token', token); 
      localStorage.setItem('userId', userId); 
      console.log("login successfull")
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (email, password) => {
    try {
      await axios.post('http://localhost:5000/api/users/register', { email, password });
    
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log("Logged out successfully");
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, login, register,logout, isRegistering, setIsRegistering }}>
      {children}
    </ExpenseContext.Provider>
  );
};