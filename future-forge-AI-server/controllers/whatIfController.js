const whatIfData = require("../data/whatIfData");

const getWhatIf = (req, res) => {
    const { certification } = req.body;

    res.status(200).json({
        certification,
        ...whatIfData
    });
};

module.exports = {
    getWhatIf
};