const { generateCareerAdvice } = require("../services/aiService");

const getAIRecommendation = async (req, res) => {
    try {
        const recommendation = await generateCareerAdvice(req.body);

        res.status(200).json({
            recommendation
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