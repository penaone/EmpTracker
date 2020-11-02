const connection = require('./db/database');
const inquirer = require('inquirer');
const Department = require('./lib/Department')
const Employee = require('./lib/Employee')
const Role = require('./lib/Role')

 connection.connect(err => {
    if (err) throw err;
    console.log('Welcome to the Database!')
    newTeam()
  });

const newTeam = function () {
  const employeeCreation = () => {

    console.log(`
      ***========*=========***
          EMPLOYEE TRACKER
      ***========*=========***
      `);
    return inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "What would you like to do?",
        choices: ["View ALL Employees", "View ALL Departments", "View ALL Roles", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit",]
      },
    ])
      .then(({ type }) => {
        if (type === "View ALL Departments") {
          const department = new Department()
          department.showDepartment()
          newTeam()
        } else if (type === "View ALL Employees") {
          const employee = new Employee()
          employee.showEmployeeInfo()
          newTeam()
        } else if (type === "View ALL Roles") {
          const role = new Role();
          role.showRoleInfo()
          newTeam()
        } else if (type === "Add a Department") {
          addDepartment();
          
        } else if (type === "Add a Role") {
          addRole();
        } else if (type === "Add an Employee") {
          addEmployee();

        } else if (type === "Update an Employee Role") {
          updateEmployeeRole();
        }else if (type === "Quit") {
          console.log("Bye")
          process.exit();
        }
      })
  }
  const addDepartment = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your name");
            return false;
          }
        },
      },
    ])
      .then(({ name }) => {
        const department = new Department(name)
        department.updateDepartment()
         console.log(`You just added ${name} as a department`)
        newTeam()
       
      })
  }

  const addEmployee = () => {
    connection.promise().query(
      `SELECT 
    e.id AS id,
    CONCAT(e.last_name, ' ', e.first_name) AS employee,
    CONCAT(m.last_name, ' ', m.first_name) AS Manager,
    m.id AS manager_id,
    role.id AS role_id,
    role.title AS title,
    role.salary AS salary,
    department.name AS department
  FROM
    employee e
  INNER JOIN employee m ON 
    m.id = e.manager_id
LEFT JOIN role on e.role_id = role.id
INNER JOIN department ON role.department_id = department.id
; `)
      .then(([rows]) => {

        var roles = rows.map(({ title, role_id }) => ({
          name: title,
          value: role_id
        }));

        const filteredRole = [...new Map(roles.map(item => [item.value, item])).values()]

        var employee = rows.map(({ Manager, manager_id }) => ({
          name: Manager,
          value: manager_id
        }));

        const filteredEmployee = [...new Map(employee.map(item => [item.value, item])).values()]

        return inquirer.prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter first name: ",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter your first name: ");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter your last name: ",
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                console.log("Please enter your last name: ");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "role",
            message: "Select prefered title: ",
            choices: filteredRole
          },
          {
            type: "list",
            name: "manager",
            message: "Select prefered manager: ",
            choices: filteredEmployee
          },
        ])
          .then(({ firstName, lastName, role, manager }) => {

            const employee = new Employee(firstName, lastName, role, manager)
            employee.createNewEmployee()
            newTeam()

          })
      })
  }

  const addRole = () => {

    connection.promise().query(`SELECT department.name, department.id FROM department`)
      .then(([rows]) => {
        var departments = rows.map(({ name, id }) => ({
          name: name,
          value: id
        }));
        return inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "What is your title?",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter your name");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Enter your salary: ",
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                console.log("Please enter your employee id");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department",
            message: "pick a department: ",
            choices: departments

          },

        ])
          .then(({ title, salary, department }) => {
            const role = new Role(title, salary, department)
            role.createRoleInfo()
            newTeam()

          })
      })
  }






  async function updateEmployeeRole() {

    connection.promise().query(
      `SELECT concat(first_name, ' ' ,last_name) as employee, 
    employee.id AS id,
    role.title AS title,
    role.id AS role_id
     FROM employee
    RIGHT JOIN role on employee.role_id = role.id
    ;
 `)
      .then(([rows]) => {
        var roles = rows.map(({ title, role_id }) => ({
          name: title,
          value: role_id
        }));

        const filteredRole = [...new Map(roles.map(item => [item.value, item])).values()]

        var employee = rows.map(({ employee, id }) => ({
          name: employee,
          value: id
        }));
        const filteredEmployee = [...new Map(employee.map(item => [item.value, item])).values()]

        return inquirer.prompt([
          {
            type: "list",
            name: "name",
            message: "Which employee do you want to update? ",
            choices: filteredEmployee
          },
          {
            type: "list",
            name: "role",
            message: "Which role do you want to update them to?",
            choices: filteredRole
          },
        ])
          .then(({ firstName, lastName, name, manager, role }) => {
            const employee = new Employee(firstName, lastName, role, manager, name)
            employee.updateRole()
            newTeam()
          })

      })
  }
  employeeCreation()
}

module.exports = {newTeam}