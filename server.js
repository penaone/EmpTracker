const mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",
  // Set port; 
  Port: 3305,
  // Users username
  user: "foob",
  // User Password
  password: "password",
  database: "employee_trackerdb"
});