const mysql = require('mysql2/promise');

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'userpwd',
        database: 'ChessDB'
    });
    
    console.log('Connected to MySQL database');
    return connection;
}

async function get72RandomCalciatori() {
    const connection = await createConnection();
    try {
        const [results] = await connection.execute(
            'SELECT * FROM Calciatore ORDER BY RAND() LIMIT 72'
        );
        return results;
    } catch (error) {
        console.error('Error fetching calciatori:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

module.exports = { get72RandomCalciatori };

