const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blogDB', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;