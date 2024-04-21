// Import Sequelize and your database configuration
const Sequelize = require('sequelize');
const sequelize = require('../db/db'); // Adjust the path as needed

// Define a test function to check the database connection
async function testDatabaseConnection() {
  try {
    // Test the connection by authenticating Sequelize
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection has been closed.');
  }
}

// Call the test function to check the database connection
testDatabaseConnection();