const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

conn.connect((err) => {
    if (err) {
        console.error('Connection failed!!: ', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = conn;