import jwt from "jsonwebtoken";
import User from "../models/User.model.js"
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.json({success: false, message: "Unauthorized (Token is not available)"});
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user by userId
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        req.user = user; 
        next();

    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.json({success: false, message: `Not authorized: ${error.message}`});
    }
};