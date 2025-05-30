
//------ LOGIN ROSA ------//

// Funzione che permette di effettuare il login
function login() {
    Swal.fire({
      title: 'Login',
      html:
        '<input type="text" id="username" class="swal2-input" placeholder="Username" autocomplete="off">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Password" autocomplete="off">' +
        '<br><br><a id="pass_dim" class="password-dimenticata" onclick="forgotPassword(\'rosa\')">Password dimenticata?</a>',
      confirmButtonText: 'Login',
      customClass: {
        popup: 'my-swal-margin-top'
      },
      preConfirm: () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;        

        if (!username || !password) {
          Swal.showValidationMessage('Tutti i campi sono obbligatori');
          return false;
        }
        Swal.showLoading(); // Mostra l'animazione di caricamento

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

          // Chiamata alla funzione LS_loginRose per salvare i dati nel localStorage
          LS_loginRose(userId, username, email, punti, partite, vittorie);

          //rimuovo il messaggio di login non effettuato dalla bacheca
          svuotaBacheca();

          // Mostro la rosa dell'utente corrente
          BuildRosa();

        })
        .catch(error => {
          Swal.showValidationMessage(error.message);
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        fillUsernameRosa();
        makeVisible(window.sezione_profilo);
        makeHidden(window.register_button);
        makeHidden(window.login_button);
        makeVisible(window.logout_button);
      }
    });
}

// Funzione che, quando necessario, inserisce il messaggio di login non effettuato nella bacheca
async function ifNotLoggedIn() {

    const righe_tabella_player = await fetch(`/get_numero_players`);
    const righe = await righe_tabella_player.json();

    if (righe.count === 0) {
      svuotaBacheca();
      logout();
      return;
    }

    if(LS_getUserRosaData().id === null) {
        buildMessageNoLogin();
        window.logout_button.classList.add("hidden");
    }
}

//Funzione che gestisce il caso in cui la sessione è rimasta aperta
async function ifSessioneAperta(){
    if(LS_getUserRosaData().id){
        const player = await fetch(`/player_in_db?id=${LS_getUserRosaData().id}`);
        if(!player.ok || player.json().lenght == 0) {
            LS_logoutRose();
            return;
        }
        fillUsernameRosa();
        // window.logout_button.classList.remove("hidden");
        makeVisible(window.logout_button);
        makeVisible(window.sezione_profilo);
        window.register_button.classList.add("hidden");
        window.login_button.classList.add("hidden");
        BuildRosa();
    }
}


//------ REGISTRAZIONE ROSA ------//

// Funzione che permette di effettuare la registrazione di un nuovo utente
function register() {
  Swal.fire({
    title: 'Registrazione utente',
    html:
      '<input type="text" id="username" class="swal2-input" placeholder="Username" autocomplete="off">' +
      '<input type="password" id="password" class="swal2-input" placeholder="Password" autocomplete="off">'+
      '<input type="email" id="email" class="swal2-input" placeholder="Email" autocomplete="off">',
    confirmButtonText: 'Registrati',
    customClass: {
      popup: 'my-swal-margin-top'
    },
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




//------ LOGOUT ROSA ------//

// Funzione che permette di effettuare il logout
function logout() {
    LS_logoutRose();

    // Svuoto la bacheca non mostrando più la rosa
    svuotaBacheca();

    window.difensori = [];
    window.centrocampisti = [];
    window.attaccanti = [];

    // Creo il messaggio di login non effettuato e lo metto in bacheca
    buildMessageNoLogin();

    makeHidden(window.logout_button);
    makeHidden(window.sezione_profilo);
    makeVisible(window.login_button);
    makeVisible(window.register_button);
  }