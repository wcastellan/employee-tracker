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

showDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};