import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

export async function generatePDF(resumeData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    // Create a stream to capture the PDF output
    const passThrough = new PassThrough();

    // Capture the data
    passThrough.on("data", (chunk) => buffers.push(chunk));
    passThrough.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    passThrough.on("error", (err) => reject(err));

    // Pipe the document to the passThrough stream
    doc.pipe(passThrough);

    // Add the header for the resume with name and contact details
    doc
      .font("Times-Bold")
      .fontSize(22)
      .text(`${resumeData.personalInfo.name}`, { align: "center" });
    doc
      .font("Times-Roman")
      .fontSize(11)
      .text(
        `${resumeData.personalInfo.email}| ${resumeData.personalInfo.address}  | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.linkedin}`,
        { align: "center" }
      );
    doc.moveDown(1);

    // Draw a line after the header
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Career Objective Section
    doc.font("Times-Bold").fontSize(14).text("Career Objective");
    doc.moveDown(0.2);
    doc
      .font("Times-Roman")
      .fontSize(11)
      .text(resumeData.careerObjective, { lineGap: 4 });
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Education Section
    doc.font("Times-Bold").fontSize(14).text("Education");
    doc.moveDown(0.2);

    resumeData.education.forEach((edu) => {
      doc
        .font("Times-Bold")
        .fontSize(11)
        .text(`${edu.school}`, { continued: true })
        .text(`${edu.year}`, { align: "right", lineGap: 2 });

      doc
        .font("Times-Italic")
        .fontSize(11)
        .text(`${edu.degree} in ${edu.major}`);

      // List achievements as bullet points
      if (edu.achievements) {
        const achievementsList = edu.achievements
          .split(",")
          .map((ach) => ach.trim());
        doc.font("Times-Roman").fontSize(11).list(achievementsList, {
          bulletRadius: 2,
          textIndent: 10,
          lineGap: 2,
        });
      }
      doc.moveDown(0.2);
    });
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Professional Experience Section
    doc.font("Times-Bold").fontSize(14).text("Professional Experience");
    doc.moveDown(0.2);
    resumeData.experience.forEach((exp) => {
      doc
        .font("Times-Bold")
        .fontSize(11)
        .text(`${exp.company}`, { continued: true })
        .text(`${exp.duration}`, { align: "right", lineGap: 2 });
      doc.font("Times-Italic").fontSize(11).text(`${exp.title} `);

      // List achievement as bullet points
      if (exp.achievements) {
        const achievementsList = exp.achievements
          .split(",")
          .map((ach) => ach.trim());
        doc.font("Times-Roman").fontSize(11).list(achievementsList, {
          bulletRadius: 2,
          textIndent: 10,
          lineGap: 2,
        });
      }

      if (exp.description) {
        const descriptionList = exp.description
          .split(",")
          .map((ach) => ach.trim());
        doc.font("Times-Roman").fontSize(11).list(descriptionList, {
          bulletRadius: 2,
          textIndent: 10,
          lineGap: 2,
        });
      }
      doc.moveDown(0.5);
    });
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Project Section
    doc.font("Times-Bold").fontSize(14).text("Projects");
    doc.moveDown(0.2);
    resumeData.project.forEach((pro) => {
      doc
        .font("Times-Bold")
        .fontSize(11)
        .text(`${pro.title}`, { continued: true });

      doc.font("Times-Italic").fontSize(11).text(`${pro.role} `);

      // project description
      if (pro.description) {
        const descriptionList = pro.description
          .split(",")
          .map((ach) => ach.trim());
        doc.font("Times-Roman").fontSize(11).list(descriptionList, {
          bulletRadius: 2,
          textIndent: 10,
          lineGap: 2,
        });
      }

      doc.moveDown(0.5);
    });
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Skills Section
    doc.font("Times-Bold").fontSize(14).text("Skills");
    doc.moveDown(0.2);
    doc
      .font("Times-Roman")
      .fontSize(11)
      .list(
        resumeData.skills.split(",").map((skill) => skill.trim()),
        { bulletRadius: 2 }
      );
    doc.moveDown(0.2);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Certifications Section
    doc.font("Times-Bold").fontSize(14).text("Certifications");
    doc.moveDown(0.2);
    resumeData.certification.forEach((cert) => {
      doc
        .font("Times-Bold")
        .fontSize(11)
        .text(`${cert.name}`, { continued: true })
        .text(`${cert.duration}`, { align: "right", lineGap: 2 });

      // description
      if (cert.description) {
        const descriptionList = cert.description
          .split(",")
          .map((ach) => ach.trim());
        doc.font("Times-Roman").fontSize(11).list(descriptionList, {
          bulletRadius: 2,
          textIndent: 10,
          lineGap: 2,
        });
      }

      doc.moveDown(0.5);
    });
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    doc.moveDown(1);

    doc.moveDown(0.5);

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.end();
  });
}
