// connect to mysql database
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection({

    host: 'localhost',

    // username
    user: 'root',

    // sql database and password
    password: 'chobits22',
    database: 'employee_db'
    
});

module.exports = db;