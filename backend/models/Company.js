// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true, unique: true },
  businessLicense: { type: String, required: true, unique: true },
  companyLocation: { type: String, required: true },
  status: { type: String, enum: ["Active", "Reviewing"], default: "Active" },
  logo: { type: String }, 
    chiffreAffaires: { type: Number, default: 0 }, 
  carsNumber: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
