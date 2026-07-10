const generateCareerAdvice = (userProfile) => {
    return {
        recommendation: `Based on your goal of becoming a ${userProfile.goal}, focus on building projects, earning certifications, and networking with mentors.`,
        nextStep: "Complete one project and one certification in your chosen field."
    };
};

module.exports = {
    generateCareerAdvice
};