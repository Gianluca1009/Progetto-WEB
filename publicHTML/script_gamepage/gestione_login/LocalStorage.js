// Login sulla pagina Game
function LS_login1Game(userId1, username1, email1, punti1, partite1, vittorie1) {
    localStorage.setItem('game_user1Id', userId1);
    localStorage.setItem('game_username1', username1);
    localStorage.setItem('game_user1_email', email1);
    localStorage.setItem('game_user1_punti', punti1);
    localStorage.setItem('game_user1_partite', partite1);
    localStorage.setItem('game_user1_vittorie', vittorie1);
}

function LS_login2Game( userId2, username2, email2, punti2, partite2, vittorie2) {
    localStorage.setItem('game_user2Id', userId2);
    localStorage.setItem('game_username2', username2);
    localStorage.setItem('game_user2_email', email2);
    localStorage.setItem('game_user2_punti', punti2);
    localStorage.setItem('game_user2_partite', partite2);
    localStorage.setItem('game_user2_vittorie', vittorie2);
}


function LS_logoutGame() {
    localStorage.removeItem('game_user1Id');
    localStorage.removeItem('game_username1');
    localStorage.removeItem('game_user1_email');
    localStorage.removeItem('game_user1_punti');
    localStorage.removeItem('game_user1_partite');
    localStorage.removeItem('game_user1_vittorie');
    
    localStorage.removeItem('game_user2Id');
    localStorage.removeItem('game_username2');
    localStorage.removeItem('game_user2_email');
    localStorage.removeItem('game_user2_punti');
    localStorage.removeItem('game_user2_partite');
    localStorage.removeItem('game_user2_vittorie');
}


function LS_getUser1Game() {
    const userId = localStorage.getItem('game_user1Id');
    const username = localStorage.getItem('game_username1');
    const email = localStorage.getItem('game_user1_email');
    const punti = localStorage.getItem('game_user1_punti');
    const partite = localStorage.getItem('game_user1_partite');
    const vittorie = localStorage.getItem('game_user1_vittorie');
    return { id: userId, username: username, email: email, punti: punti, partite: partite, vittorie: vittorie };
}

function LS_getUser2Game() {
    const userId = localStorage.getItem('game_user2Id');
    const username = localStorage.getItem('game_username2');
    const email = localStorage.getItem('game_user2_email');
    const punti = localStorage.getItem('game_user2_punti');
    const partite = localStorage.getItem('game_user2_partite');
    const vittorie = localStorage.getItem('game_user2_vittorie');
    return { id: userId, username: username, email: email, punti: punti , partite: partite, vittorie: vittorie };
}

function LS_updateWinner(id, username,email, punti, partite, vittorie) {
    if (window.turno_bianco)
            LS_login1Game(id, username, email, punti, partite, vittorie);
    else LS_login2Game(id, username, email, punti, partite, vittorie);
}