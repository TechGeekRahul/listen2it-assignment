
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const WeeklyExpensesChart = ({ expenses }) => {
 
  const calculateWeeklyExpenses = () => {
    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0]; 
    }).reverse(); 

    const weeklyData = {
      essential: Array(7).fill(0),
      nonEssential: Array(7).fill(0),
      miscellaneous: Array(7).fill(0),
      savings: Array(7).fill(0),
    };

    expenses.forEach(expense => {
      const expenseDate = expense.date.split('T')[0]; 
      const dayIndex = weekDays.indexOf(expenseDate);
      
      if (dayIndex !== -1) {
        switch (expense.category) {
          case 'Essential Expenses':
            weeklyData.essential[dayIndex] += expense.amount;
            break;
          case 'Non-Essential Expenses':
            weeklyData.nonEssential[dayIndex] += expense.amount;
            break;
          case 'Miscellaneous':
            weeklyData.miscellaneous[dayIndex] += expense.amount;
            break;
          case 'Savings and Investments':
            weeklyData.savings[dayIndex] += expense.amount;
            break;
          default:
            break;
        }
      }
    });

    return { weekDays, ...weeklyData };
  };

  const { weekDays, essential, nonEssential, miscellaneous, savings } = calculateWeeklyExpenses();

 
  const data = {
    labels: weekDays,
    datasets: [
      {
        label: 'Essential Expenses',
        data: essential,
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Non-Essential Expenses',
        data: nonEssential,
        backgroundColor: '#FF6384',
      },
      {
        label: 'Miscellaneous',
        data: miscellaneous,
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Savings & Investments',
        data: savings,
        backgroundColor: '#4BC0C0',
      },
    ],
  };

 
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-bold">Weekly Expenses</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyExpensesChart;
