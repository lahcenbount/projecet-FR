const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    marque: { type: String, required: true },
    type: { type: String, required: true },
    carburant: { type: String, required: true },
    places:{type: Number, required: true} ,
    modele: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ["available", "booked"], default: "available" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
