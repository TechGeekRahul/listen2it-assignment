import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExpenseProvider } from './ExpenseContext';

ReactDOM.render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
