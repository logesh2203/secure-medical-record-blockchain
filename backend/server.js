require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const clearUploadsOnStart = require("./utils/clearUploads");
const User = require("./models/User");

// routes
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/doctor", doctorRoutes);

// static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ message: "OK" });
});

const startServer = async () => {
  await connectDB();

  // 🔥 RESET (your requirement)
  await User.deleteMany({});
  clearUploadsOnStart();

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
};

startServer();