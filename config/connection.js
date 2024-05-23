const Sequelize = require('sequelize');
require('dotenv').config();

console.log('Database Host:', process.env.DB_HOST);  
console.log('Database Name:', process.env.DB_NAME);  
console.log('Database User:', process.env.DB_USER);  

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;