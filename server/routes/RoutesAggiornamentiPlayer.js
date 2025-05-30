const express = require('express');
const router_aggiornamenti_player = express.Router();
const createConnection = require('../database/Connection');

//----- ENPOINT PER AGGIORNARE IL DB (ACQUISTI, VENDITE, PUNTI, VITTORIE E PARTITE GIOCATE) ------//

// Endpoint per aggiornare i punti del giocatore vincente
router_aggiornamenti_player.post('/update_punti', async (req, res) => {
    const connection = await createConnection();
    const { userid, new_punti} = req.body;
  
    try {
      await connection.query('UPDATE player SET punti = $1 WHERE id = $2', [new_punti, userid]);
      res.status(201).send('update punti avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento dei punti');
    } finally {
        await connection.end();
    }
});

// Endpoint che aggiorna il numero di partite a +1 e lo ritorna (per il LS)
router_aggiornamenti_player.post('/update_partite', async (req, res) => {
    const connection = await createConnection();
    const {userid} = req.body;
  
    try {
      const result = await connection.query('UPDATE player SET partite = partite + 1 WHERE id = $1 RETURNING partite', [userid]);
      partite_aggiornate = result.rows[0].partite;
      res.status(201).json(partite_aggiornate);
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento delle partite');
    } finally {
        await connection.end();
    }
});

// Endpoint che aggiorna il numero di partite a +1 e lo ritorna (per il LS)
router_aggiornamenti_player.post('/update_vittorie', async (req, res) => {
    const connection = await createConnection();
    const {userid} = req.body;
  
    try {
      const result = await connection.query('UPDATE player SET vittorie = vittorie + 1 WHERE id = $1 RETURNING vittorie', [userid]);
      vittorie_aggiornate = result.rows[0].vittorie;
      res.status(201).json(vittorie_aggiornate);
    } catch (err) {
      res.status(500).send('Errore durante l\'aggiornamento delle vittorie');
    } finally {
        await connection.end();
    }
});

// Endpoint per l'acquisto di un calciatore
router_aggiornamenti_player.post('/buy_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { userid, calc_id} = req.body;
  
    try {
      await connection.query('UPDATE player SET rosa_ids = array_append(rosa_ids, $2) WHERE id = $1', [userid, calc_id]);
      res.status(201).send('acquisto calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante l\'acquisto calciatore');
    } finally {
        await connection.end();
    }
});

// Endpoint per la vendita di un calciatore
router_aggiornamenti_player.post('/sale_calciatore', async (req, res) => {
    const connection = await createConnection();
    const { user_id, calc_id } = req.body;
    try {
      await connection.query('UPDATE player SET rosa_ids = array_remove(rosa_ids, $2) WHERE id = $1', [user_id, calc_id]);
      res.status(201).send('vendita calciatore avvenuto');
    } catch (err) {
      res.status(500).send('Errore durante la vendita calciatore');
    } finally {
        await connection.end();
    }
});

// Endpoint per ritornare un player
router_aggiornamenti_player.get('/player_in_db', async (req,res)=> {
    const connection = await createConnection();
    const user_id = req.query.id;
    try{
      
      const result = await connection.query(`SELECT * from player WHERE player.id = $1`, [user_id]);
      if (result.rows.length > 0) {
          res.json(result.rows);
      }
      else {
          res.status(404).send('Nessun player trovato in sessione');
      }
    } catch (error) {
      res.status(500).send('Errore interno al server');
    } finally{
        await connection.end();
    }
});

module.exports = router_aggiornamenti_player;