// ---- AGGIORNAMENTO RISOLUZIONE ---- //

window.addEventListener('resize', function() {
    setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatore
});

window.onload = function() {
    ratioPedine('CLASSIC');
}

// ---- INIZIALIZZAZIONE DEL GIOCO ---- //
// Inizializza il gioco quando la pagina si carica

document.addEventListener('DOMContentLoaded', () => {

    handleHamburgerMenu(); // Funzione per gestire il menu hamburger

    //mostra logout se l'utente è già loggato
    if(LS_getUser1Game()[0] != null && LS_getUser2Game()[0] != null){
        document.getElementById("logoutbutton").classList.remove("hidden");
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
    }
    // Pre-carico i suoni
    preloadSounds();
    //setSezioniDimensions(); // Imposta le dimensioni delle sezioni in base alla grandezza del contenitore del gioco
    setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatori
    //setSoccerPlayerInfoFontSize(); // Imposta la grandezza del font delle informazioni dei calciatori in base alla grandezza della cella
    StartPosition();

    // Riferimenti ai bottoni
    const giocaButton = document.getElementById('giocaButton');
    const player1Button = document.getElementById('top_player1');
    const player2Button = document.getElementById('top_player2');
    const restartButton = document.getElementById('restartButton');
    const restartDraftButton = document.getElementById('restartDraftButton');
    
    // Riferimenti ai bottoni random draft
    const randomButton1 = document.getElementById('random1');
    const randomButton2 = document.getElementById('random2');

    //ELEMENTI DA NASCONDERE ALL'INIZIO

    restartButton.classList.add('hidden');
    restartDraftButton.classList.add('hidden');

    document.getElementById('player1button').classList.add('hidden');
    document.getElementById('player2button').classList.add('hidden');
    document.querySelector('.background').classList.add('disabled');
    document.querySelector('.grid-container').classList.add('disabled');
    document.querySelector('.sezione_sx').classList.add('hidden');
    document.querySelector('.sezione_dx').classList.add('hidden');
    //document.querySelector('.game-over').classList.add('hidden');
    document.getElementById('div_ped_promotion').classList.add('hidden');
    document.querySelector('.background-overlay').classList.add('hidden');
    document.querySelector('.condition-container').classList.add('hidden');
    document.querySelector('.progress-container').classList.add('hidden');
    document.querySelector('.switch').classList.add('hidden');
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('hidden');
    });
    disabilitaPedine();


    // LISTENER PER IL BOTTONE PRINCIPALE GIOCA
    giocaButton.addEventListener('click', () => {
        if(LS_getUser1Game()[0] != null && LS_getUser2Game()[0] != null){
            document.querySelectorAll('.pedina').forEach(pedina => {
            makeVisible(pedina); // Rende visibili le pedine
            });
            preparaSounds();        // Inizializza i suoni al primo click
            startDraft();                    // Prepara il draft
            scrollToGameContainer();    // Scroll naturale con ritardo e velocità variabile
        } else{
            Swal.fire('Accedi per scendere in campo!');
        }
    });

    // LISTENER PER IL BOTTONE DEL GIOCATORE 1
    player1Button.addEventListener('click', () => {
        if (window.player1Ready) {
            // Se il giocatore era già pronto, torna indietro
            window.player1Ready = false;
            player1Button.style.background = "var(--button_color)";
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

    restartButton.addEventListener('click', () => {
        restartGame();
    });

    restartDraftButton.addEventListener('click', () => {
        window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
        window.idCellReNero = "03"; //id della cella su cui c'è il re nero
        restartDraft();
    });

    // LISTENER PER I BOTTONI RANDOM DRAFT
    randomButton1.addEventListener('click', () => {
        // Popola casualmente le pedine bianche
        populateRandom("bianco");
    });

    randomButton2.addEventListener('click', () => {
        // Popola casualmente le pedine nere
        populateRandom("nero");
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