// Login sulla pagina Mercato
function loginMercato(userId, username, point) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('mercato_userId', userId);
    localStorage.setItem('mercato_user_point', point);
    localStorage.setItem('mercato_username', username);
    
    alert('Login per il Mercato effettuato con successo');
  }

function logoutMercato() {
    localStorage.removeItem('mercato_userId');
    localStorage.removeItem('mercato_user_point');
    localStorage.removeItem('mercato_username');
    alert('Logout dalla pagina Mercato effettuato');
  }

  // Recuperare i dati dell'utente dalla pagina Mercato
function getUserMercatoData() {
    const userId = localStorage.getItem('mercato_userId');
    const point = localStorage.getItem('mercato_user_pont');
    const name = localStorage.getItem('mercato_username');

    return { userId, name, point };
  }