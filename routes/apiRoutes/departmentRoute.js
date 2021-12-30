const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// function to show all departments
router.get('/department', (req, res) => {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
})


module.exports = router;