// application packages
const express = require('express');
const app = express();

const path = require('path');
// add template engine
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

// 1. PEALEHT
app.get('/', (req, res) => {
    let query = 'SELECT * FROM article'; // Asendatud 'articles' -> 'article'
    con.query(query, (err, result) => {
        if (err) throw err;
        res.render('index', { 
            articles: result 
        });
    });
});

// 2. ÜKSIKARTIKKEL
app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.*, author.name AS author_name, author.id AS author_id 
                 FROM article 
                 LEFT JOIN author ON article.author_id = author.id 
                 WHERE article.slug = '${req.params.slug}'`;

    con.query(query, (err, result) => {
        if (err) throw err;
        res.render('article', { 
            article: result 
        });
    });
});

// 3. AUTORI LEHT
app.get('/author/:id', (req, res) => {
    let authorQuery = `SELECT * FROM author WHERE id = '${req.params.id}'`;
    let articlesQuery = `SELECT * FROM article WHERE author_id = '${req.params.id}'`;

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            res.render('author', {
                author: authorResult[0],
                articles: articlesResult
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});