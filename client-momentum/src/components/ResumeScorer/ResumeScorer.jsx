import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster
import "./ResumeScorer.css";

const ResumeScorer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleScoreResume = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobDescription) {
      toast.error("Please provide both the job description and resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/resume-scorer/score",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract response details and show in the toast
      const { success, message, resume, scoringResult } = response.data;

      if (success) {
        toast.success(`${message}\nScore: ${scoringResult.overallScore}`);
      }
    } catch (error) {
      toast.error(
        `Error uploading resume: ${error.response?.data || error.message}`
      );
    }
  };

  return (
    <section className="resumeScorerPage">
      <div className="container">
        <div className="resume-card">
          <div className="header">
            <h3>Resume Scorer</h3>
            <p>Upload your resume and provide the job description</p>
          </div>
          <form onSubmit={handleScoreResume}>
            <div className="inputTag">
              <label>Job Description</label>
              <div className="inputContainer">
                <textarea
                  placeholder="Paste the job description here"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <IoMdPaper />
              </div>
            </div>
            <div className="inputTag">
              <label>Upload Resume</label>
              <div className="inputContainer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <FaFileUpload />
              </div>
            </div>
            <button type="submit">Score Resume</button>
          </form>
        </div>
      </div>
      <div className="banner">
        <img src="/5.jpeg" alt="resume scoring" />
      </div>

      {/* Toaster for showing toast notifications */}
      <Toaster position="top-center" />
    </section>
  );
};

export default ResumeScorer;
