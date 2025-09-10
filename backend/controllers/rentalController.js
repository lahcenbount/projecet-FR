const Rental = require('../models/Rental');
const Car = require('../models/Car');
const Company = require('../models/Company');

// جلب جميع الحجوزات
const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("userId", "nom")
      .populate({
        path: "carId",
        select: "marque modele year status price locationId createdAt updatedAt",
        populate: { path: "locationId", select: "companyName" } // populate location من car
      });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// جلب حجز واحد
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("userId", "nom email")
      .populate("carId", "marque modele");
    if (!rental) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const getRentalByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`userId: ${userId}`);

    // Find the company of this user
    const company = await Company.findOne({ userId }).select("userId");
    if (!company) {
      return res.status(404).json({ message: "Company not found for this user" });
    }

    // Get cars for this company and extract their IDs
    const cars = await Car.find({ locationId: company._id }).select('_id');
    const carIds = cars.map(car => car._id); // array of ObjectId

    // Get rentals for these cars and populate car info
    const rentals = await Rental.find({ carId: { $in: carIds } }).populate('carId');

    res.status(200).json(rentals);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// إنشاء حجز جديد
const createRental = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, price } = req.body;
    const rental = await Rental.create({ userId, carId, startDate, endDate, price });
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// تعديل حالة الحجز
const updateRentalStatus = async (req, res) => {
  try {
    const { status } = req.body; // pending / approved / rejected
    const rental = await Rental.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!rental) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// حذف حجز
const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json({ message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 📌 جلب الحجوزات الجديدة (NOUVELLES DEMANDES)
const getNewRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ status: req.params.status })
      .populate("userId", "nom email")
      .populate({
        path: "carId",
        select: "marque modele year price locationId",
        populate: { path: "locationId", select: "companyName" }
      });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRentalStatus,
  deleteRental,
  getNewRentals, // ⬅️ زدنا هادي
  getRentalByUserId
};
