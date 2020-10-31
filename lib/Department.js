const connection = require('../db/database');
const {newTeam} = require('../app')


class Department {
    constructor(name){
        this.name = name
    }

    showDepartment() {
        const readDepartment = () => {
            const query = connection.query(`
            SELECT * FROM department;
            `, function(err, res) {
              if (err) throw err;
              // show all results from SELECT on department
              console.table(res)  
            });
          };
          
          readDepartment()
          
    };

    updateDepartment() {
    const query = connection.query(
    'INSERT INTO department SET ?',
    {
      name: this.name
    },
    function(err, res) {
      if (err) throw err;
    }
  );
  
}

   
}

module.exports = Department;