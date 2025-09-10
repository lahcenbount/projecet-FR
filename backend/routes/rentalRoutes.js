const express = require("express");
const {
  getAllRentals,
  getRentalById,
  createRental,
  updateRentalStatus,
  deleteRental,
  getNewRentals
} = require("../controllers/rentalController");

const router = express.Router();

router.get("/", getAllRentals);
router.get("/:status", getNewRentals); 
router.get("/:id", getRentalById);
router.post("/", createRental);
router.put("/:id/status", updateRentalStatus);
router.delete("/:id", deleteRental);

module.exports = router;
