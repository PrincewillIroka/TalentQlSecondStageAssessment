import db from '../models';
import { successData, successMessage, errorMessage, errorData } from '../utils/helpers/ResponseHelper';
import { hashPassword, comparePassword, generateToken } from '../utils/helpers/AuthHelper';

export const handleUserRegistration = async (req, res) => {
	try {
		const payload = req.body;
		let { email, password, name } = payload;
		password = hashPassword(password);
		const Users = db.Users;
		await Users.create({ email, password, name }).then((response) => {
			res.json(successMessage('Account created successfully!'));
		});
	} catch (error) {
		console.error(error);
		const errors = error['errors'];
		res.status(500).json(errorMessage(errors[0]));
	}
};

export const handleUserLogin = async (req, res) => {
	try {
		const payload = req.body;
		let { email, password } = payload;
		const Users = db.Users;
		await Users.findOne({ where: { email } }).then((user) => {
			user = user.get({ plain: true });
			const hash = user.password;
			const isValidPassword = comparePassword(password, hash);
			if (isValidPassword) {
				const { id, email } = user;
				user.token = generateToken({ id, email });
				delete user.password;
				res.json(successData({ user }));
			} else {
				throw new Error('Invalid login credentials!');
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};
