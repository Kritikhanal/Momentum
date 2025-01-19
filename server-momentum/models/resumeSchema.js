import mongoose from "mongoose";

const scorerResume = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Please provide the job description"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resumeScore: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
const ScorerResume = mongoose.model("ScorerResume", scorerResume);

export default ScorerResume;

