const mysql = require("mysql2");

const createDatabase = async () => {
// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Run create database statement
  connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DEFAULT_DATABASE}`,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection

}

module.exports = createDatabase;