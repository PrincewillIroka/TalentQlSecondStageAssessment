import { check } from 'express-validator';

export const publishPostData = [
	check('content').exists().isString().trim(),
];

export const deletePostData = [
	check('token').exists().isString().trim(),
	check('postId').exists().isNumeric().trim(),
];
