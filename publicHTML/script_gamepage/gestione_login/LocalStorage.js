// Login sulla pagina Game
function LS_login1Game(userId1, username1, point1) {
    localStorage.setItem('game_userId1', userId1);
    localStorage.setItem('game_user_point1', point1);
    localStorage.setItem('game_username1', username1);
}

function LS_login2Game( userId2, username2, point2) {
    localStorage.setItem('game_userId2', userId2);
    localStorage.setItem('game_user_point2', point2);
    localStorage.setItem('game_username2', username2);
}


function LS_logoutGame() {
    localStorage.removeItem('game_userId1');
    localStorage.removeItem('game_user_point1');
    localStorage.removeItem('game_username1');
    localStorage.removeItem('game_userId2');
    localStorage.removeItem('game_user_point2');
    localStorage.removeItem('game_username2');
}


function LS_getUser1Game() {
    const userId = localStorage.getItem('game_userId1');
    const point = localStorage.getItem('game_user_point1');
    const name = localStorage.getItem('game_username1');

    return [ userId, name, point ];
}

function LS_getUser2Game() {
    const userId = localStorage.getItem('game_userId2');
    const point = localStorage.getItem('game_user_point2');
    const name = localStorage.getItem('game_username2');

    return [ userId, name, point ];
}

function LS_updateWinner(id, username, punti){
    if (window.turno_bianco)
            LS_login1Game(id, username, punti);
    else LS_login2Game(id, username, punti);
  
}