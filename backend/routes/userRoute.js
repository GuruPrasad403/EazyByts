import express from 'express';
import mongoose from 'mongoose';
import {UserModel} from '../model/user.js'; // Assuming the schema is in 'models/User.js'
import userValidationSchema from '../validation/userValidation.js'; // Zod schema
import { z } from 'zod';

const router = express.Router();

router.post('/user', async (req, res) => {
    console.log("Request body:", req.body);  // Log the body

    try {
        // Validate input data
        userValidationSchema.parse(req.body);
        console.log("Validation passed");

        // Create a new user
        const user = new UserModel(req.body);
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log("Validation error:", error); // Log validation error
        res.status(400).json({ error: error.errors || 'Invalid data' });
    }
});

// Update User Route
router.put('/user/:id', async (req, res) => {
    try {
        // Validate input data
        userValidationSchema.parse(req.body);

        // Find user by ID and update
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.errors || 'Invalid data' });
    }
});

// Delete User Route
router.delete('/user/:id', async (req, res) => {
    try {
        // Find and delete user by ID
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});

// Get User Data by ID Route
router.get('/user/:id', async (req, res) => {
    try {
        // Find user by ID
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});

// Get All Users Route (optional, to retrieve all users)
router.get('/users', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await UserModel.find();

        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
