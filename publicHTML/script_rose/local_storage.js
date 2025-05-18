// Login sulla pagina Mercato
function LS_loginRose(userId, username, point) {
    // Salva i dati dell'utente nella pagina Mercato
    localStorage.setItem('rose_userId', userId);
    localStorage.setItem('rose_user_point', point);
    localStorage.setItem('rose_username', username);
}
function LS_logoutRose() {
    localStorage.removeItem('rose_userId');
    localStorage.removeItem('rose_user_point');
    localStorage.removeItem('rose_username');
}

// Recuperare i dati dell'utente dalla pagina Mercato
function LS_get_idPlayerRose() {
    const userId = localStorage.getItem('rose_userId');
    return userId;
}

function LS_get_usernamePlayerRose(){
    const name = localStorage.getItem('rose_username');
    return name;
}

function LS_get_puntiPlayerRose(){
    let punti = localStorage.getItem('rose_user_point');
    return punti;
}

function LS_set_puntiRosa(point){
    localStorage.setItem('rose_user_point', point);
}

function LSR_agg_LSMprezzo (new_prezzo){
    if( localStorage.getItem('rose_userId') === localStorage.getItem('mercato_userId')){
        localStorage.setItem('mercato_user_point', new_prezzo);
    }
}