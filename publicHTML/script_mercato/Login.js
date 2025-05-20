//------ LOGIN ------//

//Funzione che permette di effettuare il login
function login() {
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
          const { userId, username, email, punti, partite, vittorie } = data;
          // Chiamata alla funzione loginMercato per salvare i dati nel localStorage
          LS_loginMercato(userId, username, email, punti, partite, vittorie);
          document.querySelector('.user-points').textContent = punti;
          // Mostriamo il messaggio di successo
          
        })
        .catch(error => {
          Swal.showValidationMessage(error.message);
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Login effettuato!');
        document.querySelectorAll('.btn-compravendita').forEach(button => {
          makeVisible(button);
        });
        makeVisible(document.getElementById("logoutbutton"));
        fillUsernameMercato();
        makeVisible(document.querySelector(".sezione-profilo"));
        makeHidden(document.getElementById("loginbutton"));
        makeHidden(document.getElementById("registerbutton"));
        BuildMercato("", "qualsiasi");
      }
    });
    
}

//Funzione che gestisce il caso in cui non è stato effettuato il login
function ifNotLoggedIn() {
    if(LS_getUserMercatoData().id == null){
        buildRowNoLogin();
        document.getElementById('user-points').classList.add('hidden');
    }
}

//Funzione che gestisce il caso in cui la sessione è rimasta aperta
function ifSessioneAperta() {
    if(LS_getUserMercatoData().id != null){
        BuildMercato("", "qualsiasi");
        fillUsernameMercato();
        document.querySelector('.user-points').textContent = LS_getUserMercatoData().punti;
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.querySelector(".sezione-profilo"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.querySelectorAll('.btn-compravendita').forEach(button => {
          makeVisible(button);
        });
        document.getElementById("loginbutton").classList.add("hidden");
    }
}

//Funzione che crea la riga che segnala il login non effettuato
function buildRowNoResult() {
    const row = document.createElement('div');
    row.className = 'riga-bacheca no-result';

    // Campo info con messaggio
    const campoInfo = document.createElement('div');
    campoInfo.className = 'no-result';

    const titolo = document.createElement('h2');
    titolo.textContent = "Nessun giocatore trovato";
    titolo.style.fontSize = 'min(1.5vw, 1.5em)';
    titolo.style.marginBlockEnd = '0.5em';
    titolo.style.color = '#b22222'; // rosso scuro per enfasi

    const testo = document.createElement('p');
    testo.textContent = "Modifica i criteri di ricerca e riprova.";
    testo.style.fontSize = 'min(1vw, 1em)';
    testo.style.color = '#555';

    campoInfo.appendChild(titolo);
    campoInfo.appendChild(testo);
    row.appendChild(campoInfo);

    // Aggiunta alla finestra del mercato
    row.classList.add("fade-hidden");
    document.getElementById('finestramercato').appendChild(row);
    makeVisible(row);
}



//------ REGISTRAZIONE ------//

//Funzione che permette di effettuare la registrazione
function register() {
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Inserisci un indirizzo email valido');
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
  
    }
  });
}



//------ LOGOUT ------//

//Funzione che permette di effettuare il logout
function logout() {
    LS_logoutMercato();
    document.querySelector('.user-points').textContent = 'loggarsi';
    makeHidden(document.getElementById("logoutbutton"));
    makeHidden(document.querySelector(".sezione-profilo"));
    makeVisible(document.getElementById("loginbutton"));
    makeVisible(document.getElementById("registerbutton"));
    document.querySelectorAll('.btn-compravendita').forEach(button => {
        makeHidden(button);
    });
}