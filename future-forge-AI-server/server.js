// import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

// Import Routes
const careerRoutes = require("./routes/careerRoutes");
const futureVisionRoutes = require("./routes/futureVisionRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const companyRoutes = require("./routes/companyRoutes");
const whatIfRoutes = require("./routes/whatIfRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

// API Routes
app.use("/api", careerRoutes);
app.use("/api", futureVisionRoutes);
app.use("/api", mentorRoutes);
app.use("/api", companyRoutes);
app.use("/api", whatIfRoutes);
app.use("/api", aiRoutes);
app.use("/api", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Future Forge AI Server is running");
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Future Forge AI Application started and listening on ${PORT}.`);
});