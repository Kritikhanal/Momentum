import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
 
  // Check if the token is present
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   

    // Attach the user to the request object
    req.user = await User.findById(decoded.id);

    // Check if the user exists
    if (!req.user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
     console.error("Token verification error:", error);
   
    return next(new ErrorHandler("Invalid or Expired Token", 401));
  }
});
