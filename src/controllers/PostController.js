import db from '../models';
import { successMessage, successData, errorMessage, errorData, serverError } from '../utils/helpers/ResponseHelper';

export const handlePublishPost = async (req, res) => {
	try {
		res.json(successData({}));
	} catch (error) {
		res.status(500).json(serverError());
		console.log(error);
	}
};

export const handleDeletePost = async (req, res) => {
	try {
		res.json(successData({}));
	} catch (error) {
		res.status(500).json(serverError());
		console.log(error);
	}
};
