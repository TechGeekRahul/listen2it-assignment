// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.post('/register', async (req, res) => {
   const { email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({ email, passwordHash: hashedPassword });
   try {
       await newUser.save();
       res.status(201).json(newUser);
   } catch (error) {
       res.status(400).json({ error });
   }
});


router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
       return res.status(401).json({ error: 'Invalid credentials' });
   }

   

   res.status(200).json(user); 
});

module.exports = router;