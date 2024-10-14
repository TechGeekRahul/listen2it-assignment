import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AddExpense from './components/AddExpense';
import Login from './components/Login';
import Register from './components/Register';
import ExpensesPage from './components/ExpensePage';
// import { ExpenseContext } from './ExpenseContext';

function App() {
 
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>

        <Routes>
        
        
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
    
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/add-expense" element={<AddExpense />} />
            

        </Routes>
      </div>
    </Router>
  );
}

export default App;
