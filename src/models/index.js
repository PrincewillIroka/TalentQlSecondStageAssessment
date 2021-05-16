require('dotenv').config();
import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import config from '../config';
import post from './post.model';
import user from './user.model';

let host = config.db.host,
	dbUser = config.db.user,
	password = config.db.pass,
	database = config.db.database,
	environment = config.environment;

const db = {};

export async function initialize() {
	const connection = await mysql.createConnection({ host, user: dbUser, password });

	// Drop db in test environment to avoid duplicates when running tests
	// if (environment.includes('test')) {
	// 	await connection.query(`DROP DATABASE  IF EXISTS ${database}`);
	// }

	await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

	const sequelize = new Sequelize(database, dbUser, password, {
		host: host,
		dialect: 'mysql',
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	});

	const users = user(sequelize, Sequelize);
	const posts = post(sequelize, Sequelize);
	posts.belongsTo(users);

	db.Users = users;
	db.Posts = posts;
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	sequelize
		.sync()
		.then(() => {
			console.log('Database connection has been established successfully.');
		})
		.catch((err) => {
			console.error('Unable to connect to the database:', err);
		});
}

export default db;
