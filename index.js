// application packages
const express = require('express');
const app = express();

const path = require('path');
// add template engile
const hbs = require('express-handlebars');
// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));
// setup static public directory
app.use(express.static('public'));


const mysql = require('mysql2');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const port = 3003;

// create database connection
var con = mysql.createConnection({
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