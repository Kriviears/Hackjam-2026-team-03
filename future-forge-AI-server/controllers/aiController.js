const { generateCareerAdvice } = require("../services/aiService");

const getAIRecommendation = (req, res) => {
    const result = generateCareerAdvice(req.body);
    res.status(200).json(result);
};

module.exports = {
    getAIRecommendation
};