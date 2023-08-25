const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ message: "Email or password is wrong" });
	}

	if (!user.verify) {
		return res.status(409).json({ message: "Verify your mail first, please" });
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		return res.status(401).json({ message: "Email or password is wrong" });
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, {
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
};

module.exports = login;
