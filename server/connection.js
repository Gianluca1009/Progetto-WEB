const mysql = require('mysql2');

function DatabaseConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'userpwd',
        database: 'ChessDB'
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL database');
    });

    return connection;
}

const connection = DatabaseConnection();

function get72RandomCalciatori() {
    const query = 'SELECT * FROM Calciatore ORDER BY RAND() LIMIT 72;';
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        connection.end();
    });
    return results;
}

module.exports = { get72RandomCalciatori };
