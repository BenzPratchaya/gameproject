const mysql = require("mysql");

// create database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Benz0641453596",
  database: "gameproject",
});

module.exports = db;
