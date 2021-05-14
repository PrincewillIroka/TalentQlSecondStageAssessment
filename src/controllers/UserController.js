import { Users } from '../models';
import { successData, serverError } from '../utils/helpers/ResponseHelper';

export const handleUserRegistration = async (req, res) => {
	try {
		const payload = req.body;
		let { email, password, name } = payload;
		console.log(payload);
		await Users.create({}).then((response) => {});
		res.json(successData({}));
	} catch (error) {
		res.status(500).json(serverError());
		console.log(error);
	}
};

export const handleUserLogin = async (req, res) => {
	try {
		res.json(successData({}));
	} catch (error) {
		res.status(500).json(serverError());
		console.log(error);
	}
};
