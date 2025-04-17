// ---- INIZIALIZZAZIONE DEL GIOCO ---- // 

// Inizializza il gioco quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    
    // Pre-carico i suoni
    preloadSounds();
    
    StartPosition();

    // Riferimenti ai bottoni
    const giocaButton = document.getElementById('giocaButton');
    const player1Button = document.getElementById('player1button');
    const player2Button = document.getElementById('player2button');
    const restartGameButton = document.getElementById('restartButton');
    const restartDraftButton = document.getElementById('restartDraftButton');
    const goHomeButton = document.getElementById('goHomeButton');

    //ELEMENTI DA NASCONDERE ALL'INIZIO
    
    document.querySelector('.table_draft_sx').classList.add('hidden');
    document.querySelector('.table_draft_dx').classList.add('hidden');
    document.querySelector('.background').classList.add('disabled');
    document.querySelector('.grid-container').classList.add('disabled');
    document.querySelector('.game-over').classList.add('hidden');
    document.getElementById('div_ped_promotion').classList.add('hidden');
    document.querySelector('.background-overlay').classList.add('hidden');
    document.querySelector('.condition-container').classList.add('hidden');
    document.querySelector('.progress-container').classList.add('hidden');
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('game-not-started');
    });
    
    // Variabili per tenere traccia dello stato dei bottoni pronto
    window.player1Ready = false;
    window.player2Ready = false;
    
    // Funzione per controllare se entrambi i giocatori sono pronti
    function checkBothPlayersReady() {
        if (window.player1Ready && window.player2Ready) {
            startGame();
        }
    }
    
    // LISTENER PER IL BOTTONE PRINCIPALE GIOCA
    giocaButton.addEventListener('click', () => {
        
        preparaSounds();        // Inizializza i suoni al primo click
        startDraft();                    // Prepara il draft
        scrollToGameContainer();    // Scroll naturale con ritardo e velocità variabile

    });
    
    // LISTENER PER IL BOTTONE DEL GIOCATORE 1
    player1Button.addEventListener('click', () => {
        if (window.player1Ready) {
            // Se il giocatore era già pronto, torna indietro
            window.player1Ready = false;
            player1Button.disabled = false;
            player1Button.style.background = "linear-gradient(to right, #cbcbcb, #a4a4a4)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player1Ready = true;
            player1Button.style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
    });
    
    // LISTENER PER IL BOTTONE DEL GIOCATORE 2
    player2Button.addEventListener('click', () => {
        if (window.player2Ready) {
            // Se il giocatore era già pronto, torna indietro
            window.player2Ready = false;
            player2Button.disabled = false;
            player2Button.style.background = "linear-gradient(to right, #cbcbcb, #a4a4a4)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player2Ready = true;
            player2Button.style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
    });

    // LISTENER PER IL BOTTONE DI RIPARTENZA
    restartGameButton.addEventListener('click', () => {
        restartGame();
    });

    //LISTENER PER IL BOTTONE DI RIPARTENZA DEL DRAFT
    restartDraftButton.addEventListener('click', () => {
        restartDraft();
    });
    
    //LISTENER PER IL BOTTONE DI TORNA ALLA HOME
    goHomeButton.addEventListener('click', () => {
        goHome();
    });
    

    //LISTENER SUL TITOLO DELLA PAGINA
    document.querySelector('.title').addEventListener('click', () => {
        window.location.reload();
    });

    //LISTENER SUL RICARICA DELLA PAGINA
    window.addEventListener('beforeunload', (event) => {
        if(window.gameStarted){
            event.preventDefault();
            event.returnValue = 'Se lasci la pagina ora, perderai la partita.';
            return event.returnValue;
        }
    });
});