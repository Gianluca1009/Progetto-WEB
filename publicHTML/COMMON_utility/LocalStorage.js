function LS_updatePunti(id_user, new_punti ) {
    if(localStorage.getItem('game_userId1') === id_user){
        localStorage.setItem('game_user_point1', new_punti);
    }
    if(localStorage.getItem('game_userId2') === id_user){
        localStorage.setItem('game_user_point2', new_punti);
    }
    if(localStorage.getItem('rose_userId') === id_user){
        localStorage.setItem('rose_user_point', new_punti);
    }
    if (localStorage.getItem('mercato_userId') === id_user){
        localStorage.setItem('mercato_user_point', new_punti);
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

function LS_updateVittorie(id_user, new_vittorie) {
    if (localStorage.getItem('mercato_userId') === id_user) {
        localStorage.setItem('mercato_user_partite', new_vittorie);
    }
    if (localStorage.getItem('game_userId1') === id_user) {
        localStorage.setItem('game_user_partite1', new_vittorie);
    }
    if (localStorage.getItem('game_userId2') === id_user) {
        localStorage.setItem('game_user_partite2', new_vittorie);
    }
    if (localStorage.getItem('rose_userId') === id_user) {
        localStorage.setItem('rose_user_partite', new_vittorie);
    }
}