DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(department_id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES roles(role_id),
    manager_id INT NOT NULL
);

INSERT INTO department(id, dept_name)
VALUES (1, "PA Department");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Pharmacy Technician", "45232", 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "JP", "Padilla", 1, 1);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;