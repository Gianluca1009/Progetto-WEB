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