const express = require("express");
const {
  getAllRentals,
  getRentalById,
  createRental,
  updateRentalStatus,
  deleteRental,
  getNewRentals,
  getRentalByUserId
} = require("../controllers/rentalController");

const router = express.Router();

router.get("/", getAllRentals);
router.get("/:status", getNewRentals); 
router.get("/:id", getRentalById);
router.get("/company/:id", getRentalByUserId);
router.post("/", createRental);
router.put("/:id/status", updateRentalStatus);
router.delete("/:id", deleteRental);

module.exports = router;
