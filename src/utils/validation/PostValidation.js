import { check } from 'express-validator';

export const publishPostData = [
	check('content').exists().isString().trim(),
];

export const deletePostData = [
	check('postId').exists().isNumeric().trim(),
];
