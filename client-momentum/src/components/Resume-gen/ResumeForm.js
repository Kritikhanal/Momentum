import React, { useState } from "react";
import axios from "axios";
import styles from "./ResumeForm.module.css";
import { useNavigate } from "react-router-dom";

const ResumeForm = () => {
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
  const addProject = () => {
    setFormData({
      ...formData,
      project: [
        ...formData.project,
        {
          title: "",

          duration: "",
          role: "",
          skills: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProject = formData.project.filter((_, i) => i !== index);
    setFormData({ ...formData, project: updatedProject });
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/resume-builder/resumes",
        formData
      );

      const resumeId = response.data._id;
      navigate(`/resume/${resumeId}`); // Navigate to the resume view
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.resumeForm}>
      <h3>Resume Builder</h3>
      <p>
        Please fill your information in detail. While writing description for
        any experience or achievement write down in points starting with &nbsp;
        <a href="https://becomeawritertoday.com/list-of-action-words/">
          action words
        </a>{" "}
        separated by comma. When you separate the sentence by comma it will be
        in bullet points
      </p>

      {/* Personal Info Section */}
      <div className="form-section">
        <h6>Personal Information</h6>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={(e) => handleInputChange(e, "personalInfo")}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (begin with country code)"
          onChange={(e) => handleInputChange(e, "personalInfo")}
          required
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          onChange={(e) => handleInputChange(e, "personalInfo")}
        />
      </div>

      {/* Career Objective Section */}
      <div className="form-section">
        <h6>Career Objective</h6>
        <textarea
          name="careerObjective"
          placeholder="Write your career objective and skill summary here"
          onChange={(e) => handleInputChange(e, "careerObjective")}
          required
        />
      </div>

      {/* Education Section */}
      <div className="form-section">
        <h6>Education</h6>
        {formData.education.map((edu, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="school"
              placeholder="University/School"
              onChange={(e) => handleInputChange(e, "education", index)}
              required
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="major"
              placeholder="Major"
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="gpa"
              placeholder="GPA"
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <textarea
              name="achievements"
              placeholder="Achievements"
              onChange={(e) => handleInputChange(e, "education", index)}
            />
            <input
              type="text"
              name="year"
              placeholder="Year of Start and Graduation"
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

      {/* Experience Section */}
      <div className="form-section">
        <h6>Experience</h6>
        {formData.experience.map((exp, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <textarea
              name="achievements"
              placeholder="Achievements"
              onChange={(e) => handleInputChange(e, "experience", index)}
            />
            <textarea
              name="description"
              placeholder="Describe your responsibilities and skills used/developed"
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
      {/*Project Section */}
      <div className="form-section">
        <h6>Project</h6>
        {formData.project.map((edu, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              onChange={(e) => handleInputChange(e, "project", index)}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="your role"
              onChange={(e) => handleInputChange(e, "project", index)}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              onChange={(e) => handleInputChange(e, "project", index)}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
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

      {/* Skills and Certifications Section */}
      <div className="form-section">
        <h6>Skills</h6>
        <textarea
          name="skills"
          placeholder="List your skills here"
          onChange={(e) => handleInputChange(e, "skills")}
        />
      </div>
      {/*Certficate Section */}
      <div className="form-section">
        <h6>Certifications</h6>
        {formData.certification.map((edu, index) => (
          <div key={index} className="form-subsection">
            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              onChange={(e) => handleInputChange(e, "certification", index)}
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              onChange={(e) => handleInputChange(e, "certification", index)}
            />
            <textarea
              name="description"
              placeholder=" Description"
              onChange={(e) => handleInputChange(e, "certification", index)}
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

      <button type="submit" className={styles.submitButton}>
        Generate Resume
      </button>
    </form>
  );
};

export default ResumeForm;
