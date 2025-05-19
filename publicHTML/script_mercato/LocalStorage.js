// Login sulla pagina Mercato
function LS_loginMercato(userId, username, punti, partite, email) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('mercato_userId', userId);
    localStorage.setItem('mercato_user_punti', punti);
    localStorage.setItem('mercato_username', username);
    localStorage.setItem('mercato_user_partite', partite);
    localStorage.setItem('mercato_user_email', email);
}

// Funzione che effettua il logout dal mercato
function LS_logoutMercato() {
    localStorage.removeItem('mercato_userId');
    localStorage.removeItem('mercato_user_punti');
    localStorage.removeItem('mercato_username');
    localStorage.removeItem('mercato_user_partite');
    localStorage.removeItem('mercato_user_email');
}

// Funzione per recuperare i dati dell'utente dal mercato
function LS_getUserMercatoData() {
    const userId = localStorage.getItem('mercato_userId');
    const name = localStorage.getItem('mercato_username');
    const punti = localStorage.getItem('mercato_user_point');
    const partite = localStorage.getItem('mercato_user_partite');
    const email = localStorage.getItem('mercato_user_email');
    return [userId, name, punti, partite, email];
}

// ???
function LSM_agg_LSRprezzo (new_prezzo){
    if( localStorage.getItem('rose_userId') === localStorage.getItem('mercato_userId')){
      localStorage.setItem('rose_user_point', new_prezzo);
    }
}