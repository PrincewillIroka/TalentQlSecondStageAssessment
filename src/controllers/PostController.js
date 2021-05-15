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

export const handleDeletePost = async (req, res) => {
	try {
		const payload = req.body;
		let { postId, user } = payload;
		const Posts = db.Posts;
		const id = user?.id;
		await Posts.findOne({ where: { id: postId } }).then(async (post) => {
			post = post.get({ plain: true });
			if (post?.userId === id) {
				await Posts.destroy({
					where: {
						id: postId,
					},
				}).then((rowDeleted) => {
					if (rowDeleted === 1) {
						res.json(successMessage('Deleted successfully!'));
					} else {
						res.status(422).json(errorMessage({ message: 'Delete unsuccessfull!' }));
					}
				});
			} else {
				res.status(422).json(errorMessage({ message: 'Unauthorized access!' }));
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};

export const handleEditPost = async (req, res) => {
	try {
		const payload = req.body;
		let { postId, user, content } = payload;
		const Posts = db.Posts;
		const id = user?.id;
		await Posts.findOne({ where: { id: postId }, plain: true }).then(async (post) => {
			if (post?.userId === id) {
				await Posts.update(
					{ content },
					{
						where: {
							id: postId,
							userId: id,
						},
						returning: true,
						plain: true,
					}
				).then(([numberOfAffectedRows, affectedRows]) => {
					if (affectedRows === 1) {
						res.json(successMessage('Post updated successfully!'));
					} else {
						res.status(422).json(errorMessage({ message: 'Post updating unsuccessfull!' }));
					}
				});
			} else {
				res.status(422).json(errorMessage({ message: 'Unauthorized access!' }));
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};
