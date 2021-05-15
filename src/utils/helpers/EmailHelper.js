import fs from 'fs';
import path from 'path';
import hogan from 'hogan.js';
import nodemailer from 'nodemailer';
import config from '../../config';

const mailTemplates = {
	registrationEmail: fs.readFileSync(path.resolve(__dirname + '../../../static/user-registration-email.html'), 'UTF-8'),
};

const transporter = nodemailer.createTransport({
	host: config.mail.host,
	port: config.mail.port,
	secure: true, // true for 465, false for other ports
	auth: {
		user: config.mail.user,
		pass: config.mail.pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
	ignoreTLS: true, // add this
});

const mailOptions = {
	from: config.mail.user,
};

export function sendMail(email) {
	const compiledTemplate = hogan.compile(mailTemplates.registrationEmail);
	const render = compiledTemplate.render({});
	handleMail(render, 'TalentQL Assessment', email);
}

export function handleMail(render, subject, email) {
	try {
		mailOptions.subject = subject;
		mailOptions.html = render;
		mailOptions.to = email;

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (e) {
		console.log('Email Sending Error:', e);
	}
}
