import { check } from 'express-validator';

export const publishPostData = [
	check('user_id').exists().isNumeric().trim(),
	check('content').exists().isString().trim(),
];

export const deletePostData = [
	check('user_id').exists().isNumeric().trim(),
	check('post_id').exists().isNumeric().trim(),
];
