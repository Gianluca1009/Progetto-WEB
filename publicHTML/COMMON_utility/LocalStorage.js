function LS_update_all_prezzo(id_utente, point ) {
    if(localStorage.getItem('game_userId1') === id_utente){
        localStorage.setItem('game_user_point1', point);
    }
    if(localStorage.getItem('game_userId2') === id_utente){
        localStorage.setItem('game_user_point2', point);
    }
    if(localStorage.getItem('rose_userId') === id_utente){
        localStorage.setItem('rose_user_point', point);
    }
    if (localStorage.getItem('mercato_userId') === id_utente){
        localStorage.setItem('mercato_user_point', point);
    }
}

function LS_updatePartite(id_user, new_partite) {
    if (localStorage.getItem('mercato_userId') === id_user) {
        localStorage.setItem('mercato_user_partite', new_partite);
    }
    if (localStorage.getItem('game_userId1') === id_user) {
        localStorage.setItem('game_user_partite1', new_partite);
    }
    if (localStorage.getItem('game_userId2') === id_user) {
        localStorage.setItem('game_user_partite2', new_partite);
    }
    if (localStorage.getItem('rose_userId') === id_user) {
        localStorage.setItem('rose_user_partite', new_partite);
    }
}