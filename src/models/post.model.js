const post = (sequelize, Sequelize) => {
	const Post = sequelize.define('post', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		content: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		likes: {
			type: Sequelize.STRING,
		},
		replies: {
			type: Sequelize.JSON,
		},
	});

	return Post;
};

export default post;
