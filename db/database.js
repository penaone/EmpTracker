const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '**Geometry20',
    database: 'employee_trackerdb'
  });

  module.exports = connection