import { check } from 'express-validator';

export const userRegistrationData = [
	check('email').normalizeEmail().isEmail().withMessage('Invalid email').trim(),
	check('password')
		.exists({
			checkNull: true,
			checkFalsy: true,
		})
		.isLength({ min: 6 })
		.withMessage('Invalid password')
		.trim(),
	check('name').exists().isString().trim(),
];

export const userLoginData = [check('email').exists().isString().trim(), check('password').exists().isString().trim()];
