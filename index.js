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
    const query1 = 'SELECT id, dept_name FROM department;';
  
    connection.query(query1, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return;
      }
      const choice = results.map((row) => ({
        value: row.id,
        name: row.dept_name
      }));
  
      inquirer.prompt([
        {
          name: 'job_title',
          message: 'What is the job title?',
          type: 'input',
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return 'Cannot be blank!. Please try typing again';
            }
          }
        },
        {
          name: 'salary',
          message: 'What is the salary for this job title?',
          type: 'input',
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return 'Cannot be blank!. Please try typing again';
            }
          }
        },
        {
          name: 'selectedChoice',
          message: 'What department does this job title belong to?',
          type: 'list',
          choices: choice
        }
      ]).then((input) => {
        const query = `INSERT INTO roles(title, salary, department_id) VALUES ('${input.job_title}', ${input.salary}, ${input.selectedChoice});`;
  
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Role already exist! Please try again!');
          } else {
          console.log('Role Added!');
          }
          inquirer.prompt([
            {
              name: 'return',
              message: 'Would you like to add another role?',
              type: 'list',
              choices: ['Yes', 'No']
            }
          ]).then((enter) => {
            if (enter.return === 'Yes') {
              departmentChoice();
            } else {
              return promptCategories();
            }
          });
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
                            console.log('Department already exist! Please Try Again!');
                        } else {
                        console.log('Department Added!');
                        }
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

// function for updating employee
function updatingEmployee() {
    const employeesQuery = 'SELECT id, first_name, last_name FROM employees;';
    const rolesQuery = 'SELECT id, title FROM roles;';
  
    connection.query(employeesQuery, (err, employeesResults) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return;
      }
  
      const employeesChoices = employeesResults.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`
      }));
  
      connection.query(rolesQuery, (err, rolesResults) => {
        if (err) {
          console.error('Error fetching roles:', err);
          return;
        }
  
        const rolesChoices = rolesResults.map((role) => ({
          value: role.id,
          name: role.title
        }));
  
        inquirer.prompt([
          {
            name: 'employee_id',
            message: 'Select the employee to update:',
            type: 'list',
            choices: employeesChoices
          },
          {
            name: 'new_role_id',
            message: 'Select the new role:',
            type: 'list',
            choices: rolesChoices
          }
        ]).then((input) => {
          const updateQuery = `UPDATE employees SET role_id = ${input.new_role_id} WHERE id = ${input.employee_id};`;
  
          connection.query(updateQuery, (err, results) => {
            if (err) {
              console.error('Error updating data:', err);
              return;
            }
  
            console.log('Employee role updated!');
            inquirer.prompt([
                {
                    name: 'return',
                    message: 'Would you like to update another employees role?',
                    type: 'list',
                    choices: ['Yes', 'No']
                }]).then((enter)=> {
                    if(enter.return == 'Yes'){
                        updatingEmployee();
                    } else {
                    return promptCategories();
                    }
                })
          });
        }).catch((err) => {
          console.error('Error during employee role update:', err);
          promptCategories(); // Go back to the main menu
        });
      });
    });
  }

// function for updating manager
function updatingManager() {
    const employeesQuery = 'SELECT id, first_name, last_name FROM employees;';
    
  
    connection.query(employeesQuery, (err, employeesResults) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return;
      }
  
      const employeesChoices = employeesResults.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`
      }));
  
        inquirer.prompt([
          {
            name: 'employee_id',
            message: 'Select the employee to update:',
            type: 'list',
            choices: employeesChoices
          },
          {
            name: 'new_role_id',
            message: 'What is the new managers name?',
            type: 'input'
          }
        ]).then((input) => {
          const updateQuery = `UPDATE employees SET manager_name = ('${input.new_role_id}') WHERE id = ${input.employee_id};`;
  
          connection.query(updateQuery, (err, results) => {
            if (err) {
              console.error('Error updating data:', err);
              return;
            }
  
            console.log('Employee Manager updated!');
            inquirer.prompt([
                {
                    name: 'return',
                    message: 'Would you like to update another employees manager?',
                    type: 'list',
                    choices: ['Yes', 'No']
                }]).then((enter)=> {
                    if(enter.return == 'Yes'){
                        updatingManager();
                    } else {
                    return promptCategories();
                    }
                })
          });
        }).catch((err) => {
          console.error('Error during employee manager update:', err);
          promptCategories(); // Go back to the main menu
        });
      });
  }

// function to delete an employee
function deletingEmployee() {
    const employeesQuery = 'SELECT id, first_name, last_name FROM employees;';

    connection.query(employeesQuery, (err, employeesResults) => {
        if (err) {
          console.error('Error fetching employees:', err);
          return;
        }
    const employeesChoices = employeesResults.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`
      }));

      inquirer.prompt([
        {
          name: 'employee_id',
          message: 'Select the employee to delete:',
          type: 'list',
          choices: employeesChoices
        }
      ]).then((input) => {
        const deleteQuery = `DELETE FROM employees WHERE id = ${input.employee_id};`;

        connection.query(deleteQuery, (err, results) => {
          if (err) {
            console.error('Error updating data:', err);
            return;
          }

          console.log('Employee deleted!');
          inquirer.prompt([
              {
                  name: 'return',
                  message: 'Would you like to delete another employee?',
                  type: 'list',
                  choices: ['Yes', 'No']
              }]).then((enter)=> {
                  if(enter.return == 'Yes'){
                      deletingEmployee();
                  } else {
                  return promptCategories();
                  }
              })
        });
        }).catch((err) => {
        console.error('Error during employee delete:', err);
        promptCategories(); // Go back to the main menu
        });
    });
}
// function for adding new employee
function addingEmployee () {
    const query1 = 'SELECT id, title FROM roles;';

    connection.query(query1, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
          }
          const choice = results.map((row) => ({
            value: row.id,
            name: row.title
          }));

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
            const query = `INSERT INTO employees(first_name, last_name, role_id, manager_name) VALUES ('${input.first_name}', '${input.last_name}', '${input.title}', '${input.manager_name}');`;

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

// function for view all employees
function viewAllEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, roles.salary AS salary, department.dept_name AS department, employees.manager_name AS manager 
            FROM employees 
            JOIN roles ON employees.role_id = roles.id
            JOIN department ON roles.department_id = department.id;`;

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

// function for viewing all roles
function viewAllRoles() {
    const query = `SELECT roles.id, roles.title, roles.salary, department.dept_name AS department
            FROM roles
            JOIN department ON roles.department_id = department.id;`;
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

// function to view all departments
function viewAllDepartments() {
    const query = `SELECT department.id, department.dept_name AS department
                    FROM department;`;

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


// function for user to view employees by departments
function viewingByDept() {

    const query1 = 'SELECT id, dept_name FROM department;';
  
    connection.query(query1, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return;
      }
      const choice = results.map((row) => ({
        value: row.id,
        name: row.dept_name
      }));

      inquirer.prompt([
        {
            name: 'view_by_dept',
            message: 'What is the department you like to view?',
            type: 'list',
            choices: choice
        }]).then ((input) => {
            const departmentId = input.view_by_dept;
            const query = `
              SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, roles.salary AS salary, department.dept_name AS department, employees.manager_name AS manager
              FROM employees
              JOIN roles ON employees.role_id = roles.id
              JOIN department ON roles.department_id = department.id
              WHERE department.id = ${departmentId}
              ORDER BY department.dept_name, employees.last_name, employees.first_name;`;

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
        })
    })
}

// Main prompt for choosing categories for what the user wanted to do
const questionPrompt = [
    {
        name: 'employee_tracker',
        message: 'What would you like to do?',
        type: "list",
        choices: () => {
            const choices = ["View all Employees", "Add Employee", "Update Employee Role", "Update Employee's Manager", "Delete An Employee", "View Employee By Department", "View All Roles","Add Role","View All Departments", "Add Department", "Exit"];
            return choices;
        },
    },
];

// function for viewing the table for department, roles, and employees
function promptCategories() {
    
    return inquirer.prompt(questionPrompt).then((input) => {
    
        // if statements with call back function inside
        // Viewing all employees table
        if(input.employee_tracker == "View all Employees"){
            viewAllEmployees();
        } 

        // if statements with call back function inside
        // Adding Employee 
        if(input.employee_tracker == "Add Employee"){
            addingEmployee();
        } 

        // if statements with call back function inside
        // Updating Employee Role
        if(input.employee_tracker == "Update Employee Role"){
            updatingEmployee();
        } 

        // if statements with call back function inside
         // Updating Employee Manager
         if(input.employee_tracker == "Update Employee Manager"){
            updatingManager();
        } 

        // if statements with call back function inside
        // Deleting an employee
        if(input.employee_tracker == "Delete An Employee"){
            deletingEmployee();
        } 

        // if statements with call back function inside
        // View employee by department
        if(input.employee_tracker == "View Employee By Department"){
            viewingByDept();
        } 

        // if statements with call back function inside
        // Viewing all roles
        if(input.employee_tracker == "View All Roles"){
            viewAllRoles();
        } 

        // if statements with call back function inside
        // Adding Roles
        if(input.employee_tracker == "Add Role"){
            departmentChoice(); // Call the function here 
        } 

        // if statements with call back function inside
        // Viewing all departments
        if(input.employee_tracker == "View All Departments"){
            viewAllDepartments();
        } 

        // if statements with call back function inside
        // Adding new Department
        if(input.employee_tracker == "Add Department"){
            addingDepartment();
        }

        // if statements with call back function inside
        // Completely exiting the program!
        if(input.employee_tracker == "Exit"){
            console.log('Thank you for using employee tracker!');
            connection.end();
            process.exit();
        };
        
    });
}

promptCategories();
