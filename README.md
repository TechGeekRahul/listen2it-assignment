# Expense Tracker Application

A simple and intuitive web application for tracking personal expenses. Users can register, log in, add expenses, view statistics, and analyze their spending habits through various charts.

## Table of Contents

- [Expense Tracker Application](#expense-tracker-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)

## Features

- User registration and authentication
- Add, edit, and delete expenses
- View expenses in a list format
- Visualize expenses with pie charts and bar graphs
- Filter expenses by category and subcategory
- Responsive design for desktop and mobile

## Technologies Used

- **Frontend**: React.js, Axios, Chart.js
- **Backend**: Node.js, Express.js, MongoDB
- **Styling**: Tailwind CSS 

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TechGeekRahul/listen2it-assignment.git
 



Navigate to the project directory:

cd listen2it-assignment

Install the backend dependencies:

cd backend
npm install

Set up your MongoDB database. You can use MongoDB Atlas or a local instance.
Create a .env file in the server directory with the following variables:
text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start the backend server:

npm start

Open another terminal window to install frontend dependencies:
bash
cd frontend
npm install

Start the frontend application:
bash
npm start

Open your browser and navigate to http://localhost:3000.
