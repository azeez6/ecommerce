// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password, age, gender, city } = req.body;
    const imageUrl = req.file.path; 

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password, age, gender, city, imageUrl });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// backend/controllers/authController.js

const updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;
  
    // try {
    //   const user = await User.findByIdAndUpdate(
    //     userId,
    //     { role: newRole },
    //     { new: true } // Returns the updated user
    //   ).select('-password');
  
    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
  
    //   res.status(200).json({ message: 'User role updated successfully', user });
    // } 
    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.role = newRole;
        await user.save();
        res.status(200).json({ message: 'Role updated successfully' });
      } 
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update user role' });
    }
  };
  
  // backend/routes/authRoutes.js
  
 
  

module.exports = { registerUser, loginUser, getProfile, logoutUser, getAllUsers, updateUserRole };
