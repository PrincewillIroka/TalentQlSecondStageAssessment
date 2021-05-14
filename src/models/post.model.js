const post = (sequelize, Sequelize) => {
	const Post = sequelize.define('post', {
		id: {
			type: Sequelize.NUMBER,
			autoIncrement: true,
			primaryKey: true,
		},
		content: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		likes: {
			type: Sequelize.JSON,
		},
		replies: {
			type: Sequelize.JSON,
		},
	});

	return Post;
};

export default post;
