import { check } from 'express-validator';

export const publishPostData = [check('content').exists().isString().isLength({ min: 1 }).trim()];

export const deletePostData = [check('postId').exists().isNumeric().trim()];

export const editPostData = [
	check('postId').exists().isNumeric().trim(),
	check('content').exists().isString().isLength({ min: 1 }).trim(),
];

export const likePostData = [
	check('postId').exists().isNumeric().trim(),
	check('status').exists().isIn(['like', 'unlike']),
];

export const replyPostData = [
	check('postId').exists().isNumeric().trim(),
	check('comment').exists().isLength({ min: 1 }).trim(),
];
