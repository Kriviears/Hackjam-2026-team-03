const express = require("express");
const router = express.Router();
const { getOpportunities } = require("../services/opportunitiesService");
const { getTechGroups } = require("../services/googlePlacesService");

router.get("/opportunities", async (req, res) => {
    const result = await getOpportunities(req.query.role);
    console.log(result);
    res.json(result);
});

router.get("/techGroups", async (req, res) => {
    try {
        const result = await getTechGroups();
        console.log(result);
        res.json({
            count: result.places?.length || 0,
            places: result.places || []
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch places",
            details: error.message
        });
    }
})

module.exports = router;