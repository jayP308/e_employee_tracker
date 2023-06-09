DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    dept_name VARCHAR(255) NOT NULL
);
CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL, 
    role_name VARCHAR(255) NOT NULL,
    manager_name VARCHAR(255) NOT NULL
);
