//
//	邮件发送模块
//
var fc = require('./func'),
	nodemailer = require('nodemailer'),
	transport  = require('nodemailer-smtp-transport');

var config = {
	name: process.env.ANT_MAIL_NAME || 'ANT',
	host: process.env.ANT_MAIL_HOST || 'smtp.qq.com',
	port: process.env.ANT_MAIL_PORT || 465,
	secure: process.env.ANT_MAIL_SECURE || true,
	email: process.env.ANT_MAIL_EMAIL || 'email@user.com',
	password: process.env.ANT_MAIL_PASSWORD || 'email-password'
}

module.exports = {
	_transport: nodemailer.createTransport(transport({
		host: config['host'],
		port: config['port'],
		secure: config['secure'],
		auth: {
			user: config['email'],
			pass: config['password']
		}
	})),
	send: function(opt, fn) {
		var _opt = {
			from: config['name'] + '<' + config['email'] + '>',
			to: opt.to,
			subject: opt.subject,
			html: opt.html
		};
		this._transport.sendMail(_opt, fn);
	}
}