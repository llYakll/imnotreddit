
const Sequelize = require('sequelize');
const sequelize = require('../db/db'); 


async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection has been closed.');
  }
}

testDatabaseConnection();