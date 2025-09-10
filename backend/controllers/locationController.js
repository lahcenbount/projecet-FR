const Location = require("../models/Location");

// جلب جميع المواقع
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// جلب موقع واحد
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "Location non trouvée" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// إضافة موقع جديد
const createLocation = async (req, res) => {
  try {
    const { name, address, coordinates } = req.body;
    const location = await Location.create({ name, address, coordinates });
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// تعديل موقع
const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) return res.status(404).json({ message: "Location non trouvée" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// حذف موقع
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: "Location non trouvée" });
    res.json({ message: "Location supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
};
