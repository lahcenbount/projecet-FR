const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    location: { type: String, required: false }, // ممكن تربطه بـ Location
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
