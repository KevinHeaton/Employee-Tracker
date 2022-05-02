// Import the Sequalize constructor from the library
const mysql = require('mysql2');
// const until = require('until');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: '3306'
});

connection.connect();


module.exports = connection;