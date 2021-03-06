const user = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: 'Email address already exists!',
			},
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return User;
};

export default user;
