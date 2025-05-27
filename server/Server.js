const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000; // Porta utilizzata per il server

// Configurazione CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurazione per ottenere i file statici del progetto
app.use(express.static(path.join(__dirname, 'publicHTML')));

const RoutesCalciatori = require('./routes/RoutesCalciatori'); // Importa le rotte dei calciatori
const RoutesAggiornamentiPlayer = require('./routes/RoutesAggiornamentiPlayer'); // Importa le rotte degli aggiornamenti dei giocatori
const RoutesLoginRegister = require('./routes/RoutesLoginRegister'); // Importa le rotte di login e registrazione

app.use(RoutesCalciatori); // Attacca al middleware le rotte dei calciatori
app.use(RoutesAggiornamentiPlayer); // Attacca al middleware per gli aggiornamenti dei giocatori
app.use(RoutesLoginRegister); // Attacca al middleware per il login e la registrazione

// Endpoint per ottenere la pagina principale di accesso con i relativi file statici
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicHTML', 'index.html'));
});

// Endpoint che avvia il server e mettiti in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`[SOC-C-HESS © Server] successfully started and running on port ${port}`); // Log successful start
});