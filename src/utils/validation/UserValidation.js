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
	check('name').exists().isString().isLength({ min: 1 }).trim(),
];

export const userLoginData = [
	check('email').normalizeEmail().isEmail().withMessage('Invalid email').trim(),
	check('password')
		.exists({
			checkNull: true,
			checkFalsy: true,
		})
		.isLength({ min: 6 })
		.withMessage('Invalid password')
		.trim(),
];

export const resetPasswordData = [
	check('password').exists().isLength({ min: 1 }).trim(),
];
