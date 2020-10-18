const mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");
const { start } = require("repl");
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


connection.connect(function(err) {
  if (err) throw err;
  start();

});

function start() {
  inquirer
  .prompt({
    name: "action",
    type: "initiallist",
    message: "What would ou like to do?",
    choices: [
      "Add a department/role/employee?",
      "View existing departments/roles/employees?",
      "Update employee?",
      "DELETE?!?"
    ]
  })

  .then(function(answer) {
    switch (answer.action) {
    case "Add a department/role/employee?":
      addDptRoleEmp();
      break;

      case "View existing departments/roles/employees?":
        viewDptRoleEmp();
        break;

      case "Update employee?":
        updateEmp();
        break;

      case "DELETE?!?":
        deleteInfo();
        break;

    }
  });
};

