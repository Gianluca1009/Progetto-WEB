
//------ LOGIN ------//

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

          //rimuovo il messaggio di login non effettuato dalla bacheca
          svuotaBacheca();

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

//Funzione che crea la riga che segnala il login non effettuato
function buildRowNoLogin() {
    // let bacheca = document.getElementById("bacheca-rosa");

    const row = document.createElement('div');
    row.className = 'riga_finestra no-result';
    row.id = 'no-login';

    // Campo info con messaggio
    const campoInfo = document.createElement('div');
    campoInfo.className = 'no-result';

    const titolo = document.createElement('h2');
    titolo.textContent = `Effettua il login per visualizzare i calciatori della tua rosa`;
    titolo.style.fontSize = 'min(1.5vw, 1.5em)';
    titolo.style.marginBlockEnd = '0.5em';
    titolo.style.color = '#b22222'; // rosso scuro per enfasi

    campoInfo.appendChild(titolo);
    row.appendChild(campoInfo);

    // Aggiunta alla finestra del mercato
    row.classList.add("fade-hidden");
    window.bacheca.appendChild(row);
    makeVisible(row);
}

// Svuota le finestre che mostrano i giocatori
function svuotaBacheca() {
  window.bacheca.querySelectorAll("*").forEach(el => el.remove());
}

//Funzione che gestisce il caso in cui non è stato effettuato il login
function ifNotLoggedIn() {
    if(LS_get_idPlayerRose() === null) {
        //Se non è stato fatto il login, inserisco la riga che lo segnalano
        buildRowNoLogin()

    }
}

//Funzione che gestisce il caso in cui la sessione è rimasta aperta
function ifSessioneAperta(){
    if(LS_get_idPlayerRose()){
        fillUsernameRosa();
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.getElementById("playerusername"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
        BuildRosa();
    }
}


//------ REGISTRAZIONE ------//

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




//------ LOGOUT ------//

function openLogoutPopup() {
    LS_logoutRose();

    svuotaBacheca();

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