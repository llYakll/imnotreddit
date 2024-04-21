// post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Post.belongsTo(User, { foreignKey: 'UserId', allowNull: true });

module.exports = Post;