//----- FUNZIONI AUSILIARIE PER LA GESTIONE DEL LOCAL STORAGE ------//

// Funzione per recuperare il numero di punti dell'utente in input
function LS_updatePunti(id_user, new_punti) {
    if(localStorage.getItem('game_user1Id') === id_user){
        localStorage.setItem('game_user1_punti', new_punti);
    }
    if(localStorage.getItem('game_user2Id') === id_user){
        localStorage.setItem('game_user2_punti', new_punti);
    }
    if(localStorage.getItem('rose_userId') === id_user){
        localStorage.setItem('rose_user_punti', new_punti);
    }
    if (localStorage.getItem('mercato_userId') === id_user){
        localStorage.setItem('mercato_user_punti', new_punti);
    }
}

// Funzione per recuperare il numero di partite giocate dall'utente in input
function LS_updatePartite(id_user, new_partite) {
    if (localStorage.getItem('mercato_userId') === id_user) {
        localStorage.setItem('mercato_user_partite', new_partite);
    }
    if (localStorage.getItem('game_user1Id') === id_user) {
        localStorage.setItem('game_user1_partite', new_partite);
    }
    if (localStorage.getItem('game_user2Id') === id_user) {
        localStorage.setItem('game_user2_partite', new_partite);
    }
    if (localStorage.getItem('rose_userId') === id_user) {
        localStorage.setItem('rose_user_partite', new_partite);
    }
}

// Funzione per recuperare il numero di partite vinte dall'utente in input
function LS_updateVittorie(id_user, new_vittorie) {
    if (localStorage.getItem('mercato_userId') === id_user) {
        localStorage.setItem('mercato_user_vittorie', new_vittorie);
    }
    if (localStorage.getItem('game_user1Id') === id_user) {
        localStorage.setItem('game_user1_vittorie', new_vittorie);
    }
    if (localStorage.getItem('game_user2Id') === id_user) {
        localStorage.setItem('game_user2_vittorie', new_vittorie);
    }
    if (localStorage.getItem('rose_userId') === id_user) {
        localStorage.setItem('rose_user_vittorie', new_vittorie);
    }
}