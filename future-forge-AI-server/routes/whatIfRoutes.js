const express = require("express");
const router = express.Router();

const { getWhatIf } = require("../controllers/whatIfController");

router.post("/what-if", getWhatIf);

module.exports = router;