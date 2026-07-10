const getFutureVision = (req, res) => {

    const { goal } = req.body;

    const response = {
        futureRole: goal,
        timeline: "12 Months",
        salaryRange: "$80,000 - $130,000",
        description: `Based on your goal of becoming a ${goal}, this roadmap helps you build the required skills, certifications, projects, and professional experience to achieve your career.`
    };

    res.status(200).json(response);
};

module.exports = {
    getFutureVision
};