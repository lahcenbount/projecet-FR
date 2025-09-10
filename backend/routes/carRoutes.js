const express = require("express");
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require("../controllers/carController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// // بعض Routes يمكن الوصول لها من جميع المستخدمين المسجلين
// router.get("/", getAllCars);
// router.get("/:id", getCarById);

// // Routes خاصة بالـ Admin
// router.post("/", protect, authorize("admin"), createCar);
// router.put("/:id", protect, authorize("admin"), updateCar);
// router.delete("/:id", protect, authorize("admin"), deleteCar);

// بعض Routes يمكن الوصول لها من جميع المستخدمين المسجلين
router.get("/", getAllCars);
router.get("/:id", getCarById);

// Routes خاصة بالـ Admin
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
