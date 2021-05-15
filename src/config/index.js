require('dotenv').config();

import Joi from '@hapi/joi';

const envVarsSchema = Joi.object({
	PORT: Joi.string(),
	APP_HOST: Joi.string(),
	NODE_ENV: Joi.string(),
	JWT_SECRET: Joi.string(),
	DB_CONNECTION: Joi.string(),
	DB_HOST: Joi.string(),
	DB_PORT: Joi.number(),
	DB_DATABASE: Joi.string(),
	DB_USERNAME: Joi.string(),
	DB_PASSWORD: Joi.string(),
	MAIL_HOST: Joi.string(),
	MAIL_PORT: Joi.string(),
	MAIL_USER: Joi.string(),
	MAIL_PASSWORD: Joi.string(),
})
	.unknown(true)
	.required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

export default {
	host: process.env.APP_HOST,
	port: process.env.PORT,
	environment: process.env.NODE_ENV,
	jwtSecret: envVars.JWT_SECRET,
	db: {
		db_connection: envVars.DB_CONNECTION,
		database: envVars.DB_DATABASE,
		pass: envVars.DB_PASSWORD,
		user: envVars.DB_USERNAME,
		port: envVars.DB_PORT,
		host: envVars.DB_HOST,
	},
	mail: {
		host: envVars.MAIL_HOST,
		port: envVars.MAIL_PORT,
		user: envVars.MAIL_USER,
		pass: envVars.MAIL_PASSWORD,
	},
};
