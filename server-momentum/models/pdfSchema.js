import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
  personalInfo: {
    name: String,
    address: String,
    email: String,
    phone: String,
    linkedin: String,
  },
  careerObjective: String,
  education: [
    {
      degree: String,
      major: String,
      school: String,
      year: String,
      gpa: String,
      achievements: String,
    },
  ],
  project: [
    {
      title: String,
      role: String,

      description: String,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      duration: String,
      achievements: String,
      description: String,
    },
  ],

  skills: String,
  certification: [
    {
      name: String,
      duration: String,
      description: String,
    },
  ],
});

export default model("Resumes", pdfSchema);
