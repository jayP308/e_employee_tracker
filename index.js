const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const app = express();

inquirer.prompt([
    {
        name: 'employee_tracker',
        message: 'What would you like to do?',
        type: "list",
        choices: ["View all Employees", "Add Employee", "Update Employee Role", "View All Roles","Add Role","View All Departments", "Add Department"],
        validate: (value) => {
          if(value){
              return true
          } else {
              return 'Must Choose One!. Please Try Again!'
          }
        }
    },
]).then((input) => {
    const connection = mysql.createConnection (
        {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'employee_tracker'
        },
        console.log('connected to database')
    );
    if(input.employee_tracker == "View all Employees"){

        const query = 'SELECT * FROM employees;';

        connection.query(query, (err, results) => {
            if(err) {
                console.log('error!')
            }
            console.log(results);
            connection.end();
        })
        
    } 

    if(input.employee_tracker == "Add Employee"){
        console.log('Adding Employee!');
    } 

    if(input.employee_tracker == "Update Employee Role"){
        console.log('Updating Employee Role!');
    } 

    if(input.employee_tracker == "View All Roles"){
        console.log('Viewing All Roles!');
    } 

    if(input.employee_tracker == "Add Role"){
        console.log('Adding Role!');
    } 

    if(input.employee_tracker == "View All Departments"){
        console.log('Viewing All Departments!');
    } 

    if(input.employee_tracker == "Add Department"){
        console.log('Adding A Departments!');
    } 
    
});