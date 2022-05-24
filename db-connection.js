var mysql = require('mysql');

// Create connection to singafood database
var connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'singafood',
    multipleStatements: true // allow usage of multiple statements in SQL (UPDATE FROM ...; DELETE FROM...;)
});

module.exports = connection;