import db from '../models';
import { verifyToken } from '../utils/helpers/AuthHelper';

export const isValidUser = async (req, res, next) => {
	const token = req.headers.authorization?.split('Bearer ')[1];
	if (!token) {
		return res.status(403).json({ success: false, error: 'No token sent!' });
	} else {
		const Users = db.Users;
		const data = await verifyToken(token);
		if (data) {
			const { id } = data;
			const user = await Users.findOne({ where: { id } });
			if (user) {
				req.params.user = user;
			} else {
				return res.status(421).json({ success: false, error: 'User not found!' });
			}
		} else {
			return res.status(421).json({ success: false, error: 'Invalid user!' });
		}
	}
	next();
};
