const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: true
});


Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

module.exports = Comment;