const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({
			message: "Email not found",
		});
	}

	if (user.verify) {
		return res.status(400).json({
			message: "Verification has already been passed",
		});
	}

	const verifyEmail = {
		to: req.body.email,
		subject: "Verify email",
		html: `<a href=http://localhost:3000/users/verify/${user.verificationToken}>Click verify email</a>`,
	};
	await sendEmail(verifyEmail);

	return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
