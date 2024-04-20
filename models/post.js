const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post',
    timestamps: true
});


Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Post;