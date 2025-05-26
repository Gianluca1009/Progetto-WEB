const { Client } = require('pg');

// Funzione per creare una connessione al database
async function createConnection() {

    const client = new Client({
        host: 'database',          // usa 'db' se il container PostgreSQL nel docker-compose si chiama 'db'
        user: 'admin',
        password: 'adminpwd',
        database: 'ChessDB',
        port: 5432           // porta standard PostgreSQL
    });
    
    await client.connect();
    return client;
}

module.exports = createConnection;

