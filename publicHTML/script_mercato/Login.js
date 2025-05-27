//------ LOGIN ------//

//Funzione che permette di effettuare il login
function login() {
    Swal.fire({
      title: 'Login',
      html:
        '<input type="text" id="username" class="swal2-input" placeholder="Username" autocomplete="off">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Password" autocomplete="off">' +
        '<br><br><a id="pass_dim" class="password-dimenticata" style="padding-top: 1vw; color: #007bff; text-decoration: none; font-size: 0.9em;" onclick="forgotPassword()">Password dimenticata?</a>',
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
          // Chiamata alla funzione loginMercato per salvare i dati nel localStorage
          LS_loginMercato(userId, username, email, punti, partite, vittorie);
          window.user_points.textContent = punti;
          // Mostriamo il messaggio di successo
          
        })
        .catch(error => {
          Swal.showValidationMessage(error.message);
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        document.querySelectorAll('.btn-compravendita').forEach(button => {
          makeVisible(button);
        });
        makeVisible(window.logout_button);
        makeVisible(window.user_points);
        fillUsernameMercato();
        makeVisible(window.sezione_profilo);
        makeHidden(window.login_button);
        makeHidden(window.register_button);
        BuildMercato("", "qualsiasi");
      }
    });
    
}

//Funzione che gestisce il caso in cui non è stato effettuato il login
async function ifNotLoggedIn() {

    // const righe_tabella_player = await fetch(`/get_numero_players`);
    // const righe = await righe_tabella_player.json();

    // if (righe.count === 0) {
    //   logout();
    //   return;
    // }

    if(LS_getUserMercatoData().id == null){
        deleteRows();
        window.user_points.classList.add('hidden');
        buildRowNoLogin();
    }
}

//Funzione che gestisce il caso in cui la sessione è rimasta aperta
async function ifSessioneAperta() {
    if(LS_getUserMercatoData().id != null){
        const player = await fetch(`/player_in_db?id=${LS_getUserMercatoData().id}`);
        if(!player.ok) {
            LS_logoutMercato();
            return;
        }
        BuildMercato("", "qualsiasi");
        fillUsernameMercato();
        window.user_points.textContent = LS_getUserMercatoData().punti;
        window.logout_button.classList.remove("hidden");
        makeVisible(window.sezione_profilo);
        window.register_button.classList.add("hidden");
        document.querySelectorAll('.btn-compravendita').forEach(button => {
          makeVisible(button);
        });
        window.login_button.classList.add("hidden");
    }
}


//------ REGISTRAZIONE ------//

//Funzione che permette di effettuare la registrazione
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



//------ LOGOUT ------//

//Funzione che permette di effettuare il logout
function logout() {
    LS_logoutMercato();
    // window.user_points.textContent = 'loggarsi';
    makeHidden(window.user_points, 0);
    window.user_points.classList.add("hidden");
    makeHidden(window.logout_button);
    makeHidden(window.sezione_profilo);
    makeVisible(window.login_button);
    makeVisible(window.register_button);
    deleteRows();
    document.querySelectorAll('.btn-compravendita').forEach(button => {
        makeHidden(button);
    });
    buildRowNoLogin();
}