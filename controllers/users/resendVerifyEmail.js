const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}
	const verifyEmail = {
		to: email,
		subject: "Verify Email",
		html: `<a target="_blanc" href="http://localhost:3000/users/verify/${user.verificationToken}">Click to verify</a>`,
	};
	await sendEmail(verifyEmail);
	res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
