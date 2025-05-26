const express = require('express');
const router_login_register = express.Router();
const createConnection = require('../database/Connection');
const transporter = require('../mailer/Mailer');
const crypto = require('crypto');

// Endpoint di registrazione
router_login_register.post('/register', async (req, res) => {
    const connection = await createConnection();
    const { username, password, email } = req.body;
  
    try {
      await connection.query('INSERT INTO player (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
      res.status(201).send('Registrazione avvenuta');
    } catch (err) {
      res.status(500).send('Errore durante la registrazione');
      res.status(409).json({ error: "Username o password errati" });
    }
    finally {
        await connection.end();
    }
});
  
// Endpoint di login
router_login_register.post('/login', async (req, res) => {
    const connection = await createConnection();
    const { username, password} = req.body;
  
    try{
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

      }else {
        res.status(401).send('Username o password errati');
      }
    } catch (err) {
      console.error('Errore durante il login');
      res.status(500).send('Errore interno al server');

    } finally{
        await connection.end();
    }
});

// Endpoint di password dimenticata
router_login_register.post('/forgot-password', async (req, res) => {
  const connection = await createConnection();
  const { email } = req.body;

  const userResult = await connection.query('SELECT * FROM utente WHERE email = $1', [email]);
  if (userResult.rows.length === 0) return res.status(404).send('Utente non trovato');

  const reset_token = crypto.randomBytes(32).toString('hex');
  const token_expiration = new Date(Date.now() + 3600000); // 1 ora da adesso

  await connection.query(
    'UPDATE player SET reset_token = $1, token_expiration = $2 WHERE email = $3', [reset_token, token_expiration, email]
  );

  const link = `http://localhost:3000/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recupero Password',
    html: `<p>Clicca qui per reimpostare la password: <a href="${link}">${link}</a></p>`
  });

  res.send('Email inviata. Controlla la tua casella di posta.');
});

// Endpoint per il reset della password
router_login_register.post('/reset-password', async (req, res) => {
  const connection = await createConnection();
  const { reset_token, new_password } = req.body;

  const result = await connection.query(
    'SELECT * FROM player WHERE reset_token = $1 AND token_expiration > NOW()',
    [reset_token, token]
  );

  if (result.rows.length === 0) {
    return res.status(400).send('Token non valido o scaduto');
  }

  await connection.query(
    'UPDATE player SET password = $1, reset_token = NULL, token_expiration = NULL WHERE reset_token = $2',
    [new_password, reset_token]
  );

  res.send('Password aggiornata con successo.');
});


module.exports = router_login_register;
