// ---- INIZIALIZZAZIONE DEL GIOCO ---- //

// Inizializza il gioco quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    
    // Riferimenti ai bottoni
    const giocaButton = document.getElementById('giocaButton');
    const player1Button = document.getElementById('player1button');
    const player2Button = document.getElementById('player2button');
    const restartButton = document.getElementById('restartButton');

    document.querySelector('.table_draft_sx').classList.add('hidden');
    document.querySelector('.table_draft_dx').classList.add('hidden');
    document.querySelector('.background').classList.add('disabled');
    document.querySelector('.grid-container').classList.add('disabled');
    document.querySelector('.game-over').classList.add('hidden');
    
    document.querySelector('.condition-container').classList.add('hidden');
    document.querySelector('.progress-container').classList.add('hidden');

    
    // Variabili per tenere traccia dello stato dei bottoni
    let player1Ready = false;
    let player2Ready = false;
    
    // Funzione per controllare se entrambi i giocatori sono pronti
    function checkBothPlayersReady() {
        if (player1Ready && player2Ready) {
            startGame();
        }
    }
    
    // Listener per il bottone principale Gioca
    giocaButton.addEventListener('click', () => {
        Gioca(); // Prepara il draft
    });
    
    // Listener per il bottone del giocatore 1
    player1Button.addEventListener('click', () => {
        if (player1Ready) {
            // Se il giocatore era già pronto, torna indietro
            player1Ready = false;
            player1Button.disabled = false;
            player1Button.style.color = "black";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            player1Ready = true;
            player1Button.style.color = "green";
            checkBothPlayersReady();
        }
    });
    
    // Listener per il bottone del giocatore 2
    player2Button.addEventListener('click', () => {
        if (player2Ready) {
            // Se il giocatore era già pronto, torna indietro
            player2Ready = false;
            player2Button.disabled = false;
            player2Button.style.color = "white";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            player2Ready = true;
            player2Button.style.color = "green";
            checkBothPlayersReady();
        }
    });
    
    // Aggiunge la classe che disabilita l'hover all'inizio
    
    // Disabilita inizialmente il movimento delle pedine
    window.canMovePiece = function() {
        return false;
    };

    // Listener per il bottone di ripartenza
    restartButton.addEventListener('click', () => {
        restartGame();
    });

    //Listener sul titolo della pagina
    document.querySelector('.title').addEventListener('click', () => {
        window.location.reload();
    });
});