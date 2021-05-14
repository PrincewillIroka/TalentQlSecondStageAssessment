import { check } from 'express-validator';

export const userRegistrationData = [
	check('email').exists().isString().trim(),
	check('password').exists().isString().trim(),
	check('name').exists().isString().trim(),
];

export const userLoginData = [check('email').exists().isString().trim(), check('password').exists().isString().trim()];
