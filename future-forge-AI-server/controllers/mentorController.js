const mentors = require("../data/mentorData");

const getMentors = (req, res) => {
    res.status(200).json(mentors);
};

module.exports = {
    getMentors
};