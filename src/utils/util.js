import { validationResult } from 'express-validator';

export const validator = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 422, error: errors.array() });
	}
	next();
};
