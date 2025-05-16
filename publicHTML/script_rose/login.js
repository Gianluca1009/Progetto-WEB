function openLogPopup() {
    Swal.fire({
      title: 'Login',
      html:
        '<input type="text" id="username" class="swal2-input" placeholder="Username">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Password">',
      confirmButtonText: 'Login',
      preConfirm: () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
          Swal.showValidationMessage('Tutti i campi sono obbligatori');
          return false;
        }

        return fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        .then(response => {
          if (!response.ok) throw new Error('Credenziali non valide');
          return response.json(); // Restituiamo la risposta JSON
        })
        .then(data => {
          // Se la risposta è positiva, la variabile `data` contiene i dati dell'utente
          const { userId, username, point } = data;
          // Chiamata alla funzione LS_loginRose per salvare i dati nel localStorage
          LS_loginRose(userId, username, point);
          //popola l'area di log con i calciatori della rosa

          //rimuovo i messaggi di login non effettuato dalle finestre
          const finestra_difensori = document.getElementById("finestra-difensori");
          const finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
          const finestra_attaccanti = document.getElementById("finestra-attaccanti");
          finestra_difensori.querySelectorAll("*").forEach(el => el.remove());
          finestra_centrocampisti.querySelectorAll("*").forEach(el => el.remove());
          finestra_attaccanti.querySelectorAll("*").forEach(el => el.remove());

          BuildRosa();
          // Mostriamo il messaggio di successo

        })
        .catch(error => {
          Swal.showValidationMessage(error.message);
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        makeVisible(document.getElementById("logoutbutton"));
        fillUsernameRosa();
        makeVisible(document.getElementById("playerusername"));
        makeHidden(document.getElementById("loginbutton"));
        makeHidden(document.getElementById("registerbutton"));
      }
    });
  }


function openRegPopup() {
  Swal.fire({
    title: 'Registrazione utente',
    html:
      '<input type="text" id="username" class="swal2-input" placeholder="Username">' +
      '<input type="password" id="password" class="swal2-input" placeholder="Password">'+
      '<input type="email" id="email" class="swal2-input" placeholder="Email">',
    confirmButtonText: 'Registrati',
    preConfirm: () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      if (!username || !password  || !email) {
        Swal.showValidationMessage('Tutti i campi sono obbligatori');
        return false;
      }

      return fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      })
      .then(response => {
        if (!response.ok) throw new Error('Credenziali non valide');
        return response.text();
      })
      .catch(error => {
        Swal.showValidationMessage(error.message);
      });
    }
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire('Registrazione avvenuta!');
      makeHidden(document.getElementById("registerbutton"));
    }
  });
}

//crea la riga che segnala il login non effettuato
function buildRowNoLogin(bacheca, ruolo) {
    const row = document.createElement('div');
    row.className = 'riga_finestra no-result';
    row.id = 'no-login';

    // Campo info con messaggio
    const campoInfo = document.createElement('div');
    campoInfo.className = 'no-result';

    const titolo = document.createElement('h2');
    titolo.textContent = `Effettua il login per visualizzare i ${ruolo} della tua rosa`;
    titolo.style.fontSize = 'min(1.5vw, 1.5em)';
    titolo.style.marginBlockEnd = '0.5em';
    titolo.style.color = '#b22222'; // rosso scuro per enfasi

    campoInfo.appendChild(titolo);
    row.appendChild(campoInfo);

    // Aggiunta alla finestra del mercato
    row.classList.add("fade-hidden");
    bacheca.appendChild(row);
    makeVisible(row);
}


function openLogoutPopup() {
    LS_logoutRose();

    const finestra_difensori = document.getElementById("finestra-difensori");
    const finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
    const finestra_attaccanti = document.getElementById("finestra-attaccanti");

    const rows_difensori = finestra_difensori.querySelectorAll("div");
    const rows_centrocampisti = finestra_centrocampisti.querySelectorAll("div");
    const rows_attaccanti = finestra_attaccanti.querySelectorAll("div");

    rows_difensori.forEach(div => div.remove());
    rows_centrocampisti.forEach(div => div.remove());
    rows_attaccanti.forEach(div => div.remove());

    if(LS_get_idPlayerRose() === null) {
      buildRowNoLogin(finestra_difensori, "difensori");
      buildRowNoLogin(finestra_centrocampisti, "centrocampisti");
      buildRowNoLogin(finestra_attaccanti, "attaccanti");
    }

    makeHidden(document.getElementById("logoutbutton"));
    makeHidden(document.getElementById("playerusername"));
    makeVisible(document.getElementById("loginbutton"));
    makeVisible(document.getElementById("registerbutton"));
}

function eliminaMessaggiLogin() {
    const finestra_difensori = document.getElementById("finestra-difensori");
    const finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
    const finestra_attaccanti = document.getElementById("finestra-attaccanti");

    const rows_difensori = finestra_difensori.querySelectorAll("div");
    const rows_centrocampisti = finestra_centrocampisti.querySelectorAll("div");
    const rows_attaccanti = finestra_attaccanti.querySelectorAll("div");
    console.log(rows_difensori);

    rows_difensori.forEach(div => div.remove());
    rows_centrocampisti.forEach(div => div.remove());
    rows_attaccanti.forEach(div => div.remove());
}