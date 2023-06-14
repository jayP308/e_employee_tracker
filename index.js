const inquirer = require('inquirer');
const mysql = require('mysql2');
const tableTemp = require('console.table');

// Creating connection with inquirer to database
const connection = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker'
    }
);

// function for adding new role
function departmentChoice() {
    const query1 = 'SELECT * FROM department;';

    connection.query(query1, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
          }
        const choice = results.map((row) => row.dept_name);

        inquirer.prompt([
            {
                name: 'job_title',
                message: 'What is the job title?',
                type: 'input',
                validate: (value) => {
                    if(value){
                        return true;
                    } else {
                        return 'Cannot be blank!. Please Try Typing again';
                    }
                }
            },
            {
                name: 'salary',
                message: 'What is the salary for this job title?',
                type: 'input',
                validate: (value) => {
                    if(value){
                        return true;
                    } else {
                        return 'Cannot be blank!. Please Try Typing again';
                    }
                }
            },
            {
                name: 'selectedChoice',
                message: 'What department that this job title belongs to?',
                type: 'list',
                choices: choice
            }
        ]).then((input)=>{
            const query = `INSERT INTO roles(title, salary, department_name) VALUES ('${input.job_title}', ${input.salary}, '${input.selectedChoice}');`;

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                  }
                console.log('Role Added!');
                inquirer.prompt([
                    {
                        name: 'return',
                        message: 'Would you like to add another role?',
                        type: 'list',
                        choices: ['Yes', 'No']
                    }]).then((enter)=> {
                        if(enter.return == 'Yes'){
                            departmentChoice();
                        } else {
                        return promptCategories();
                        }
                    })
            });
        }).catch((err) => {
            console.error('Error during role insertion:', err);
            promptCategories(); // Go back to the main menu
          });
    });
}

// function for adding new department
function addingDepartment() {

        // Prompting user to add a new department
        
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
                                message: 'Would you like to add another department?',
                                type: 'list',
                                choices: ['Yes', 'No']
                            }]).then((enter)=> {
                                if(enter.return == 'Yes'){
                                    addingDepartment();
                                } else {
                                return promptCategories();
                                }
                            })
                    });
                })
            }

// function for adding new employee
function addingEmployee () {
    const query1 = 'SELECT * FROM roles;';

    connection.query(query1, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
          }
        const choice = results.map((row) => row.title);

        inquirer.prompt([
            {
                name: 'first_name',
                message: 'What is the first name of the employee?',
                type: 'input',
                validate: (value) => {
                    if(value){
                        return true;
                    } else {
                        return 'Cannot be blank!. Please Try Typing again';
                    }
                }
            },
            {
                name: 'last_name',
                message: 'What is the last name of the employee?',
                type: 'input',
                validate: (value) => {
                    if(value){
                        return true;
                    } else {
                        return 'Cannot be blank!. Please Try Typing again';
                    }
                }
            },
            {
                name: 'title',
                message: 'What is the title of the employee?',
                type: 'list',
                choices: choice
            },
            {
                name: 'manager_name',
                message: 'What is the name of the manager does this employee reports to?',
                type: 'input',
                validate: (value) => {
                    if(value){
                        return true;
                    } else {
                        return 'Cannot be blank!. Please Try Typing again';
                    }
                }
            }
        ]).then((input)=>{
            const query = `INSERT INTO employees(first_name, last_name, role_name, manager_name) VALUES ('${input.first_name}', '${input.last_name}', '${input.title}', '${input.manager_name}');`;

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                  }
                console.log('Employee Added!');
                inquirer.prompt([
                    {
                        name: 'return',
                        message: 'Would you like to add another employee?',
                        type: 'list',
                        choices: ['Yes', 'No']
                    }]).then((enter)=> {
                        if(enter.return == 'Yes'){
                            addingEmployee();
                        } else {
                        return promptCategories();
                        }
                    })
            });
        }).catch((err) => {
            console.error('Error during role insertion:', err);
            promptCategories(); // Go back to the main menu
          });
    });
}

// Main prompt for choosing categories for what the user wanted to do
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

// function for viewing the table for department, roles, and employees
function promptCategories() {
    
    return inquirer.prompt(questionPrompt).then((input) => {
        //connection to the database
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

        // Adding Employee 
        if(input.employee_tracker == "Add Employee"){
            addingEmployee();
        } 

        // Updating Employee
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
                inquirer.prompt([
                    {
                        name: 'return',
                        message: 'Press Enter To Go Back to Main Menu'
                    }]).then((enter)=> {
                        return promptCategories();
                    })
            })
        } 

        // Adding Roles
        if(input.employee_tracker == "Add Role"){
            departmentChoice(); // Call the function here 
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

        // Adding new Department
        if(input.employee_tracker == "Add Department"){
            addingDepartment();
        }

        // Completely exiting the program!
        if(input.employee_tracker == "Exit"){
            console.log('Thank you for using our services!');
            connection.end();
        };
        
    });
}

promptCategories();
