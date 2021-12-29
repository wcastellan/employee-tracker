// import express
const express = require('express');
const db = require('./db/connection');

const apiRoutes = require('./routes/apiRoutes');

// PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

// default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

// start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
});
