import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from "path";
import AdminModel from path.resolve("backend/models/admin.js");
import { Validation } from '../validations/validation.js';
import sendEmail from '../utils/sendEmail.js';
import { JWT } from '../config/env.js';
export const authRoutes = express.Router();
import GenerateOtp from '../utils/genrateOTP.js';

// Default route
authRoutes.get('/', (req, res) => {
    res.json({ msg: "This is from Admin route" });
});

// Signup Route
authRoutes.post('/signup', async (req, res) => {
    const otp = GenerateOtp(); // Generate OTP

    try {
        // Validate request body
        const validationResponse = Validation.safeParse(req.body);
        if (!validationResponse.success) {
            return res.status(400).json({
                error: validationResponse.error.issues,
                msg: "Incorrect Data",
            });
        }

        const {  email, password } = validationResponse.data;
        const hashedOtp = await bcrypt.hash(otp, 10); // Hash OTP
        // Check if the admin already exists
        const checkAdminExist = await AdminModel.findOne({ email });
        if (checkAdminExist) {
            return res.status(409).json({
                redirect: "/signin",
                msg: "Admin already exists",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        await AdminModel.create({
            
            email,
            password: hashedPassword,
            createdAt: new Date(),
            isActive: true,
            lastLogin: new Date(),
            otp: hashedOtp, // Save hashed OTP
            
        });

        // Send OTP via email and SMS
        sendEmail(email, "OTP for Verification: CMS BLOG", otp);

        // Automatically clear OTP after 10 minutes
        setTimeout(async () => {
            await AdminModel.findOneAndUpdate({ email }, { otp: null }, { new: true });
        }, (1000 * 60 * 10));

        res.status(201).json({
            msg: "Admin successfully created",
            verify: "Verify Your Account",
        });
    } catch (error) {
        console.error("Error during admin signup:", error);
        res.status(500).json({ msg: "Server error, please try again later" });
    }
});

// Signin Route
authRoutes.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }

    try {
        const checkAdmin = await AdminModel.findOne({ email });

        if (!checkAdmin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, checkAdmin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const jwtToken = jwt.sign({ email }, JWT);

        res.status(200).json({
            msg: "Signin successful",
            token: jwtToken,
        });
    } catch (error) {
        console.error("Error during admin signin:", error);
        res.status(500).json({ msg: "Server error, please try again later" });
    }
});

// Admin Verification Route
authRoutes.put('/verify', async (req, res) => {
    const { otp, email } = req.body;

    try {
        const findAdmin = await AdminModel.findOne({ email });

        if (!findAdmin || !findAdmin.otp) {
            return res.status(404).json({ msg:!findAdmin? `Admin not found` : !findAdmin.otp?findAdmin.isVerified?"Already Verified please login":"Please contact Admin":"Something went wrong" });
        }

        const isOtpValid = await bcrypt.compare(otp, findAdmin.otp);

        if (isOtpValid) {
            const updatedAdmin = await AdminModel.findOneAndUpdate(
                { email },
                { isVerified: true, otp: null },
                { new: true }
            );

            return res.status(200).json({
                msg: "Verification successful",
                admin: updatedAdmin,
            });
        }

        return res.status(400).json({ msg: "Invalid OTP" });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ msg: "Server error, please try again later" });
    }
});

// Send OTP Route
authRoutes.post('/sendotp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }

    try {
        const findAdmin = await AdminModel.findOne({ email });

        if (!findAdmin) {
            return res.status(404).json({ msg: "Admin not found." });
        }

        const {  name } = findAdmin;
        const otp = GenerateOtp();
        const hashedOtp = await bcrypt.hash(otp, 10);

        await AdminModel.findOneAndUpdate(
            { email },
            { otp: hashedOtp },
            { new: true }
        );

        sendEmail(email, "OTP for Verification: Toyby.in", `Your OTP is: ${otp}`);

        res.status(200).json({ msg: "OTP sent successfully" });
    } catch (error) {
        console.error("Error in /sendotp:", error);
        res.status(500).json({
            msg: "An error occurred while sending OTP.",
            error: error.message,
        });
    }
});
