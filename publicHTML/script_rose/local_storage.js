// Login sulla pagina Mercato
function LS_loginRose(userId, username, point) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('rose_userId', userId);
    localStorage.setItem('rose_user_point', point);
    localStorage.setItem('rose_username', username);
    
    alert('Login per il Mercato effettuato con successo');
  }

function LS_logoutRose() {
    localStorage.removeItem('rose_userId');
    localStorage.removeItem('rose_user_point');
    localStorage.removeItem('rose_username');
    alert('Logout dalla pagina Mercato effettuato');
  }

  // Recuperare i dati dell'utente dalla pagina Mercato
function LS_get_idPlayerRose() {
    const userId = localStorage.getItem('rose_userId');
    //const point = localStorage.getItem('rose_user_point');
    //const name = localStorage.getItem('rose_username');

    return userId;
  }