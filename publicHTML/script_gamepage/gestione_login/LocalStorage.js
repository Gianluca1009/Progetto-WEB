// Login sulla pagina Game
function LS_login1Game(userId1, username1, punti1) {
    localStorage.setItem('game_user1Id', userId1);
    localStorage.setItem('game_user1_punti', punti1);
    localStorage.setItem('game_username1', username1);
}

function LS_login2Game( userId2, username2, punti2) {
    localStorage.setItem('game_user2Id', userId2);
    localStorage.setItem('game_user2_punti', punti2);
    localStorage.setItem('game_username2', username2);
}


function LS_logoutGame() {
    localStorage.removeItem('game_user1Id');
    localStorage.removeItem('game_user1_punti');
    localStorage.removeItem('game_username1');
    localStorage.removeItem('game_user2Id');
    localStorage.removeItem('game_user2_punti');
    localStorage.removeItem('game_username2');
}


function LS_getUser1Game() {
    const userId = localStorage.getItem('game_user1Id');
    const punti = localStorage.getItem('game_user1_punti');
    const username = localStorage.getItem('game_username1');

    return { id: userId, username: username, punti: punti };
}

function LS_getUser2Game() {
    const userId = localStorage.getItem('game_user2Id');
    const punti = localStorage.getItem('game_user2_point');
    const username = localStorage.getItem('game_username2');

    return { id: userId, username: username, punti: punti };
}

function LS_updateWinner(id, username, punti){
    if (window.turno_bianco)
            LS_login1Game(id, username, punti);
    else LS_login2Game(id, username, punti);
  
}