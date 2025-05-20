const express = require('express');
const {Client} = require('pg');
const path = require('path');
const cors = require('cors');

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

//@deprecated
// Funzione spostata da connection.js
// async function get72RandomCalciatori() {
//     const connection = await createConnection();
//     try {
//         const results = await connection.query(
//             'SELECT * FROM calciatore ORDER BY RANDOM() LIMIT 72'
//         );
//         return results.rows;
//     } catch (error) {
//         console.error('Error fetching calciatori:', error);
//         throw error;
//     } finally {
//         await connection.end();
//     }
// }

app.get('/get_random_calciatori', async (req, res) => {
    const connection = await createConnection();
    const n = parseInt(req.query.n, 10);

    // Prendi excludeIds dalla query string: ?excludeIds[]=1&excludeIds[]=3
    let excludeIds = req.query.excludeIds || [];
    if (!Array.isArray(excludeIds)) {
        excludeIds = [excludeIds]; // se è singolo valore stringa
    }
    // Trasforma in numeri, filtra eventuali NaN (sicurezza)
    excludeIds = excludeIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

    try {
        let query, params;
        if (excludeIds.length > 0) {
            // costruisci la query con placeholders per excludeIds
            const placeholders = excludeIds.map((_, i) => `$${i + 2}`).join(', ');
            query = `
                SELECT * FROM calciatore
                WHERE id NOT IN (${placeholders})
                ORDER BY RANDOM()
                LIMIT $1
            `;
            params = [n, ...excludeIds];
        } else {
            // nessun id da escludere, query semplice
            query = `
                SELECT * FROM calciatore
                ORDER BY RANDOM()
                LIMIT $1
            `;
            params = [n];
        }

        const results = await connection.query(query, params);
        res.send(results.rows);
    } catch (error) {
        console.error('Error fetching calciatori:', error);
        res.status(500).send('Errore interno al server');
    } finally {
        await connection.end();
    }
});


// Route per la homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicHTML', 'index.html'));
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
      res.status(409).json({ error: "Username o password errati" });
    }
});
  
  // LOGIN
app.post('/login', async (req, res) => {
    const connection = await createConnection();
    const { username, password} = req.body;
  
    const result = await connection.query('SELECT id,username,email,punti,partite,vittorie FROM player WHERE username = $1 AND password = $2' , [username, password]);
  
    if (result.rows.length > 0) {
        // Estrai l'ID e altri dati necessari
        const user = result.rows[0]; // primo risultato -> username è unico
        // Rispondi con i dati dell'utente (come id, username, punti)
        res.json({
        userId: user.id,
        username: user.username,
        email: user.email,
        punti: user.punti,
        partite: user.partite,
        vittorie: user.vittorie
        });

    } else {
      res.status(401).send('Username o password errati');
    }
});


  //GET GIOCATORE LIBERI -> MERCATO
app.get('/get_giocatori_mercato', async (req, res) => {
        const connection = await createConnection();
        const user_id = req.query.id; // ← prende dalla query string ?id=...
        try {
          const results = await connection.query(
          `SELECT c.*
            FROM calciatore c
            WHERE c.id NOT IN (
                SELECT unnest(COALESCE(p.rosa_ids, ARRAY[]::INTEGER[]))
                FROM player p
                WHERE p.id = $1
            );
            `, [user_id]);
      
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
        `SELECT c.*
          FROM player p
          JOIN LATERAL unnest(p.rosa_ids) AS rosa_id ON true
          JOIN calciatore c ON c.id = rosa_id
          WHERE p.id = $1`,
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

//Endpoint che aggiorna il numero di partite a +1 e lo ritorna (per il LS)
app.post('/update_partite', async (req, res) => {
    const connection = await createConnection();
    const {userid} = req.body;
  
    try {
      const result = await connection.query('UPDATE player SET partite = partite + 1 WHERE id = $1 RETURNING partite', [userid]);
      partite_aggiornate = result.rows[0].partite;
      res.status(201).json(partite_aggiornate);
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento delle partite');
    }
});

//Endpoint che aggiorna il numero di partite a +1 e lo ritorna (per il LS)
app.post('/update_vittorie', async (req, res) => {
    const connection = await createConnection();
    const {userid} = req.body;
  
    try {
      const result = await connection.query('UPDATE player SET vittorie = vittorie + 1 WHERE id = $1 RETURNING vittorie', [userid]);
      vittorie_aggiornate = result.rows[0].vittorie;
      res.status(201).json(vittorie_aggiornate);
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento delle vittorie');
    }
});

  //abina un nuovo calciatore al player -> ROSE
app.post('/buy_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { userid, calc_id} = req.body;
  
    try {
      await connection.query('UPDATE player SET rosa_ids = array_append(rosa_ids, $2) WHERE id = $1', [userid, calc_id]);
      res.status(201).send('acquisto calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante l\'acquisto calciatore');
    }
});

    //abina un nuovo calciatore al player -> ROSE
app.post('/sale_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { user_id, calc_id } = req.body;
    try {
      await connection.query('UPDATE player SET rosa_ids = array_remove(rosa_ids, $2) WHERE id = $1', [user_id, calc_id]);
      res.status(201).send('vendita calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante la vendita calciatore');
    }
});