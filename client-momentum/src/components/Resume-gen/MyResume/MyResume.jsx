import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation to ResumeView
import axios from "axios";
import "./MyResume.css";

const MyResumes = ({ user }) => {
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user || !user._id) {
      setErrorMessage("User data is not available.");
      setLoading(false);
      return;
    }

    const fetchSavedResumes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/resume-builder/users/${user._id}/resumes`
        );
        setSavedResumes(response.data);
      } catch (error) {
        setErrorMessage("Error fetching saved resumes.");
        console.error("Error fetching saved resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedResumes();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (savedResumes.length === 0) return <div>No saved resumes.</div>;

  return (
    <div className="my-resumes">
      <h1>My Saved Resumes</h1>
      <div className="resume-cards-container">
        {savedResumes.map((resume, index) => (
          <div key={index} className="resume-card">
            <Link to={`/resume/${resume._id}`} className="resume-link">
              <div className="resume-card-header">
                <h5>{resume.personalInfo?.name || "No Name Provided"}</h5>
              </div>
              <div className="resume-card-body">
                <p>{resume.careerObjective || "No objective provided"}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResumes;
