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
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES roles(department_id),
    manager_id INT NOT NULL
);

INSERT INTO department(id, dept_name)
VALUES (1, "PA Department"),
        (2, "Customer Service");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Pharmacy Technician", "45232", 1),
(2, "Customer Service Care", "50857", 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "JP", "Padilla", 1, 1),
(2, "Raymund", "Madayag", 2, 2);

SELECT department.id, department.dept_name, roles.title, employees.first_name, employees.last_name, roles.salary FROM department
INNER JOIN roles ON roles.department_id = department_id
INNER JOIN employees ON employees.role_id = role_id
ORDER BY department.id;