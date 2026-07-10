const careerData = require("../data/careerData");


// Existing GET endpoint
const getCareerPath = (req, res) => {
    res.status(200).json(careerData);
};


// New POST endpoint
const createCareerPath = (req, res) => {

    const user = req.body;

    const response = {
        userProfile: user,

        roadmap: [
            "Learn required technical skills",
            "Build real projects",
            "Earn relevant certifications",
            "Prepare for interviews"
        ],

        certifications: [
            "Cloud Certification",
            "Industry Certification"
        ],

        timeline: "6-12 months",

        mentors: [
            "Technology Mentor",
            "Industry Professional"
        ],

        employers: [
            "CGI",
            "AWS",
            "Microsoft"
        ]
    };


    res.status(200).json(response);
};


module.exports = {
    getCareerPath,
    createCareerPath
};