const inquirer = require('inquirer');
const mysql = require('mysql2');
const tableTemp = require('console.table');

const questionPrompt = [
    {
        name: 'employee_tracker',
        message: 'What would you like to do?',
        type: "list",
        choices: ["View all Employees", "Add Employee", "Update Employee Role", "View All Roles","Add Role","View All Departments", "Add Department", "Exit"],
        validate: (value) => {
          if(value){
              return true
          } else {
              return 'Must Choose One!. Please Try Again!'
          }
        }
    },
];

function promptCategories() {
    
    return inquirer.prompt(questionPrompt).then((input) => {
        // Creating connection with inquirer to database
        const connection = mysql.createConnection (
            {
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'employee_tracker'
            }
        );

        // Viewing all employees table
        if(input.employee_tracker == "View all Employees"){

            const query = 'SELECT * FROM employees;';

            connection.query(query, (err, results) => {
                if(err) {
                    console.log('error!')
                }
                const table = tableTemp.getTable(results)
                console.log(table);
                //Lets user know to press enter to go back to the list instead of the list re-prompting right away
                inquirer.prompt([ 
                    {
                        name: 'return',
                        message: 'Press Enter To Go Back to Main Menu'
                    }]).then((enter)=> {
                        return promptCategories();
                    })
            })
        } 

        if(input.employee_tracker == "Add Employee"){
            console.log('Adding Employee!');
            connection.end();
        } 

        if(input.employee_tracker == "Update Employee Role"){
            console.log('Updating Employee Role!');
        } 

        // Viewing all roles
        if(input.employee_tracker == "View All Roles"){
            const query = 'SELECT * FROM roles;';

            connection.query(query, (err, results) => {
                if(err) {
                    console.log('error!')
                }
                const table = tableTemp.getTable(results)
                console.log(table);
                connection.end();
            })
        } 

        if(input.employee_tracker == "Add Role"){
            console.log('Adding Role!');
        } 

        // Viewing all departments
        if(input.employee_tracker == "View All Departments"){
            const query = 'SELECT * FROM department;';

            connection.query(query, (err, results) => {
                if(err) {
                    console.log('error!')
                }
                const table = tableTemp.getTable(results)
                console.log(table);
                //Lets user know to press enter to go back to the list instead of the list re-prompting right away
                inquirer.prompt([
                    {
                        name: 'return',
                        message: 'Press Enter To Go Back to Main Menu'
                    }]).then((enter)=> {
                        return promptCategories();
                    })
            })
        } 

        // Prompting user to add a new department
        if(input.employee_tracker == "Add Department"){
            inquirer.prompt ([
                {
                    name: 'adding_department',
                    message: 'What is the name of the department you like to add?',
                    type: 'input',
                    validate: (value) => {
                        if(value){
                            return true
                        } else {
                            return 'Cannot be blank!. Please Try Typing again'
                        }
                    }
                }]).then((input) => {
                    const query = `INSERT INTO department(dept_name) VALUES ('${input.adding_department}');`;

                    connection.query(query, (err, results) => {
                        if (err) {
                            console.log('error!');
                        }
                        console.log('Department Added!');
                        inquirer.prompt([
                            {
                                name: 'return',
                                message: 'Press Enter To Go Back to Main Menu'
                            }]).then((enter)=> {
                                return promptCategories();
                            })
                    });
                })
        } 

        // Completely exiting the program!
        if(input.employee_tracker == "Exit"){
            console.log('Thank you for using our services!');
            connection.end();
        };
        
    });
}

promptCategories();

