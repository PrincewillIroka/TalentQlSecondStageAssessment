require('dotenv').config();
import Sequelize from 'sequelize';
import config from '../config';
import post from './post.model';
import user from './user.model';

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

const db = {};

const users = user(sequelize, Sequelize);
const posts = post(sequelize, Sequelize);

db.users = users;
db.posts = posts;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
