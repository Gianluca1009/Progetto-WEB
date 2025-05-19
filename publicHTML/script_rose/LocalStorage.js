// Login sulla pagina Mercato
function LS_loginRose(userId, username, email, punti, partite, vittorie) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('rose_userId', userId);
    localStorage.setItem('rose_username', username);
    localStorage.setItem('rose_user_email', email);
    localStorage.setItem('rose_user_punti', punti);
    localStorage.setItem('rose_user_partite', partite);
    localStorage.setItem('rose_user_vittorie', vittorie);
}

function LS_logoutRose() {
    localStorage.removeItem('rose_userId');
    localStorage.removeItem('rose_user_punti');
    localStorage.removeItem('rose_username');
    localStorage.removeItem('rose_user_email');
    localStorage.removeItem('rose_user_partite');
    localStorage.removeItem('rose_user_vittorie');
}

// Recuperare i dati dell'utente dalla pagina Mercato
function LS_getUserRosaData() {
    const userId = localStorage.getItem('rose_userId');
    const username = localStorage.getItem('rose_username');
    const email = localStorage.getItem('rose_user_email');
    const punti = localStorage.getItem('rose_user_punti');
    const partite = localStorage.getItem('rose_user_partite');
    const vittorie = localStorage.getItem('rose_user_vittorie');
    return {id: userId, username: username, email: email, punti: punti, partite: partite, vittorie: vittorie};
}

function LS_set_puntiRosa(point){
    localStorage.setItem('rose_user_punti', point);
}

function LSR_agg_LSMprezzo (new_prezzo){
    if( localStorage.getItem('rose_userId') === localStorage.getItem('mercato_userId')){
        localStorage.setItem('mercato_user_punti', new_prezzo);
    }
}