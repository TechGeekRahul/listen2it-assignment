// src/components/WeeklyExpensesChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const WeeklyExpensesChart = ({ expenses }) => {
  // Function to calculate daily expenses for the current week
  const calculateWeeklyExpenses = () => {
    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // Adjust to get Sunday to Saturday
      return date; // Return the Date object directly
    }); // No need to reverse

    const weeklyData = {
      essential: Array(7).fill(0),
      nonEssential: Array(7).fill(0),
      miscellaneous: Array(7).fill(0),
      savings: Array(7).fill(0),
    };

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date.split('T')[0]); // Convert to Date object
      const dayIndex = weekDays.findIndex(day => day.toISOString().split('T')[0] === expenseDate.toISOString().split('T')[0]);
      
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

  // Format the week days for display
  const formattedWeekDays = weekDays.map((date, index) => {
    const options = { day: 'numeric', month: 'short' };
    if (index === 6) return "Today"; 
    if (index === 5) return "Yesterday"; 
    return date.toLocaleDateString('en-US', options);
  });


  const data = formattedWeekDays.map((day, index) => ({
    name: day,
    essential: essential[index],
    nonEssential: nonEssential[index],
    miscellaneous: miscellaneous[index],
    savings: savings[index],
    total: essential[index] + nonEssential[index] + miscellaneous[index] + savings[index], 
  }));

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
    
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="essential" stackId="a" fill="#4ade80">
            <LabelList dataKey="total" position="top" formatter={(value) => `₹${value.toFixed(2)}`} />
          </Bar>
          <Bar dataKey="nonEssential" stackId="a" fill="#facc15">
            <LabelList dataKey="total" position="top" formatter={(value) => `₹${value.toFixed(2)}`} />
          </Bar>
          <Bar dataKey="miscellaneous" stackId="a" fill="#d1d5db">
            <LabelList dataKey="total" position="top" formatter={(value) => `₹${value.toFixed(2)}`} />
          </Bar>
          <Bar dataKey="savings" stackId="a" fill="#4BC0C0">
            <LabelList dataKey="total" position="top" formatter={(value) => `₹${value.toFixed(2)}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyExpensesChart;