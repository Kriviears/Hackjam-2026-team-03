const { generateCareerAdvice } = require("../services/aiService");
const User = require("../models/User");

const getAIRecommendation = async (req, res) => {
    try {
        const { userId, ...userInputs } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID required" });
        }

        // Get user to include phase context
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Include phase history context for Claude to generate next phase
        const aiInputs = {
            ...userInputs,
            activePhaseNumber: user.activePhaseNumber,
            previousPhaseOutcome: user.phaseHistory.length > 0
                ? user.phaseHistory[user.phaseHistory.length - 1]
                : null,
        };

        // Generate phase from Claude
        const recommendation = await generateCareerAdvice(aiInputs);

        // Save to database
        user.currentPhase = recommendation.phase;
        user.readinessSnapshot = recommendation.readinessSnapshot;
        user.topGaps = recommendation.topGaps;
        user.goal = recommendation.goal;
        await user.save();

        res.status(200).json({
           recommendation,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate AI recommendation."
        });
    }
};

module.exports = {
    getAIRecommendation
};