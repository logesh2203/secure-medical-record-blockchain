const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

const contractArtifact = require("../../build/contracts/MedicalRecord.json");

const web3 = new Web3(process.env.GANACHE_RPC_URL);
const contract = new web3.eth.Contract(
  contractArtifact.abi,
  process.env.MEDICAL_RECORD_CONTRACT_ADDRESS
);

// GET ALL PATIENTS
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select(
      "_id name walletAddress"
    );

    return res.json({ patients });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET FILES FOR DOCTOR
const getDoctorFiles = async (req, res) => {
  try {
    const hospitalName = req.user.hospitalName;
    const normalizedHospital = String(hospitalName || "").trim().toUpperCase();
    const { patientWallet } = req.query;

    if (!patientWallet) {
      return res.status(400).json({ message: "patientWallet is required" });
    }

    if (!normalizedHospital) {
      return res.status(403).json({
        message: "Access denied for this hospital",
        accessAllowed: false,
        files: [],
      });
    }

    let accessAllowed = false;

    try {
      accessAllowed = await contract.methods
        .checkAccess(patientWallet.toLowerCase(), normalizedHospital)
        .call();
    } catch (err) {
      console.log("Blockchain error:", err.message);
      accessAllowed = true;
    }

    if (accessAllowed === false) {
      return res.status(403).json({
        message: "Access denied for this hospital",
        accessAllowed: false,
        files: [],
      });
    }

    const uploadsPath = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(uploadsPath)) {
      return res.json({
        files: [],
        accessAllowed: true,
      });
    }

    const files = fs
      .readdirSync(uploadsPath)
      .filter((file) => file.startsWith(patientWallet.toLowerCase()))
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
  getPatients,
  getDoctorFiles,
};
