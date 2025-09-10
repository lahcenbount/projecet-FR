const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    // coordinates: {
    //   lat: { type: Number, required: false },
    //   lng: { type: Number, required: false },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
