import db from '../models';
import { successMessage, successData, errorMessage, errorData } from '../utils/helpers/ResponseHelper';
import { upload } from '../utils/helpers/UploadHelper';

export const handlePublishPost = async (req, res) => {
	const user = req.body.user;
	upload(req, res, async (err) => {
		try {
			let images;
			const files = req.files;
			if (files?.length) {
				images = files.reduce((acc, cur) => {
					acc.push(cur.originalname);
					return acc;
				}, []);
				images = images.toString();
			}

			let content = req.body.content;
			const Posts = db.Posts;
			const id = user?.id;
			await Posts.create({ userId: id, content, ...(images && { images }) }).then((post) => {
				post = post.get({ plain: true });
				res.json(successData(post));
			});
		} catch (error) {
			console.error(error);
			res.status(500).json(errorMessage(error));
		}
	});
};

export const handleFetchPost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const Posts = db.Posts;
		await Posts.findOne({ where: { id: postId }, plain: true }).then((post) => {
			if (post) {
				let replies = post?.replies,
					likes = post?.likes;
				replies = replies ? replies?.split(',') : [];
				likes = likes ? likes?.split(',') : [];

				post.likes = likes;
				post.replies = replies;
				res.json(successData(post));
			} else {
				res.status(422).json(errorMessage({ message: 'Post not found!' }));
			}
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
						res.json(successMessage('Post deleted successfully!'));
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
			if (post) {
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
			} else {
				res.status(422).json(errorMessage({ message: 'Post not found!' }));
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};

export const handleLikePost = async (req, res) => {
	try {
		const payload = req.body;
		let { postId, user, status } = payload;
		const Posts = db.Posts;
		const userId = user?.id;
		const post = await Posts.findOne({ where: { id: postId }, plain: true });
		if (post) {
			let likes = post.likes ? post.likes.split(',') : [];

			if (status === 'like') {
				const isFound = likes.find((likedBy) => likedBy == userId);
				if (!isFound) {
					likes.push(userId);
				}
			} else if (status === 'unlike') {
				likes = likes.filter((likedBy) => likedBy !== userId);
			}
			post.likes = likes.toString();
			post.save();
			res.json(successMessage(`User ${status}d the post!`));
		} else {
			res.status(422).json(errorMessage({ message: 'Post not found!' }));
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};

export const handleReplyPost = async (req, res) => {
	try {
		const payload = req.body;
		let { postId, user, comment } = payload;
		const Posts = db.Posts;
		const userId = user?.id;
		const post = await Posts.findOne({ where: { id: postId }, plain: true });
		if (post) {
			let replies = post.replies ? post.replies.split(',') : [];
			const obj = { userId, comment };
			replies.push(JSON.stringify(obj));
			post.replies = replies.toString();
			post.save();
			res.json(successMessage(`User added a reply!`));
		} else {
			res.status(422).json(errorMessage({ message: 'Post not found!' }));
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(errorMessage(error));
	}
};
