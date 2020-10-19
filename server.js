const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Set port; 
  //Port: 3306,
  // Users username
  user: "root",
  // User Password
  password: "**Geometry20",
  database: "employee_trackerdb"
});


connection.connect(function (err) {
  if (err) throw err;
  start();

});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department/role/employee?",
        "View existing departments/role/employees?",
        "Update employee?",
        "DELETE?!?"
      ]
    })

    .then(function (answer) {
      switch (answer.action) {
        case "Add a department/role/employee?":
          addDptRolesEmp();
          break;

        case "View existing departments/roles/employees?":
          viewDptRolesEmp();
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
function addDptRolesEmp() {
  inquirer
    .prompt({
      name: "add_action",
      type: "rawlist",
      message: "What would you like to add?",
      choices: [
        "Add departments?",
        "Add role?",
        "Add employees?",
      ]
    })
    .then(function (answer) {
      switch (answer.add_action) {
        case "Add departments?":
          addDptRolesEmp();
          break;

        case "Add role?":
          addDptRolesEmp();
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
    .then(function (answer) {

      connection.query(
        "INSERT INTO department SET ?", {
          name: answer,
          addDptName,

        },

        function (err) {
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

function addRoles() {
  inquirer
    .prompt(
      [{
          name: "addTitle",
          type: "input",
          message: "What is the title of this new role?"
        },
        {
          name: "addSalary",
          type: "input",
          message: "What is the salary of this new role?"
        },
        {
          name: "addDepartmentId",
          type: "input",
          message: "What is the Department ID for this new role?"
        }
      ]
    )

    .then(function (answer) {

        connection.query(
          "INSERT INTO roles SET ?", {
            title: answer.addTitle,
            salary: answer.addSalary,
            department_id: answer.addDepartmentId || 0
          },

          function (err) {
            if (err) throw err;
            console.log("New Role added successfully!");
              const table = cTable.getTable([{
                title: answer.addTitle,
                salary: answer.addSalary,
                department_id: answer.addDepartmetId || 0
              }])
              console.log(table)
              start();

            })
        })
    };

    function addEmp() {
      inquirer
        .prompt(
          [{
            name: "addFirstName",
            type: "input",
            message: "What is the first name of the new employee?"
          },
          {
            name: "addLastName",
            type: "input",
            message: "What is the first name of the new employee?"
          },
          {
            name: "addRolesId",
            type: "input",
            message: "What is the Role ID of the new employee?"
            },
            {
            name: "addManagerId",
            type: "input",
            message: "What is the Manager ID for the new employee?"
            }]
        )
 
        .then(function(answer) {

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.addFirstName,
            last_name: answer.addLastName,
            roles_id: answer.addRolesId || 0,
            manager_id: answer.addManagerId || 0
        },

        function(err) {
          if (err) throw err;
          console.log("New Employee added succesfully!");
          const table = cTable.getTable([{
            first_name: answer.addFirstName,
            last_name: answer.addLastName,
            roles_id: answer.addRolesId || 0,
            manager_id: answer.addManagerId ||0

          }])
        console.log(table)
        start();
      })
        })
    };

    function viewDptRolesEmp() {
      inquirer
        .prompt({
          name: "view_action",
          type: "rawlist",
          message: "What would you like to view?",
          choices: [
            "View departments?",
            "View roles?",
            "View employees?",
            "View all employees?"
          ]
        })
        .then(function(answer) {
          switch (answer.view_action) {
          case "View departments?":
            viewDpt();
            break;
    
          case "View departments?":
            viewAllDpt();
            break;
    
          case "View roles?":
            viewRoles();
            break;
    
          case "View employees?":
            viewEmp();
            break;
    
          case "View all employees?":
            viewAllEmp();
            break;
      
          }
        });
    };
    
    // 
    function viewDpt() {
      connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        for(let i = 0; i<res.length; i++) {
          const table = cTable.getTable([{
            Department_Name: res[i].name,
          }])
          console.log(table)
        }
      start();
        });
    };
    
    
    // working
    function viewRoles() {
      inquirer
      .prompt({
        name: "view_roles",
        type: "input",
        message: "What role would you like to view?"
      })
      .then(function(answer) {
        console.log(answer.view_roles);
        connection.query('SELECT * FROM roles WHERE ?', {title: answer.view_roles}, function(err, res) {
          if (err) throw err;
          for(let i = 0; i<res.length; i++) {
            const table = cTable.getTable([{
              title: res[i].title,
              salary: res[i].salary,
              department_id: res[i].department_id || 0
            }])
            console.log(table)
          }
            start();
        });
      });
    };
    
    // working
    function viewEmp() {
      inquirer
      .prompt([{
        name: "employee_id",
        type: "input",
        message: "What is the ID number of the employee?"
      },
      ])
      .then(function(answer) {
        connection.query("SELECT * FROM employee WHERE ?", {id: answer.employee_id}, function(err, res) {
          if (err) throw err;
          for(let i = 0; i<res.length; i++) {
          const table = cTable.getTable([{
            first_name: res[i].first_name,
            last_name: res[i].last_name,
            roles_id: res[i].roles_id || 0,
            manager_id: res[i].manager_id || 0
          }])
          console.log(table)
        }
          start();
        });
      });
    };
    
    // working
    function viewAllEmp() {
      connection.query("SELECT * FROM employee;", function(err, res) {
        if (err) throw err;
        for(let i = 0; i<res.length; i++) {
          const table = cTable.getTable([{
            FirstName: res[i].first_name ,
            LastName: res[i].last_name,
            roles_id: res[i].roles_id || 0,
            manager_id: res[i].manager_id || 0
          }])
          console.log(table)
        }
        start();
      });
    };
    // working
    function updateEmp() {
      inquirer
        .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to do?",
          choices: [
            "Update employee name?",
            "Update employee role?",
            "Update employee manager ID?",
          ]
        })
        .then(function(answer) {
          switch (answer.action) {
          case "Update employee name?":
            updateEmpName();
            break;
    
          case "Update employee role?":
            updateEmpRoles();
            break;
    
          case "Update employee manager ID?":
            updateEmpManagerId();
            break;
          }
        });
    
    };
    
    // working
    function updateEmpName() {
      inquirer
        .prompt([{
          name: "findEmpId",
          type: "input",
          message: "What is the ID of the employee you are trying to change?"
        },
        {
          name: "updateFirstName",
          type: "input",
          message: "What is the new first name of the employee?"
        },
        {
          name: "updateLastName",
          type: "input",
          message: "What is the new last name of the employee?"
        },
      ]
      )
      .then(function(answer) {
        connection.query(
        `UPDATE employee SET first_name = "${answer.updateFirstName}", last_name = "${answer.updateLastName}" WHERE id = "${answer.findEmpId}"`,
        function(err) {
          if (err) throw err;
          console.log("Employee updated successfully!");
          start(); 
        })
    })
    };
    
    // working 
    function updateEmpManagerId() {
      inquirer
        .prompt([{
          name: "findEmpId",
          type: "input",
          message: "What is the ID of the employee you are trying to change?"
        },
        {
          name: "updateManagerId",
          type: "input",
          message: "What is the new Manager ID for the employee?"
        }
      ]
      )
      .then(function(answer) {
        connection.query(
        `UPDATE employee SET manager_id = "${answer.updateManagerId}" WHERE id = "${answer.findEmpId}"`,
        function(err) {
          if (err) throw err;
          console.log("Employee updated successfully!");
          start();
        })
    })
    };
    
    // 
    function updateEmpRoles() {
      inquirer
        .prompt([{
          name: "findEmpId",
          type: "input",
          message: "What is the ID of the employee you are trying to change?"
        },
        {
          name: "updateRolesId",
          type: "input",
          message: "What is the new Role ID of the employee?"
        },
      ]
        )
        .then(function(answer) {
    
          connection.query(
          `UPDATE employee SET roles_id = "${answer.updateId}" WHERE id = "${answer.findEmpId}"`,
          function(err) {
            if (err) throw err;
            console.log("Employee updated successfully!");
            start();Roles
          })
      })
    };
    
    //
    function deleteInfo() {
      inquirer
        .prompt({
          name: "delete_action",
          type: "rawlist",
          message: "What would you like to delete?",
          choices: [
            "Delete departments?",
            "Delete roles?",
            "Delete employees?"
          ]
        })
        .then(function(answer) {
          switch (answer.delete_action) {
          case "Delete departments?":
            deleteDpt();
            break;
    
          case "Delete roles?":
            deleteRoles
            ();
            break;
    
          case "Delete employees?":
            deleteEmp();
            break;
          }
        });
    };
    
    
    function deleteDpt() {
      inquirer
        .prompt([{
          name: "findDptName",
          type: "input",
          message: "What is the Name of the Department you are trying to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
        `DELETE FROM department WHERE name = "${answer.findDptName}"`,
        function(err) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          start();
        })
      })
    };
    
    
    function deleteRoles() {
      inquirer
        .prompt([{
          name: "findRolesTitle",
          type: "input",
          message: "What is the Title of the role you are trying to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
        `DELETE FROM roles WHERE title = "${answer.findRolesTitle}"`,
        function(err) {
          if (err) throw err;
          console.log("Role deleted successfully!");
          start();
        })
      })
    };
    
    
    function deleteEmp() {
      inquirer
        .prompt([{
          name: "findEmpId",
          type: "input",
          message: "What is the ID of the employee you are trying to delete?"
        }
      ])
      .then(function(answer) {
        connection.query(
        `DELETE FROM employee WHERE id = "${answer.findEmpId}"`,
        function(err) {
          if (err) throw err;
          console.log("Employee deleted successfully!");
          start();
        })
      })
      };