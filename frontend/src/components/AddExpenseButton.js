// src/components/AddExpenseButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddExpenseButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-200"
      aria-label="Add Expense"
    >
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  );
};

export default AddExpenseButton;