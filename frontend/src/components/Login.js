// src/components/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ExpenseContext } from '../ExpenseContext';

const Login = () => {
  const navigate = useNavigate(); 
  const { login , isRegistering} = useContext(ExpenseContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await login(email, password); 
    
    if (localStorage.getItem('token')) {
      navigate('/expenses');
    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        className="border p-2 rounded w-full mb-2" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="border p-2 rounded w-full mb-2" 
        required 
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to={'/register'}>
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
