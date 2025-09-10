const Car = require("../models/Car");
const Company = require("../models/Company");

// جلب جميع السيارات
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// جلب سيارة واحدة
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Voiture non trouvée" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// إضافة سيارة جديدة
const createCar = async (req, res) => {
  try {
    const { marque, modele, year, locationId, status, price,type, carburant ,places } = req.body;
    const car = await Car.create({ marque, modele, year, locationId, status, price ,type , carburant ,places });

    // تحديث عدد السيارات في الشركة
    const count = await Car.countDocuments({ locationId });
    await Company.findByIdAndUpdate(locationId, { carsNumber: count });

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// تعديل سيارة
const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// حذف سيارة
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (car) {
      // تحديث عدد السيارات في الشركة
      const count = await Car.countDocuments({ locationId: car.locationId });
      await Company.findByIdAndUpdate(car.locationId, { carsNumber: count });
    }

    res.json({ message: "Voiture supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
