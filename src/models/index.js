import Sequelize from 'sequelize';
import database from '../database';
import post from './post.model';
import user from './user.model';

const sequelize = database.sequelize;

const db = {
	users: user(sequelize, Sequelize),
	posts: post(sequelize, Sequelize),
	sequelize: sequelize,
	Sequelize: Sequelize,
};

export default db;
