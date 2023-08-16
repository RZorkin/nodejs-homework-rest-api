const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Email or password is wrong" });
		}

		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			return res.status(401).json({ message: "Email or password is wrong" });
		}

		const payload = {
			id: user._id,
			email: user.email,
		};

		const token = jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: "23h",
		});

		await User.findByIdAndUpdate(user._id, { token });

		res.json({
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		});
	} catch (error) {
		// Handle any other unexpected errors
		console.error("An error occurred:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};

module.exports = login;
