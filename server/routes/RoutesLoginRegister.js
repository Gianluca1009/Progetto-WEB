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

// Endpoint per ottenere l'email dell'utente
router_login_register.get('/get_email', async (req, res) => {
  const connection = await createConnection();
  const { username } = req.query;

  try {
    const result = await connection.query('SELECT email FROM player WHERE username = $1', [username]);
    
    if (result.rows.length > 0) {
      res.send({ email: result.rows[0].email });
    } else {
      res.status(404).send('Utente non trovato');
    }
  } catch (err) {
    console.error('Errore durante il recupero dell\'email:', err);
    res.status(500).send('Errore interno al server');
  } finally {
    await connection.end();
  }
});

// Endpoint di password dimenticata
router_login_register.post('/forgot-password', async (req, res) => {
  const connection = await createConnection();
  const { email } = req.body;

  const userResult = await connection.query('SELECT * FROM player WHERE email = $1', [email]);
  if (userResult.rows.length === 0) return res.status(404).send('Utente non trovato');

  const reset_token = crypto.randomBytes(32).toString('hex');
  const token_expiration = new Date(Date.now() + 3600000); // 1 ora da adesso

  await connection.query(
    'UPDATE player SET reset_token = $1, token_expiration = $2 WHERE email = $3', [reset_token, token_expiration, email]
  );

  const link = `http://localhost:3000/reset-password/${reset_token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recupero Password',
    html: `<p>Clicca qui per reimpostare la password: <a href="${link}">${link}</a></p>`
  });
});


// Endpoint per il reset della password
router_login_register.post('/aggiorna-password', async (req, res) => {
  const connection = await createConnection();
  const { new_password, reset_token } = req.body;

  //newpassword da prendere nel form

  const result = await connection.query(
    'SELECT * FROM player WHERE reset_token = $1 AND token_expiration > NOW()',
    [reset_token]
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



router_login_register.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;

    // HTML con form
    res.send(`
      <html>
        <head><title>Reset Password</title></head>
        <body>
          <h2>Reimposta la tua password</h2>
          <form id="resetForm">
            <input type="hidden" name="reset_token" value="${token}" />
            <input type="password" name="new_password" placeholder="Nuova password" required />
            <button type="submit">Invia</button>
          </form>

          <script>
            const form = document.getElementById('resetForm');
            form.addEventListener('submit', async (event) => {
              event.preventDefault(); // evita il submit tradizionale

              const formData = new FormData(form);
              const data = new URLSearchParams(formData);

              try {
                const response = await fetch('/aggiorna-password', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: data.toString()
                });

                if (response.ok) {
                  alert('Password aggiornata con successo!');
                  // Qui puoi reindirizzare o aggiornare la pagina
                } else {
                  alert("Errore nell'aggiornamento della password");
                }
              } catch (err) {
                alert('Errore di rete o server');
              }
            });
          </script>
        </body>
      </html>
    `);
});


module.exports = router_login_register;
