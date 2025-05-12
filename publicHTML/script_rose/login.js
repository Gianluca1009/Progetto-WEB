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
          BuildRosa();
          // Mostriamo il messaggio di successo
          Swal.fire('Login effettuato!');
        })
        .catch(error => {
          Swal.showValidationMessage(error.message);
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Login effettuato!');
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
      }
    });
  }