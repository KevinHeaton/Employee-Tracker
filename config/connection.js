// Import the Sequalize constructor from the library
const Sequalize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  database: 'employees',
  port: 3306
});

module.exports = sequelize;