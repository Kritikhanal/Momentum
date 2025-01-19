import ScorerResume from "../models/resumeSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import fs from "fs";
import { scoreResume } from "../utils/textProcessor.js"; // Ensure scorer.js has the TFIDF and keyword matching logic

const uploadResume = catchAsyncErrors(async (req, res, next) => {
  // Ensure a resume file and job description are provided
  if (!req.files || !req.files.resume) {
    return next(new ErrorHandler("Resume file is required", 400));
  }
  if (!req.body.jobDescription) {
    return next(new ErrorHandler("Job description is required", 400));
  }

  const { resume } = req.files;
  const { jobDescription } = req.body;

  // Upload resume to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { resource_type: "raw" } // Ensures raw files like PDFs can be uploaded
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  // Read the resume file locally
  const resumeText = fs.readFileSync(resume.tempFilePath, "utf8");

  // Calculate the resume score
  const scoringResult = scoreResume(resumeText, jobDescription);

  // Save the resume, job description, and score to the database
  const newResume = await ScorerResume.create({
    jobDescription,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    resumeScore: scoringResult.overallScore, // Save the computed score
  });

  // Respond with success, scoring result, and the resume details
  res.status(200).json({
    success: true,
    message: "Your Resume Score is ",
    resume: newResume,
    scoringResult,
  });
});

export default uploadResume;
