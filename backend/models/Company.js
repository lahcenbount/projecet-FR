// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  NameProprietaire: { type: String, required: true },
  businessLicense: { type: String, required: true, unique: true },
  companyLocation: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  modePass: { type: String, required: true },
  logo: { type: String }, 
    chiffreAffaires: { type: Number, default: 0 }, 
  carsNumber: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
