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
			type: Sequelize.TEXT,
		},
		replies: {
			type: Sequelize.TEXT,
		},
		images: {
			type: Sequelize.TEXT,
		},
	});

	return Post;
};

export default post;
