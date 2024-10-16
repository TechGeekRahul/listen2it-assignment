// src/components/Register.js
import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../ExpenseContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(ExpenseContext);
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    await register(email, password);


    setEmail('');
    setPassword('');
    navigate('/'); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Register</h2>
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default Register;
