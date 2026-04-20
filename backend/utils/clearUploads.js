const fs = require("fs");
const path = require("path");

const uploadsPath = path.join(__dirname, "..", "uploads");

const clearUploadsOnStart = () => {
  try {
    // delete folder if exists
    if (fs.existsSync(uploadsPath)) {
      fs.rmSync(uploadsPath, { recursive: true, force: true });
    }

    // recreate empty folder
    fs.mkdirSync(uploadsPath, { recursive: true });

    console.log("Uploads folder cleared on startup.");
  } catch (error) {
    console.error("Error clearing uploads folder:", error.message);
  }
};

module.exports = clearUploadsOnStart;