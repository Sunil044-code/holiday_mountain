import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check if token exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // Attach user
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token failed or expired",
      error: error.message
    });
  }
};

export { protect };