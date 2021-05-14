import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

const SaltRounds = 8;
const JWT_SECRET = config.jwtSecret;

export function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(SaltRounds));
}

export function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

export function generateToken(data) {
	const user = data;
	const time = '24h';
	return jwt.sign(user, JWT_SECRET, { expiresIn: time });
}

export function verifyToken(data) {
	const { token } = data;
	const decoded = jwt.verify(token, JWT_SECRET);
	return decoded;
}
