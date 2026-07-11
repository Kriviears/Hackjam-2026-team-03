const employers = require("../data/employerData");

const getEmployers = (req, res) => {
    res.status(200).json(employers);
};

module.exports = {
    getEmployers
};