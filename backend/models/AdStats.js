const mongoose = require("mongoose");

const AdStatsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  demandesLocation: {
    count: { type: Number, default: 0 },
    change: { type: String, default: "+0%" },
  },
  entreprisesActives: {
    count: { type: Number, default: 0 },
    change: { type: String, default: "+0%" },
  },
  vehiculesDisponibles: {
    count: { type: Number, default: 0 },
    change: { type: String, default: "+0%" },
  },
  revenusMensuels: {
    montant: { type: Number, default: 0 },
    change: { type: String, default: "+0%" },
  },
});

module.exports = mongoose.model("AdStats", AdStatsSchema);
