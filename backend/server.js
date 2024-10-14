const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT || 5000, () => {
   console.log(`Server running on port ${process.env.PORT || 5000}`);
});