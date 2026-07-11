const express = require("express");
const router = express.Router();

const { getAIRecommendation } = require("../controllers/aiController");

router.post("/ai/recommendation", getAIRecommendation);

module.exports = router;