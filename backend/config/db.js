const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = "mongodb+srv://singhrahulkumar820:listentoit@cluster0.h0rov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;