const connection = require("../db/database");
// const { printTable } = require('console-table-printer')
// const table = require('easy-table')

class Role {
    constructor(title, salary, id){
        this.salary = salary,
        this.title = title,
        this.departmentId = id
    }

    showRoleInfo(){
        const readRole = () => {
           let read = connection.query(`
          SELECT role.id, role.title, role.salary, department.name AS department
          FROM role
          LEFT JOIN department ON role.department_id = department.id; 
        `, function(err, res){
            console.log('\n')
            console.table(res)
        })
       
            
        };
          readRole()
    }

    createRoleInfo() {
        
        const creatRole = () =>{
        let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
        let args = [this.title, this.salary, this.departmentId];
        const rows = connection.query(query, args, function(err, res) {
            if (err) throw err;
            console.table(res)
        });
        console.log(`Added role ${this.title}`);
        }
        creatRole()
    }
}

module.exports = Role;