// src/components/TransactionsList.js
import React from 'react';

export default function TransactionsList({ transactions }) {
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' }; // Format: '15 Jan'
    return date.toLocaleDateString('en-US', options);
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const dateKey = formatDate(transaction.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {});

  // Get keys and sort them in reverse order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      
     
      <div className="space-y-4">
        {sortedDates.map((date, index) => (
          <div key={index}>
            <h3 className="font-semibold text-md">{date}</h3>
            {groupedTransactions[date].map((transaction, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{transaction.emoji}</span>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹{Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}