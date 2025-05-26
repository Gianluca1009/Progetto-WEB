const express = require('express');
const router_calciatori = express.Router();
const createConnection = require('../database/Connection');

// Endpoint per ottenere n calciatori random da usare nel draft
router_calciatori.get('/get_random_calciatori', async (req, res) => {
    const connection = await createConnection();
    const user_id = req.query.id;
    const n = parseInt(req.query.n, 10);

    try {
        const results = await connection.query(
        `SELECT c.*
        FROM calciatore c
        WHERE c.id NOT IN (
            SELECT unnest(COALESCE(p.rosa_ids, ARRAY[]::INTEGER[]))
            FROM player p
            WHERE p.id = $1
        )
        LIMIT $2;
        `, [user_id, n]
        );
        res.send(results.rows);
    } catch (error) {
        console.error('Error fetching calciatori:', error);
        res.status(500).send('Errore interno al server');
    } finally {
        await connection.end();
    }
});

// Endpoint per ottenere l'elenco dei giocatori liberi da acquistare
router_calciatori.get('/get_giocatori_mercato', async (req, res) => {
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
    }finally {
        await connection.end();
    }
});

// Endpoint per ottenere i giocatori della rosa di un giocatore specifico
router_calciatori.get('/get_giocatori_rosa', async (req, res) => {
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
    } finally {
        await connection.end();
    }
});

// Endpoint per ottenere il numero di giocatori registrati in rosa
router_calciatori.get('/get_numero_players', async (req, res) => {
  const connection = await createConnection();
  try {
    const result = await connection.query('SELECT COUNT(*) FROM player');
    const count = parseInt(result.rows[0].count);
    res.json({count});
  }
  catch (error) {
    console.error('Errore durante la query:', error);
    res.status(500).send('Errore interno al server');
  } finally {
    await connection.end();
  }
});

module.exports = router_calciatori;