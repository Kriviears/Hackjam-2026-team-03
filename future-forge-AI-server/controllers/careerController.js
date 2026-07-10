const careerData = require("../data/careerData");

const getCareerPath = (req, res) => {
  res.status(200).json(careerData);
};

module.exports = {
  getCareerPath
};