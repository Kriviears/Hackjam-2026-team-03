const careerData = require("../data/careerData");
const User = require("../models/User");


// Fetch complete roadmap (current phase + all past phases)
const getCareerPath = async (req, res) => {
    try {
        const userId = req.user?.id || req.body?.userId || req.query?.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = {
            userProfile: {
                name: user.name,
                email: user.email,
                journeyStage: user.journeyStage,
                targetRole: user.targetRole,
                activePhaseNumber: user.activePhaseNumber,
            },
            goal: user.goal,
            readinessSnapshot: user.readinessSnapshot,
            topGaps: user.topGaps,
            roadmap: {
                pastPhases: user.phaseHistory || [],  // All completed phases with outcomes
                currentPhase: user.currentPhase || null,  // Active phase
            },
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Save completed phase outcome to history
const completePhase = async (req, res) => {
    try {
        const userId = req.user?.id || req.body?.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID required" });
        }

        const { milestonesCompleted, checkpointResult } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Save current phase to history with gaps and readiness snapshot
        await user.savePhaseOutcome(
            user.currentPhase,
            user.topGaps,
            user.readinessSnapshot,
            milestonesCompleted,
            checkpointResult
        );

        res.status(200).json({
            success: true,
            message: "Phase completed and saved to history",
            nextPhaseNumber: user.activePhaseNumber,
            phaseHistoryLength: user.phaseHistory.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getCareerPath,
    completePhase,
};