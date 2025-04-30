// const express = require('express');
const express = require('express');
const path = require('path');
const { get72RandomCalciatori } = require('./connection.js');

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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Configurazione per servire file statici
app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());

async function populate_draft() {
    try {
        const random_calciatori = await get72RandomCalciatori();
        const OggettiCalciatori = random_calciatori.map(info_calciatore => 
            new Calciatore(
                info_calciatore.nome,
                info_calciatore.cognome,
                info_calciatore.img_url,
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
        console.log(OggettiCalciatori);
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

// Route per populate_draft ???? ma che cazzo fa chiama di nuovo populate draft?
app.get('/populate-draft', async (req, res) => {
    try {
        const result = await populate_draft();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error populating draft' });
    }
});

app.get('/calciatori', async (req, res) => {
    try {
        const calciatori = await get72RandomCalciatori();
        res.json(calciatori);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching calciatori' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
