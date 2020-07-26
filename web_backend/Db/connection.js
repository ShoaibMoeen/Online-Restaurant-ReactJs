const express = require("express");
const mysql = require("mysql");
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "123456",
  database: "web",
});

connection.connect();

module.exports = connection;
