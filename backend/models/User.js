const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: true,
    },
    hospitalName: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function validateHospitalName(value) {
          if (this.role === "doctor") {
            return Boolean(value && value.trim().length > 0);
          }
          return true;
        },
        message: "hospitalName is required for doctor role",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
