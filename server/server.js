const express = require('express');
const {Client} = require('pg');
const path = require('path');
const cors = require('cors');

class Calciatore {
    constructor(nome, cognome, img_url, data_nascita, nazionalita, ruolo, squadra, numero_maglia, goal, assist, presenze, cartellini_gialli, cartellini_rossi, trofei, record_goal, record_assist, altezza) {
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
        this.altezza = altezza;
    }
}

const app = express();
const port = 3000; // Changed from 3306 to avoid conflict with MySQL

// Configurazione CORS
app.use(cors());
app.use(express.json());

// Configurazione per servire file statici
app.use(express.static(path.join(__dirname, 'publicHTML')));

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

// Funzione spostata da connection.js
async function get72RandomCalciatori() {
    const connection = await createConnection();
    try {
        const results = await connection.query(
            'SELECT * FROM calciatore ORDER BY RANDOM() LIMIT 72'
        );
        return results.rows;
    } catch (error) {
        console.error('Error fetching calciatori:', error);
        throw error;
    } finally {
        await connection.end();
    }
}


async function ArrayCalciatoriCreation() {
    try {
        const random_calciatori = await get72RandomCalciatori();;
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
                info_calciatore.record_assist,
                info_calciatore.altezza
            )
        );
        return OggettiCalciatori;
    } catch (error) {
        console.error('Error populating draft in the function ArrayCalciatoriCreation', error);
        throw error;
    }
}

// Route per la homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicHTML', 'index.html'));
});

// Route per populate_draft
app.get('/populate-draft', async (req, res) => {
    try {
        const result = await ArrayCalciatoriCreation();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Error populating draft in the endpoint' });
    }
});


// REGISTRAZIONE
app.post('/register', async (req, res) => {
    const connection = await createConnection();
    const { username, password, email } = req.body;
  
    try {
      await connection.query('INSERT INTO player (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
      res.status(201).send('Registrazione avvenuta');
    } catch (err) {
      res.status(500).send('Errore durante la registrazione');
    }
  });
  
  // LOGIN
app.post('/login', async (req, res) => {
    const connection = await createConnection();
    const { username, password} = req.body;
  
    const result = await connection.query('SELECT * FROM player WHERE username = $1 AND password = $2' , [username, password]);
  
    if (result.rows.length > 0) {
        // Estrai l'ID e altri dati necessari
        const user = result.rows[0]; // primo risultato -> username è unico
        // Rispondi con i dati dell'utente (come id, username, punti)
        res.json({
        userId: user.id,
        username: user.username,
        point: user.punti 
        });

    } else {
      res.status(401).send('Username o password errati');
    }
  });


  //GET GIOCATORE LIBERI -> MERCATO
  app.get('/get_giocatori_mercato', async (req, res) => {
        const connection = await createConnection();
      
        try {
          const results = await connection.query("SELECT * FROM calciatore WHERE id_player IS NULL ORDER BY prezzo DESC");
      
          if (results.rows.length > 0) {
            // Invia l'elenco dei giocatori liberi al client
            res.json(results.rows); // invia solo i dati
          } else {
            res.status(404).send('Nessun giocatore libero trovato');
          }
        } catch (error) {
          console.error('Errore durante la query:', error);
          res.status(500).send('Errore interno al server');
        }
      });


  //GET GIOCATORE ID User -> ROSE
  app.get('/get_giocatori_rosa', async (req, res) => {
    const connection = await createConnection();
    const id_player_log = req.query.id; // ← prende dalla query string ?id=...
  
    try {
      const results = await connection.query(
        'SELECT * FROM calciatore WHERE id_player = $1',
        [id_player_log]
      );
  
      if (results.rows.length >= 0) {
        res.json(results.rows);
      } else {
        res.status(404).send('Errore server');
      }
    } catch (error) {
      console.error('Errore durante la query:', error);
      res.status(500).send('Errore interno al server');
    }
  });


  // Avvia il server e mettiti in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`[SOC-C-HESS © Server] successfully started and running on port ${port}`); // Log successful start
});


//update punti player 
app.post('/update_punti', async (req, res) => {
    const connection = await createConnection();
    const { userid, new_punti} = req.body;
  
    try {
      await connection.query('UPDATE player SET punti = $1 WHERE id = $2', [new_punti, userid]);
      res.status(201).send('update punti avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento dei punti');
    }
  });

  //abina un nuovo calciatore al player -> ROSE
app.post('/buy_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { userid, calc_id} = req.body;
  
    try {
      await connection.query('UPDATE calciatore SET id_player = $1 WHERE id= $2', [userid, calc_id]);
      res.status(201).send('acquisto calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante l\'acquisto calciatore');
    }
  });

    //abina un nuovo calciatore al player -> ROSE
app.post('/sale_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { calc_id} = req.body;
    const _null = null;  
    try {
      await connection.query('UPDATE calciatore SET id_player = $1 WHERE id= $2', [_null, calc_id]);
      res.status(201).send('vendita calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante la vendita calciatore');
    }
  });