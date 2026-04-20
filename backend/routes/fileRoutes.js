const express = require("express");
const upload = require("../config/multer");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadFile,
  getMyFiles,
  downloadFile,
  getPatientFilesForDoctor,
} = require("../controllers/fileController");

const router = express.Router();

router.use(authMiddleware);

// upload
router.post(
  "/upload",
  upload.single("file"),
  uploadFile
);

// patient files
router.get("/my-files", getMyFiles);

// download
router.get("/download/:filename", downloadFile);

// doctor access
router.get("/patient/:patientId", getPatientFilesForDoctor);

module.exports = router;