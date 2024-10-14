
import React, { useContext } from 'react';
import { ExpenseContext } from '../ExpenseContext';

const ListExpenses = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Your Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} className="border-b py-2">
            {expense.category} - {expense.subcategory}: ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListExpenses;