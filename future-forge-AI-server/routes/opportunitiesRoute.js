const express = require("express");
const router = express.Router();
const { getOpportunities } = require("../services/opportunitiesService");

router.get("/opportunities",async (req, res)=>{
   const result = await getOpportunities(req.query.role);
   console.log(result);
    res.json(result);
});

module.exports = router;