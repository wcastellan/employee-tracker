const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password:'chobits22',
    database:'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
})

module.exports = connection;