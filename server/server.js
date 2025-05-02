
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');

class Calciatore {
    constructor(nome, cognome, img_url, data_nascita, nazionalita, ruolo, squadra, numero_maglia, goal, assist, presenze, cartellini_gialli, cartellini_rossi, trofei, record_goal, record_assist) {
        this.nome = nome;
        this.cognome = cognome;
        this.img_url = img_url;
        this.data_nascita = data_nascita;
        this.nazionalita = nazionalita;
        this.ruolo = ruolo;
        this.squadra = squadra;
        this.numero_maglia = numero_maglia;
        this.goal = goal;
        this.assist = assist;
        this.presenze = presenze;
        this.cartellini_gialli = cartellini_gialli;
        this.cartellini_rossi = cartellini_rossi;
        this.trofei = trofei;
        this.record_goal = record_goal;
        this.record_assist = record_assist;
    }
}

const app = express();
const port = 3000; // Changed from 3306 to avoid conflict with MySQL

// Configurazione CORS
app.use(cors());
app.use(express.json());

// Configurazione per servire file statici
app.use(express.static(path.join(__dirname, '..')));

// Funzione per creare una connessione al database
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

// Funzione spostata da connection.js
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


async function ArrayCalciatoriCreation() {
    try {
        const random_calciatori = await get72RandomCalciatori();
        const OggettiCalciatori = random_calciatori.map(info_calciatore => 
            new Calciatore(
                info_calciatore.nome,
                info_calciatore.cognome,
                info_calciatore.url_foto,
                info_calciatore.data_nascita,
                info_calciatore.nazionalita,
                info_calciatore.ruolo,
                info_calciatore.squadra,
                info_calciatore.numero_maglia,
                info_calciatore.goal,
                info_calciatore.assist,
                info_calciatore.presenze,
                info_calciatore.cartellini_gialli,
                info_calciatore.cartellini_rossi,
                info_calciatore.trofei,
                info_calciatore.record_goal,
                info_calciatore.record_assist
            )
        );
        return OggettiCalciatori;
    } catch (error) {
        console.error('Error populating draft:', error);
        throw error;
    }
}

// Route per la homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Route per populate_draft
app.get('/populate-draft', async (req, res) => {
    console.log(`[${new Date().toISOString()}] Received request for /populate-draft`); // Log request received
    try {
        const result = await ArrayCalciatoriCreation();
        console.log(`[${new Date().toISOString()}] Successfully fetched data for /populate-draft`);
        res.json(result);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in /populate-draft route:`, error); // Log error in route
        res.status(500).json({ error: 'Error populating draft' });
    }
});


// Avvia il server e mettiti in ascolto sulla porta specificata
console.log(`[${new Date().toISOString()}] Attempting to start server on port ${port}...`); // Log before listen
app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] Server successfully started and running on port ${port}`); // Log successful start
});
