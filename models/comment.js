const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');
const Post = require('./post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});


Comment.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'PostId', onDelete: 'CASCADE' });

module.exports = Comment;