const fs = require("fs");
const path = require("path");

// UPLOAD
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const patientWallet = String(req.user?.walletAddress || "").toLowerCase();
    if (!patientWallet) {
      return res.status(400).json({ message: "Patient wallet address is required" });
    }

    const uploadsPath = path.join(__dirname, "..", "uploads");
    const oldPath = path.join(uploadsPath, req.file.filename);
    const newName = `${patientWallet}_${req.file.filename}`;
    const newPath = path.join(uploadsPath, newName);

    fs.renameSync(oldPath, newPath);

    return res.status(200).json({
      message: "File uploaded",
      filename: newName,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET PATIENT FILES
const getMyFiles = async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "..", "uploads");
    const patientWallet = String(req.user?.walletAddress || "").toLowerCase();

    if (!fs.existsSync(uploadsPath)) {
      return res.json({
        files: [],
        hospitalAccess: [],
      });
    }

    const files = fs
      .readdirSync(uploadsPath)
      .filter((file) => file.startsWith(patientWallet))
      .map((file) => ({
        filename: file,
        downloadUrl: `/api/files/download/${file}`,
      }));

    return res.json({
      files,
      hospitalAccess: [],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DOWNLOAD
const downloadFile = async (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(__dirname, "..", "uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DOCTOR FILES
const getPatientFilesForDoctor = async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "..", "uploads");
    const patientWallet = String(req.query?.patientWallet || "").toLowerCase();

    if (!fs.existsSync(uploadsPath)) {
      return res.json({
        files: [],
        accessAllowed: true,
      });
    }

    const files = fs
      .readdirSync(uploadsPath)
      .filter((file) => file.startsWith(patientWallet))
      .map((file) => ({
        filename: file,
        downloadUrl: `/api/files/download/${file}`,
      }));

    return res.json({
      files,
      accessAllowed: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
  getMyFiles,
  downloadFile,
  getPatientFilesForDoctor,
};
