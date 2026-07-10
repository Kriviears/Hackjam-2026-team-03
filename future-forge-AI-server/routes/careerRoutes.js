const express = require("express");
const router = express.Router();

const { 
    getCareerPath,
    createCareerPath
} = require("../controllers/careerController");


// GET existing career path
router.get("/career-path", getCareerPath);


// POST user information and generate career path
router.post("/career-path", createCareerPath);


module.exports = router;