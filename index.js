const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'joga_mysql'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.listen(port, () => {
    console.log(`Cat is running on http://localhost:${port}`);
});