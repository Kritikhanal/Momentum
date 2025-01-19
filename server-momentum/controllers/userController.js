import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    companyAchievements,
    profilePicture,
    companyValues,
    bio,
  } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please full-fill registration form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  let profileData = {};
  if (profilePicture) {
    const result = await cloudinary.v2.uploader.upload(profilePicture, {
      folder: "profilePictures",
    });
    profileData = { public_id: result.public_id, url: result.secure_url };
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    bio,
    companyValues,
    companyAchievements,
    role,
    profilePicture: profileData,
  });
  sendToken(user, 201, res, "User Registered Successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.profilePicture) {
    return next(new ErrorHandler("Profile picture file is required", 400));
  }

  const { profilePicture } = req.files;

  // Upload profile picture to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    profilePicture.tempFilePath,
    { folder: "profilePictures" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler("Failed to upload profile picture to Cloudinary", 500)
    );
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Delete the old profile picture if it exists
  if (user.profilePicture?.public_id) {
    await cloudinary.uploader.destroy(user.profilePicture.public_id);
  }

  // Save new profile picture details
  user.profilePicture = {
    public_id: cloudinaryResponse.public_id,
    url: cloudinaryResponse.secure_url,
  };
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture uploaded successfully",
    profilePicture: user.profilePicture,
  });
});

export const getProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); // Fetch user by ID
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check if user has a profile picture
  if (!user.profilePicture || !user.profilePicture.url) {
    return next(new ErrorHandler("Profile picture not found", 404));
  }

  res.status(200).json({
    success: true,
    profilePicture: user.profilePicture,
  });
});
