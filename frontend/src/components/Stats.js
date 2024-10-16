import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';

const COLORS = ['#4ade80', '#facc15', '#d1d5db', '#4BC0C0'];

const Stats = ({ expenses }) => {

  const essential = expenses
    .filter(exp => exp.category === "Essential Expenses")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const nonEssential = expenses
    .filter(exp => exp.category === "Non-Essential Expenses")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const miscellaneous = expenses
    .filter(exp => exp.category === "Miscellaneous")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const savings = expenses
    .filter(exp => exp.category === "Savings and Investments")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const total = essential + nonEssential + miscellaneous + savings;

  const adjustedData = [
    { name: 'Essential Expenses', value: essential },
    { name: 'Non-Essential Expenses', value: nonEssential },
    { name: 'Miscellaneous', value: miscellaneous },
    { name: 'Savings & Investments', value: savings },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-xl flex">
      <div className="w-2/3">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={adjustedData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {adjustedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            
              <LabelList
                dataKey="value"
                position="outside"              
                stroke="black" 
                formatter={(value) =>
                  total > 0 ? `${((value / total) * 100).toFixed(2)}%` : '0%'
                }
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/3 flex flex-col justify-center ml-6">
        {adjustedData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center mb-4">
            <div className={`w-8 h-6 mr-2`} style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-sm">
              {entry.name}: ₹{entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
