//------ LOGIN ------//

//Funzione per effettuare il login
function login() {
    Swal.fire({
      title: 'Login',
      html:
        '<input type="text" id="username1" class="swal2-input" placeholder="Username 1">' +
        '<input type="password" id="password1" class="swal2-input" placeholder="Password 1">'+
        '<input type="text" id="username2" class="swal2-input" placeholder="Username 2">' +
        '<input type="password" id="password2" class="swal2-input" placeholder="Password 2">',
      confirmButtonText: 'Login',
      preConfirm: () => {
        const username1 = document.getElementById('username1').value;
        const password1 = document.getElementById('password1').value;
        const username2 = document.getElementById('username2').value;
        const password2 = document.getElementById('password2').value;

        if (!username1 || !password1 || !username2 || !password2 ) {
            Swal.showValidationMessage('Tutti i campi sono obbligatori');
            return false;
        }

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
            console.log(game1Data);
            console.log(game2Data);
            LS_login1Game(game1Data.userId, game1Data.username, game1Data.email, game1Data.punti, game1Data.partite, game1Data.vittorie);
            LS_login2Game(game2Data.userId, game2Data.username, game2Data.email, game2Data.punti, game2Data.partite, game2Data.vittorie);

            //aggirno la ui con i nomi dei player
            document.getElementById('nome_player_1').textContent = game1Data.username;
            document.getElementById('nome_player_2').textContent = game2Data.username;
            document.getElementById('punt_player_1').textContent = game1Data.punti;
            document.getElementById('punt_player_2').textContent = game2Data.punti;

            //nasconde i bottone di login e registrazione
        })
        .catch(error => {
            Swal.showValidationMessage(error.message);
        });
        }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Login effettuato per entrambi i giocatori!');
        makeVisible(document.getElementById("logoutbutton"));
        makeHidden(document.getElementById("loginbutton"));
        makeHidden(document.getElementById("registerbutton"));
      }
    });
}

//Funzione per gestire il caso di sessione gia aperta
function isSessioneAperta(){
    //mostra logout se l'utente è già loggato
    if(LS_getUser1Game().id != null && LS_getUser2Game().id != null){
        document.getElementById("logoutbutton").classList.remove("hidden");
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
    }
}



//------ REGISTRAZIONE ------//

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

//Funzione per effettuare il logout
function logout(){
    Swal.fire({
        title: 'Logout',
        html:
        `<h1> Logout effettuato per entrambi gli utenti</h1>`,
        confirmButtonText: 'OK'
    })
    //cancella LS
    LS_logoutGame();
    //rende visibili i bottoni
    makeHidden(document.getElementById("logoutbutton"));
    makeHidden(document.querySelector("sezione-profilo"));
    makeVisible(document.getElementById("loginbutton"));
    makeVisible(document.getElementById("registerbutton"));
}