
//------ LOGIN ------//

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
function ifNotLoggedIn() {
    if(LS_getUserRosaData().id === null) {
        buildRowNoLogin();
        window.logout_button.classList.add("hidden");
    }
}

//Funzione che gestisce il caso in cui la sessione è rimasta aperta
function ifSessioneAperta(){
    if(LS_getUserRosaData().id){
        fillUsernameRosa();
        // window.logout_button.classList.remove("hidden");
        makeVisible(window.logout_button);
        makeVisible(window.sezione_profilo);
        window.register_button.classList.add("hidden");
        window.login_button.classList.add("hidden");
        BuildRosa();
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

function logout() {
    LS_logoutRose();

    // Svuoto la bacheca non mostrando più la rosa
    svuotaBacheca();

    // Creo il messaggio di login non effettuato e lo metto in bacheca
    buildRowNoLogin();

    makeHidden(window.logout_button);
    makeHidden(window.sezione_profilo);
    makeVisible(window.login_button);
    makeVisible(window.register_button);
  }