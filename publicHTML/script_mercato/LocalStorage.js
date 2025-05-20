// Login sulla pagina Mercato
function LS_loginMercato(userId, username, email, punti, partite, vittorie) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('mercato_userId', userId);
    localStorage.setItem('mercato_username', username);
    localStorage.setItem('mercato_user_email', email);
    localStorage.setItem('mercato_user_punti', punti);
    localStorage.setItem('mercato_user_partite', partite);
    localStorage.setItem('mercato_user_vittorie', vittorie);
}

// Funzione che effettua il logout dal mercato
function LS_logoutMercato() {
    localStorage.removeItem('mercato_userId');
    localStorage.removeItem('mercato_user_punti');
    localStorage.removeItem('mercato_username');
    localStorage.removeItem('mercato_user_partite');
    localStorage.removeItem('mercato_user_email');
    localStorage.removeItem('mercato_user_vittorie');
}

// Funzione per recuperare i dati dell'utente dal mercato
function LS_getUserMercatoData() {
    const userId = localStorage.getItem('mercato_userId');
    const username = localStorage.getItem('mercato_username');
    const punti = localStorage.getItem('mercato_user_punti');
    const partite = localStorage.getItem('mercato_user_partite');
    const email = localStorage.getItem('mercato_user_email');
    const vittorie = localStorage.getItem('mercato_user_vittorie');
    return {id: userId, username: username, email: email, punti: punti, partite: partite, vittorie: vittorie};
}