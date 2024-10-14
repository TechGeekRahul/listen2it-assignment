// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, passwordHash: hashedPassword });
    
    try {
        await newUser.save();
        
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




const jwt = require('jsonwebtoken');


// Example of a login endpoint in your backend
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.status(200).json({ token, userId: user._id }); // Return both token and userId
  });

module.exports = router;