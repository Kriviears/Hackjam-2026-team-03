const express = require("express");
const router = express.Router();

const { getEmployers } = require("../controllers/employerController");

router.get("/employers", getEmployers);

module.exports = router;