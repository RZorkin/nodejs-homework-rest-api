const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_EMAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
	host: "smtp.meta.ua",
	port: 465,
	secure: true,
	auth: {
		user: META_EMAIL,
		pass: META_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
	const mail = { ...data, from: META_EMAIL };
	await transport.sendMail(mail);
	return true;
};

module.exports = sendEmail;

// Тест надсилання листа
// const config = {
// 	host: "smtp.meta.ua",
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		user: META_EMAIL,
// 		pass: META_PASSWORD,
// 	},
// 	tls: {
// 		rejectUnauthorized: false,
// 	},
// };

// const transporter = nodemailer.createTransport(config);
// const emailOptions = {
// 	from: META_EMAIL,
// 	to: "ruslan.zorkin@meta.ua",
// 	subject: "Nodemailer test",
// 	text: "Привіт. Ми тестуємо надсилання листів!",
// };

// transporter
// 	.sendMail(emailOptions)
// 	.then(info => console.log(info))
// 	.catch(err => console.log(err));
