import { generatePDF } from "../pdfGenerator.js";
import Resumes from "../models/pdfSchema.js";
import { User } from "../models/userSchema.js";
// Create a new resume
export const createResume = async (req, res) => {
  try {
    const newResume = new Resumes(req.body);
    const savedResume = await newResume.save();

    // Return the saved resume including its ID
    res.status(201).json(savedResume); 
  } catch (error) {
    console.error("Error saving resume:", error);
    res
      .status(500)
      .json({ message: "Error saving resume", error: error.message });
  }
};

// View all resumes
export async function getAllResumes(req, res) {
  try {
    const resumes = await Resumes.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve resumes" });
  }
}

// View a specific resume by ID
export async function getResumeById(req, res) {
  try {
    const { id } = req.params;
    const resume = await Resumes.findById(id); 

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the resume" });
  }
}

// Update a specific resume by ID
export async function updateResume(req, res) {
  try {
    const { id } = req.params;
    const updatedResume = await Resumes.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the resume" });
  }
}

// Delete a specific resume by ID
export async function deleteResume(req, res) {
  try {
    const { id } = req.params;
    const deletedResume = await Resumes.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the resume" });
  }
}

export async function getResumePDF(req, res) {
  try {
    const { id } = req.params;
    const resume = await Resumes.findById(id); // Find the resume by ID

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const pdfBuffer = await generatePDF(resume); 

    if (!pdfBuffer) {
      return res.status(500).json({ error: "PDF generation returned no data" });
    }

    // Set the response headers for PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resume.personalInfo.name}_resume.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer); // Send the PDF buffer
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

// Save resume for a specific user
export const saveResumeForUser = async (req, res) => {
  try {
    const { userId } = req.params; 
    const resumeId = req.body.resumeId; 

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the resume is already saved by this user
    if (user.savedResumes.includes(resumeId)) {
      return res.status(400).json({ message: "Resume already saved" });
    }

    // Add the resumeId to the user's savedResumes array
    user.savedResumes.push(resumeId);
    await user.save();

    res.status(200).json({ message: "Resume saved successfully", savedResumes: user.savedResumes });
  } catch (error) {
    console.error("Error saving resume for user:", error);
    res.status(500).json({ message: "Error saving resume for user", error: error.message });
  }
};

// Get all saved resumes for a specific user
export const getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).populate('savedResumes');  // Populate savedResumes if it's a reference to Resume documents
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the saved resumes of the user
    const savedResumes = user.savedResumes;
    
    res.status(200).json(savedResumes);  // Return the saved resumes
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    res.status(500).json({ error: "Failed to fetch user resumes" });
  }
};
