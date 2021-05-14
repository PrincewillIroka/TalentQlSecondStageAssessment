require('dotenv').config();
import Sequelize from 'sequelize';
import config from '../config';

export default {
	connect() {
		try {
			const sequelize = new Sequelize(config.db.database, config.db.user, config.db.pass, {
				host: config.db.host,
				dialect: 'mysql',
				logging: false,
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
			});
			sequelize
				.authenticate()
				.then(() => {
					console.log('Connection has been established successfully.');
				})
				.catch((err) => {
					console.error('Unable to connect to the database:', err);
				});
		} catch (e) {
			console.log('Database connection error:', e);
		}
	},
	disconnect() {
		try {
			mongoose.disconnect();
		} catch (e) {
			console.log('Database disconnection error:', e);
		}
	},
};
