const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = require('./db/connection');
const express = require('express');

const app = express();

connection.connect(function (err) {
    if (err) throw err;
    menu();
});

// function after connection is established
menu = () => {
    console.log(`
    ================
    EMPLOYEE MANAGER
    ================`)
    promptUser();
};

// prompt user questions
const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        'Update an employee manager',
                        'View employees by department',
                        'Delete a department',
                        'Delete a role',
                        'Delete an employee',
                        'View depeartment budgets',
                        'No action']
        }
    ])

    //follow through with what action is taken
    .then((answers) => {
        const { choices } = answers;

        if (choices === "View all departments") {
            showDepartments();
        }

        if (choices === "View all roles") {
            showRoles();
        }

        if (choices === "View all employees") {
            showEmployees();
        }

        if (choices === "Add a department") {
            addDepartment();
        }

        if (choices === "Add a role") {
            addRole();
        }

        if (choices === "Add an employee") {
            addEmployee();
        }

        if (choices === "Update an employee role") {
            updateEmployee();
        }

        if (choices === "Update an employee manager") {
            updateManager();
        }

        if (choices === "View employees by department") {
            employeeDepartment();
        }

        if (choices === "Delete a department") {
            deleteDepartment();
        }

        if (choices === "Delete a role") {
            deleteRole();
        }

        if (choices === "Delete an employee") {
            deleteEmployee();
        }

        if (choices === "View department budgets") {
            viewBudget();
        }

        if (choices === "No action") {
            connection.end()
        };
    });
};

// show all departments
function showDepartments() {
    var query = 'SELECT * FROM department';
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table('All Departments:', res);
            promptUser();
        });
};

// show all roles
function showRoles() {
    var query = 'SELECT * FROM role';
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table('All Roles:', res);
            promptUser();
        });
};

// show all employees
function showEmployees() {
    var query = 'SELECT * FROM employees';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        promptUser();
    });
};

// add a department
function addDepartment() {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Which department would you like to add?'
        }
    ])

    .then(function (answer) {
        connection.query('INSERT INTO department SET ?', {name: answer.newDepartment});
        var query = 'SELECT * FROM  department';
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log('New department has been added!');
            console.table('All Departments:', res);
            promptUser();
        })
    })
};

// add a new role
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer.prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ])
        
        .then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    promptUser();
                })
        })
    })
};

// add an employee
function addEmployee() {
    
}