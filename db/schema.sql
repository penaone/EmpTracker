DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;
USE employee_trackerdb;

CREATE TABLE employee(
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL REFERENCES role(id),
    manager_id INTEGER UNSIGNED REFERENCES employee(id),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(6) UNSIGNED,
    department_id INTEGER UNSIGNED NOT NULL REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);