DROP DATABASE IF EXISTS employee_trackerDB;
Create database employee_trackerDB;

USE employee_trackerDB;

drop table department;
drop table role;
drop table employee;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
  );

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
  );

  INSERT INTO employee(first_name, last_name, role_id, manager_id)
  VALUES ("John", "Smith", 1, 1);

  INSERT INTO role(title, salary, department_id)
  VALUES ("CFO", "95000", 3);

  INSERT INTO department(name)
  VALUES ("Financial_Services");

  SELECT * FROM department;
  SELECT * FROM role;  
  SELECT * FROM employee;



