const express = require("express");
const router = express.Router();

const { getFutureVision } = require("../controllers/futureVisionController");

router.post("/future-vision", getFutureVision);

module.exports = router;