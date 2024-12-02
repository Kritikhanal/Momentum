import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import axios from "axios";
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
      alert("Please provide both the job description and resume file.");
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

      console.log("Upload Success:", response.data);
    } catch (error) {
      console.error(
        "Error uploading resume:",
        error.response?.data || error.message
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
    </section>
  );
};

export default ResumeScorer;
