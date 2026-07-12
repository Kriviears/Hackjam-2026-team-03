const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../controllers/authController");

router.post("/login",(req, res)=>{
   authenticateUser(req, res);
});

module.exports = router;