// database connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config.js');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// connect to mysql
connection.connect(error => {
  if (error) throw error;
  console.log('Successfull connection to database!');
});
module.exports = connection;
