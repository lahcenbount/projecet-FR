const express = require("express");
const { getLatestStats } = require("../controllers/adstatsController");

const router = express.Router();

router.get("/", getLatestStats);

module.exports = router;
