import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import AddExpense from './components/AddExpense';
import Login from './components/Login';
import Register from './components/Register';
import ExpensesPage from './components/ExpensePage';

import LogoutPage from './components/LogoutPage'; 


function App() {
 
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-600 ml-44">Budgett</h1>

        <Routes>
              <Route path="/" element={<Login />} />
              
              <Route path="/register" element={<Register />} />
    
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route exact path="/logout" element={<LogoutPage />} />
            

        </Routes>
      </div>
    </Router>
  );
}

export default App;
