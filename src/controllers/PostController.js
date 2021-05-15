import db from '../models';
import { successMessage, successData, errorMessage, errorData } from '../utils/helpers/ResponseHelper';

export const handlePublishPost = async (req, res) => {
	try {
		const payload = req.body;
		let { content, user } = payload;
		const Posts = db.Posts;
		const id = user?.id;
		await Posts.create({ userId: id, content }).then((response) => {
			res.json(successMessage('Post created successfully!'));
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};

export const handleDeletePost = async (req, res) => {
	try {
		res.json(successData({}));
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage());
	}
};

export const handleGetPost = async (req, res) => {
	try {
		const { postId } = req.params;
		const Posts = db.Posts;
		await Posts.findOne({ id: postId }).then((response) => {
			res.json(successData(response));
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};
