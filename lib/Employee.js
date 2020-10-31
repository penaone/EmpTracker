const connection = require('../db/database');



class employee {
  constructor(firstName, lastName, role, manager, employee) {
    this.first = firstName,
      this.last = lastName,
      this.role = role,
      this.manager = manager
    this.employee = employee
  }

  showEmployeeInfo() {
    const readEmployee = () => {
      console.log('Here it is!!\n');
      connection.query(`
            SELECT 
              e.id AS id,
              CONCAT(e.first_name, ' ', e.last_name) AS Employee,
              CONCAT(m.first_name, ' ', m.last_name) AS Manager,
              role.title AS title,
              role.salary AS salary,
              department.name AS department
            FROM
              employee e
            INNER JOIN employee m ON 
              m.id = e.manager_id
          LEFT JOIN role on e.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          ; `, function (err, res) {
        if (err) throw err;
        // log all results of the SELECT statement
        console.table(res);
      });
    };
    readEmployee()
  }



  updateRole() {
    console.log('employee', this.employee)
    console.log('role', this.role)
    var query = `
            UPDATE employee 
            SET role_id = ?
            WHERE id = ?`
    var arg = [this.role, this.employee]
    connection.query(query, arg, function (err, res) {
      if (err) throw err;

      console.log(`${this.first} ${this.last} has been added`)
    })

  }



  createNewEmployee() {
    var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE(?,?,?,?)`;
    var arg = [this.first, this.last, this.role, this.manager]
    console.log('argss', arg)
    connection.query(query, arg, function (err, res) {
      if (err) throw err;

      console.log(`${this.first} ${this.last} has been added`)
    })
  }
}

module.exports = employee;