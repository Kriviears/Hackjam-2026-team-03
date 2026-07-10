// import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const careerRoutes = require("./routes/careerRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

// API routes
app.use("/api", careerRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Future Forge AI Server is running");
});

// start express server
app.listen(PORT, () => {
    console.log(`Future Forge AI Application started and listening on ${PORT}.`);
});