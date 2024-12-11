import { JWT } from "../config/env.js";
import jwt from "jsonwebtoken";
import { AdminModel } from "../models/admin.js";  // Import the Admin model

export const authentication = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization;

        // Check if token is provided
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided or invalid format" });
        }

        // Verify the token
        const decoded = jwt.verify(token.split(" ")[1], JWT);  // Extract the actual token
        const { email } = decoded;

        // Find the admin by email
        const findAdmin = await AdminModel.findOne({ email });
        if (!findAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Attach admin details to the request object
        req.admin = {
            email: findAdmin.email,
            adminId: findAdmin._id,
            isAdmin: findAdmin.isAdmin,  // Ensure the user is an admin
        };

        // If isAdmin query parameter exists, make sure it's true for the admin
        const { isAdmin } = req.query;
        if (isAdmin && !findAdmin.isAdmin) {
            return res.status(403).json({ error: "Forbidden: You are not an admin" });
        }

        // Add email to the request headers
        req.headers.email = email;

        // Proceed to the next middleware or route handler
        next();
    } catch (e) {
        // Handle specific JWT errors
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token has expired" });
        } else if (e.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Log unexpected errors for debugging
        console.error("Authentication error:", e);
        return res.status(500).json({ error: "Authentication failed" });
    }
};
