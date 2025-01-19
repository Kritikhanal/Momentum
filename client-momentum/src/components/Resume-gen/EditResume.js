import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ResumeForm.module.css"; // Use the same styles for consistency
import { useParams, useNavigate } from "react-router-dom";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      address: "",
      email: "",
      phone: "",
      linkedin: "",
    },
    careerObjective: "",
    education: [],
    experience: [],
    project: [],
    skills: "",
    certification: [],
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/resume-builder/resumes/${id}`
        );
        setFormData(response.data); // Populate form data with existing resume
      } catch (error) {
        setErrorMessage("Error fetching resume data");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };

    if (section === "skills" || section === "certifications") {
      updatedData[name] = value;
    } else if (index !== null) {
      updatedData[section][index][name] = value;
    } else if (section === "careerObjective") {
      updatedData.careerObjective = value;
    } else {
      updatedData[section][name] = value;
    }

    setFormData(updatedData);
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: "",
          degree: "",
          major: "",
          gpa: "",
          achievements: "",
          year: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          title: "",
          company: "",
          duration: "",
          achievements: "",
          skills: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addcertification = () => {
    setFormData({
      ...formData,
      certification: [
        ...formData.certification,
        {
          name: "",

          duration: "",

          description: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertification = formData.certification.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, certification: updatedCertification });
  };
  const addProject = () => {
    setFormData({
      ...formData,
      project: [
        ...formData.project,
        {
          title: "",

          role: "",

          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProject = formData.project.filter((_, i) => i !== index);
    setFormData({ ...formData, project: updatedProject });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/api/v1/resume-builder/resumes/${id}`,
        formData
      );
      navigate(`/resume/${id}`); // Navigate back to the resume view after saving
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.resumeForm}>
      <h2>Edit Resume</h2>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      {/* Personal Info Section */}
      <div className="form-section">
        <h3>Personal Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.personalInfo.name}
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.personalInfo.address}
          onChange={(e) => handleInputChange(e, "personalInfo")}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.personalInfo.email}
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (begin with country code)"
          value={formData.personalInfo.phone}
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={formData.personalInfo.linkedin}
          onChange={(e) => handleInputChange(e, "personalInfo")}
        />
      </div>

      {/* Career Objective Section */}
      <div className="form-section">
        <h3>Career Objective</h3>
        <textarea
          name="careerObjective"
          placeholder="Write your career objective here"
          value={formData.careerObjective}
          onChange={(e) => handleInputChange(e, "careerObjective")}
          required
        />
      </div>

      <div className="form-section">
        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="school"
              placeholder="University/School"
              value={edu.school}
              onChange={(e) => handleInputChange(e, "education", index)}
              required
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="major"
              placeholder="Major"
              value={edu.major}
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="gpa"
              placeholder="GPA"
              value={edu.gpa}
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <textarea
              name="achievements"
              placeholder="Achievements"
              value={edu.achievements}
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="year"
              placeholder="Year of Start and Graduation"
              value={edu.year}
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <button type="button" onClick={() => removeEducation(index)}>
              Remove Education
            </button>
          </div>
        ))}
        <button type="button" onClick={addEducation}>
          Add Education
        </button>
      </div>
      {/* project */}
      <div className="form-section">
        <h6>Project</h6>
        {formData.project.map((pro, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={pro.title}
              onChange={(e) => handleInputChange(e, "project", index)}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="your role"
              value={pro.role}
              onChange={(e) => handleInputChange(e, "project", index)}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={pro.description}
              onChange={(e) => handleInputChange(e, "project", index)}
            />

            <button type="button" onClick={() => removeProject(index)}>
              Remove Project
            </button>
          </div>
        ))}
        <button type="button" onClick={addProject}>
          Add Project
        </button>
      </div>

      {/* Experience Section */}
      <div className="form-section">
        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
              value={exp.duration}
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <textarea
              name="achievements"
              placeholder="Achievements"
              value={exp.achievements}
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <textarea
              name="description"
              placeholder="Describe your responsibilities and skills used/developed"
              value={exp.description}
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <button type="button" onClick={() => removeExperience(index)}>
              Remove Experience
            </button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
      </div>

      {/* Skills and Certifications Section */}
      <div className="form-section">
        <h3>Skills and Certifications</h3>
        <textarea
          name="skills"
          placeholder="List your skills here"
          value={formData.skills}
          onChange={(e) => handleInputChange(e, "skills")}
        />
      </div>

      {/*Certficate Section */}
      <div className="form-section">
        <h6>Certifications</h6>
        {formData.certification.map((cert, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => handleInputChange(e, "certification", index)}
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              onChange={(e) => handleInputChange(e, "certification", index)}
              value={cert.duration}
            />
            <textarea
              name="description"
              placeholder=" Description"
              onChange={(e) => handleInputChange(e, "certification", index)}
              value={cert.description}
            />

            <button type="button" onClick={() => removeCertification(index)}>
              Remove Certification
            </button>
          </div>
        ))}
        <button type="button" onClick={addcertification}>
          Add Certifications
        </button>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditResume;
