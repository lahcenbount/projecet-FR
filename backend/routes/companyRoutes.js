const express = require("express");
const router = express.Router();
const { createCompany, getCompanies } = require("../controllers/companyController");
const multer = require("multer");
const path = require("path");

// إعداد التخزين للملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.get("/", getCompanies);

router.post("/", upload.single("logo"), createCompany);

module.exports = router;
