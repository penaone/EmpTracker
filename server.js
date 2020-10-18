const mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",
  // Set port; 
  Port: 3306,
  // Users username
  user: "root",
  // User Password
  password: "password",
  database: "employee_trackerdb"
});


