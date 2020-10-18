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

// functionality 
function addDptRoleEmp() {
  inquirer
    .prompt({
      name: "add_action",
      type: "initiallist",
      message: "What would you like to add?",
      choices: [
        "Add departments?",
        "Add roles?",
        "Add emplyees?",
      ]
    })
    .then(function(answer) {
      switch (answer.add_action) {
      case "Add departments?":
        addDptRoleEmp();
        break;

      case "Add roles?":
        addDptRoleEmp();
        break;

      }
    });

};

// adding New components to the Tables

function addDpt() {
  inquirer
    .prompt(
      [{
        name: "addDptName",
        type: "input",
        message: "What is the Name of this new department?"        
      }]
    )
    .then(function(answer) {

      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer,addDptName,

        },

        function(err) {
          if (err) throw err;
          console.log("New Role added successfully!");
          const table = cTable.getTable([{
            name: answer.addDptName,
          }])
          console.log(table)
          start();
        })
    })
};