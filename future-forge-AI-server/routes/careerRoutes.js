const express = require("express");
const router = express.Router();

const { getCareerPath } = require("../controllers/careerController");

router.get("/career-path", getCareerPath);

module.exports = router;