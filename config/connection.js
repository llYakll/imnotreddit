const Sequelize = require('sequelize');
require('dotenv').config();

console.log('Database Host:', process.env.DB_HOST);  
console.log('Database Name:', process.env.DB_NAME);  
console.log('Database User:', process.env.DB_USER);  

const sequelize = new Sequelize(
  process.env.DATABASE_URL || process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    dialectOptions: process.env.DATABASE_URL ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
);

module.exports = sequelize;
