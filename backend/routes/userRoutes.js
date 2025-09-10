const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

// جميع Routes محمية بـ protect و authorize("admin")
router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
