const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getPatients,
  getDoctorFiles,
} = require("../controllers/doctorController");

const router = express.Router();

router.use(authMiddleware);

router.get("/patients", getPatients);
router.get("/files", getDoctorFiles);

module.exports = router;