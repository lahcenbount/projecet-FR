const express = require("express");
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} = require("../controllers/locationController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// أي مستخدم مسجل يمكنه مشاهدة المواقع
router.get("/", protect, getAllLocations);
router.get("/:id", protect, getLocationById);

// Routes خاصة بالـ Admin
router.post("/", protect, createLocation);
router.put("/:id", protect, updateLocation);
router.delete("/:id", protect, deleteLocation);

module.exports = router;
