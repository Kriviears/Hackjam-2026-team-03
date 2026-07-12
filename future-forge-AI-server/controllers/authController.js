const User = require("../models/User");

const authenticateUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email }).select("-password");
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const correctPassword = await user.isCorrectPassword(req.body.password);
        console.log(correctPassword);
        if (!correctPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
            profile: user.profile,
            careerPreferences: user.careerPreferences,
        };

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        console.error(error);
    }
}


module.exports = { authenticateUser };