import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../ResumeView/ResumeView.css";

const ResumeView = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/resume-builder/resumes/${id}`
        );
        setResumeData(response.data);
        if (user && user.savedResumes?.includes(id)) {
          setIsSaved(true);
        }
      } catch (error) {
        setErrorMessage("Error fetching resume data");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, user]);

  const handleSavedResume = async () => {
    if (!user) {
      console.error("User not authenticated. Please log in.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:4000/api/v1/resume-builder/users/${user._id}/resumes/save`,
        { resumeId: id },
        { withCredentials: true }
      );
      alert("Resume saved to your profile successfully!");
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving resume", error);
      alert("Failed to save resume. Please try again later.");
    }
  };
  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!resumeData) return <div>No resume data found.</div>;
  const handleDownload = async () => {
    if (!resumeData || !resumeData.personalInfo) {
      console.error("Resume data is not available for download.");
      return; // Exit if data is not ready
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/resume-builder/resumes/${id}/pdf`, // Update the URL to the PDF route
        {
          responseType: "blob", // Important to set the response type
        }
      );
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${resumeData.personalInfo.name}_resume.pdf`
      ); // Name the downloaded file
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!resumeData) return <div>No resume data found.</div>;

  return (
    <div className="resumeview">
      <div className="container">
        <h1>{resumeData.personalInfo?.name || "Name not provided"}</h1>
        <div className="subheading">
          <span>{resumeData.personalInfo?.email || "Email not provided"}</span>
          <span>
            {resumeData.personalInfo?.address || "Address not provided"}
          </span>
          <span>{resumeData.personalInfo?.phone || "Phone not provided"}</span>
          <span>
            {resumeData.personalInfo?.linkedin || "LinkedIn not provided"}
          </span>
        </div>
        <div className="resume-section">
          <h2>Career Objective</h2>
          <p>
            {resumeData.careerObjective || "Career objective not provided."}
          </p>
        </div>
        <div className="resume-section">
          <h2>Education</h2>
          {resumeData.education && resumeData.education.length > 0 ? (
            resumeData.education.map((edu, index) => (
              <div key={index}>
                <h3>{edu.school}</h3>
                <p>
                  {edu.degree} in {edu.major}
                </p>
                <p>GPA: {edu.gpa}</p>
                <p>{edu.achievements || "No achievements listed."}</p>
                <p>{edu.year}</p>
              </div>
            ))
          ) : (
            <p>No education information provided.</p>
          )}
        </div>
        <div className="resume-section">
          <h2>Experience</h2>
          {resumeData.experience && resumeData.experience.length > 0 ? (
            resumeData.experience.map((exp, index) => (
              <div key={index}>
                <h3>
                  {exp.title || "Title not provided"} at{" "}
                  {exp.company || "Company not provided"}
                </h3>
                <p>{exp.duration || "Duration not provided"}</p>
                <p>{exp.achievements || "No achievements listed."}</p>
                <p>{exp.description || "No description provided."}</p>
              </div>
            ))
          ) : (
            <p>No experience information provided.</p>
          )}
        </div>
        <div className="resume-section">
          <h2>Skills</h2>
          <p>{resumeData.skills || "No skills listed."}</p>
        </div>
        <div className="resume-section">
          <h2>Certifications</h2>
          <p>{resumeData.certifications || "No certifications listed."}</p>
        </div>
        <button onClick={() => navigate(`/edit-resume/${id}`)}>
          Edit Resume
        </button>
        <button onClick={handleDownload}>Download Resume</button>
        {!isSaved && user && (
          <button onClick={handleSavedResume}>Save to My Profile</button>
        )}
      </div>
    </div>
  );
};

export default ResumeView;
