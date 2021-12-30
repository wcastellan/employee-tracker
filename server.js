// import express
const express = require('express');
const db = require('./db/connection');
// add near top of file 
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');

// PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// add after express middleware
app.use('/api', apiRoutes);

// default response for amny other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    afterConnection();
});

// function after connection is established
afterConnection = () => {
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
