//------ LOGIN ------//

// Funzione per effettuare il login
function login() {
    Swal.fire({
      title: 'Login',
      customClass: {
        popup: 'login-popup'
      },
      html:
      `<div class = container-doppio-login>
          <div class = 'container-login'>
              <h3 style = "margin-bottom: 0">Giocatore bianco</h3>
              <input type="text" id="username1" class="swal2-input" placeholder="Inserire username..." autocomplete="off">
              <input type="password" id="password1" class="swal2-input" placeholder="Inserire password..." autocomplete="off">
              <a onclick="forgotPassword('game1')" class="password-dimenticata">Password dimenticata?</a>
          </div>
          <div class = 'container-login'>
              <h3 style = "margin-bottom: 0">Giocatore nero</h3>
              <input type="text" id="username2" class="swal2-input" placeholder="Inserire username..." autocomplete="off">
              <input type="password" id="password2" class="swal2-input" placeholder="Inserire password..." autocomplete="off">
              <a onclick="forgotPassword('game2')" class="password-dimenticata">Password dimenticata?</a>
          </div>
      </div>`,
      confirmButtonText: 'Login',
      preConfirm: () => {
        const username1 = document.getElementById('username1').value;
        const password1 = document.getElementById('password1').value;
        const username2 = document.getElementById('username2').value;
        const password2 = document.getElementById('password2').value;

        if(username1 === username2){
          Swal.showValidationMessage('Non puoi giocare contro te stesso');
          return false;
        }

        if (!username1 || !password1 || !username2 || !password2 ) {
            Swal.showValidationMessage('Tutti i campi sono obbligatori');
            return false;
        }

        Swal.showLoading(); // Mostra l'animazione di caricamento

        // Due fetch in parallelo per i due giocatori
        return Promise.all([
            fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username1, password: password1 })
            }).then(res => {
            if (!res.ok) throw new Error('Login Game 1 fallito');
            return res.json();
            }),

            fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username2, password: password2 })
            }).then(res => {
            if (!res.ok) throw new Error('Login Game 2 fallito');
            return res.json();
            })
        ])
        .then(([game1Data, game2Data]) => {
            // Salvi i dati dei due giochi nel localStorage
            LS_login1Game(game1Data.userId, game1Data.username, game1Data.email, game1Data.punti, game1Data.partite, game1Data.vittorie);
            LS_login2Game(game2Data.userId, game2Data.username, game2Data.email, game2Data.punti, game2Data.partite, game2Data.vittorie);
        })
        .catch(error => {
            Swal.showValidationMessage(error.message);
        });
        }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          html: '<h2>Login effettuato per entrambi i giocatori!</h2>'
        });
        makeVisible(document.getElementById("logout-button"));
        makeVisible(document.querySelector(".users-container"));
        makeHidden(document.getElementById("login-button"));
        makeHidden(document.getElementById("register-button"));
        document.querySelector('.game-container').style.marginTop = '7vh';
        fillUsernameGamepage();
      }
    });
}

// Funzione per gestire il caso di sessione gia aperta
function isSessioneAperta(){
    //mostra logout se l'utente è già loggato
    if(LS_getUser1Game().id != null && LS_getUser2Game().id != null){
        document.getElementById("logout-button").classList.remove("hidden");
        document.getElementById("register-button").classList.add("hidden");
        document.getElementById("login-button").classList.add("hidden");
        fillUsernameGamepage();
    }
}

// Funzione per gestire il caso in cui non è stato effettuato il login
function isNotLoggedIn() {
    // Se non è loggato, nasconde il bottone di logout e mostra i bottoni di login e registrazione
    if(LS_getUser1Game().id == null || LS_getUser2Game().id == null){
        document.getElementById("logout-button").classList.add("hidden");
        document.querySelector(".users-container").classList.add("hidden");
        makeVisible(document.getElementById("login-button"));
        makeVisible(document.getElementById("register-button"));
        document.querySelector('.game-container').style.marginTop = '13vw';
    }
}



//------ REGISTRAZIONE ------//

// Funzione per effettuare la registrazione
function register() {
  Swal.fire({
    title: 'Registrazione utente',
    customClass: {
      popup: 'register-popup'
    },
    html:
      '<input type="text" id="username" class="swal2-input" placeholder="Username" autocomplete="off">' +
      '<input type="password" id="password" class="swal2-input" placeholder="Password" autocomplete="off">'+
      '<input type="email" id="email" class="swal2-input" placeholder="Email" autocomplete="off">',
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

//Funzione per effettuare il logout
function logout(){
    Swal.fire({
      html: '<h2>Logout effettuato per entrambi i giocatori!</h2>'
    });
    //cancella LS
    LS_logoutGame();
    //rende visibili i bottoni
    makeHidden(document.getElementById("logout-button"));
    document.querySelector(".users-container").classList.add("hidden");
    makeVisible(document.getElementById("login-button"));
    makeVisible(document.getElementById("register-button"));
    document.querySelector('.game-container').style.marginTop = '13vw';
}