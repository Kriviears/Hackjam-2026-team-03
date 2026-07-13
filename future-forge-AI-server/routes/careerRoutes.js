const express = require("express");
const router = express.Router();

const {
    getCareerPath,
    completePhase
} = require("../controllers/careerController");


// GET complete roadmap (current phase + all past phases)
router.get("/career-path", getCareerPath);

// POST phase completion (saves to history and increments phase)
router.post("/career-path/complete-phase", completePhase);


module.exports = router;