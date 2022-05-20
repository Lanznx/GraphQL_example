require("dotenv").config({ path: "./.env" });
var mysql = require("mysql2/promise");

var pool = mysql.createPool({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

module.exports =  {pool};
