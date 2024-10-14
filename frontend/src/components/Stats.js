// src/components/Stats.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const Stats = ({ expenses }) => {
  
  const calculateStats = () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const essential = expenses.filter(expense => 
      expense.category === "Essential Expenses" && 
      new Date(expense.date) >= lastMonth
    ).reduce((acc, expense) => acc + expense.amount, 0);

    const nonEssential = expenses.filter(expense => 
      expense.category === "Non-Essential Expenses" && 
      new Date(expense.date) >= lastMonth
    ).reduce((acc, expense) => acc + expense.amount, 0);

    const miscellaneous = expenses.filter(expense => 
      expense.category === "Miscellaneous" && 
      new Date(expense.date) >= lastMonth
    ).reduce((acc, expense) => acc + expense.amount, 0);

    const savings = expenses.filter(expense => 
      expense.category === "Savings and Investments" && 
      new Date(expense.date) >= lastMonth
    ).reduce((acc, expense) => acc + expense.amount, 0);

    return { essential, nonEssential, miscellaneous, savings };
  };

  const { essential, nonEssential, miscellaneous, savings } = calculateStats();

  
  const data = {
    labels: ['Essential Expenses', 'Non-Essential Expenses', 'Miscellaneous', 'Savings & Investments'],
    datasets: [
      {
        data: [essential, nonEssential, miscellaneous, savings],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      },
    ],
  };


  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = essential + nonEssential + miscellaneous + savings;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ₹${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-bold">Expense Distribution (Last Month)</h3>
      <Doughnut data={data} options={options} />
      
     
      <div className="mt-4">
        <h4 className="text-md font-semibold">Amount Spent:</h4>
        <ul>
          <li>Essential Expenses: ₹{essential}</li>
          <li>Non-Essential Expenses: ₹{nonEssential}</li>
          <li>Miscellaneous: ₹{miscellaneous}</li>
          <li>Savings & Investments: ₹{savings}</li>
        </ul>
      </div>
    </div>
  );
};

export default Stats;
