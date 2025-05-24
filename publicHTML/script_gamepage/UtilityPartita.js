window.player1Ready = false;
window.player2Ready = false;


//
//---- FUNZIONI PER LA GESTIONE DELLA PARTITA ----//
//

// Funzione per controllare se entrambi i giocatori sono pronti e INIZIA LA PARTITA
function checkBothPlayersReady() {
    if (window.player1Ready && window.player2Ready) {
        startGame();
    }
}

// Funzione che gestisce il bottone pronto del giocatore 1
function handleButtonP1(){
    if (window.player1Ready) {
            window.player1Ready = false;
            document.getElementById('top-player1').style.background = "var(--button_color)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player1Ready = true;
            document.getElementById('top-player1').style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
}

// Funzione che gestisce il bottone pronto del giocatore 2
function handleButtonP2(){
    if (window.player2Ready) {
            window.player2Ready = false;
            document.getElementById('top-player2').style.background = "var(--button_color)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player2Ready = true;
            document.getElementById('top-player2').style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
}

//Funzione per iniziare la preparazione del draft
async function startDraft(){

    scrollToGameContainer();
    
    // Aggiungo il listener per il click sul game container
    document.querySelector('.game-container').addEventListener('click', function(event) {
        if (!window.gamecontainer_centered) {
            scrollToGameContainer();
        }
    });

    disabilitaPedine();

    // ELEMENTI DA NASCONDERE (bottoni pronto, gioca-button)
    makeHidden(document.querySelector('.gioca-button'));
    document.getElementById('player1button').classList.add('hidden');
    document.getElementById('player2button').classList.add('hidden');
    makeHidden(document.getElementById('logout-button'));
    
    // ELEMENTI DA MOSTRARE (sezioni, overlay, switch, pedine, tasto restart draft, tutorial button)
    makeVisible(document.querySelector('.background-overlay'));
    makeVisible(document.getElementById('restart-draft-button'));
    makeVisible(document.querySelector('.sezione-dx'));
    makeVisible(document.querySelector('.sezione-sx'));
    makeVisible(document.querySelector('.restart-draft'));
    makeVisible(document.querySelector('.switch'));
    makeVisible(document.getElementById('tutorialButton'));
    document.querySelectorAll('.pedina').forEach(pedina => {
            makeVisible(pedina); // Rende visibili le pedine
    });

    //Gestione funzione per draft da DB

    await creaListeCalciatori(); // Popola l'array di calciatori
    await populateDraft("bianco");
    await populateDraft("nero");
    await dropSantini();

    // Gestione della visibilità dei vari elementi

    document.querySelector('.background').classList.remove('disabled');
    document.querySelector('.grid-container').classList.remove('disabled');
}

// Funzione per cambiare il draft
async function restartDraft(){

    //caso in cui fai logout prima di rigiocare il draft
    if(LS_getUser1Game().id == null || LS_getUser2Game().id == null){
        Swal.fire("Devi essere loggato per poter giocare");
        return;
    }
    
    if(document.getElementById('popup-restart-draft')) closeRestartDraftPopup();
    if(document.getElementById('popup-gameover')) closeEndgamePopup();
    
    //ELEMENTI DA MOSTRARE (sezioni, switch, tutorial button)
    makeVisible(document.querySelector('.sezione-dx'));
    makeVisible(document.querySelector('.sezione-sx'));
    makeVisible(document.getElementById('draft-table-dx'));
    makeVisible(document.getElementById('draft-table-sx'));
    makeVisible(document.getElementById('random1'));
    makeVisible(document.getElementById('random2'));
    makeVisible(document.querySelector('.switch'));
    makeVisible(document.getElementById('tutorialButton'));

    //ELEMENTI DA NASCONDERE (condition, progress-container, bottoni pronto, div promotion, tunnel)
    makeHidden(document.querySelector('.condition-container'));
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.tunnel-sx'));
    makeHidden(document.querySelector('.tunnel-dx'));
    document.getElementById('player1button').classList.add('hidden');
    document.getElementById('player2button').classList.add('hidden');
    if(document.getElementById('div-ped-promotion')) document.getElementById('div-ped-promotion').remove();
    
    //RESET ELEMENTI DEL DRAFT
    window.dragged_class_calciatore_bianco = null; 
    window.dragged_class_calciatore_nero = null;
    document.querySelectorAll('.riga-oro-sx, .riga-oro-dx').forEach(riga => {
        riga.classList.remove('riga-oro-sx');
        riga.classList.remove('riga-oro-dx');
    });
    

    resetSottoscacco();
    cambioTurno();
    resetSottoscacco();
    resetProntoButton();
    resetSuggerimenti();
    if(window.selected_cell) resetHighlighted();
    
    //avvio il draft
    window.game_started = false;
    window.turno_bianco = true;

    document.querySelector('.grid-container').classList.remove('grid-container-enlarged');

    disabilitaPedine();
    resetPedine();  //riposiziono le pedine nelle posizioni iniziali
    resetTimers();  //resetto il timer
    freezeTimer();

    document.querySelector(".game-container").classList.remove('game-not-started');
    
    //Gestione funzione per draft da DB
    
    await creaListeCalciatori();
    await populateDraft("bianco");
    await populateDraft("nero");
    await dropSantini();

    if(document.getElementById('toggle').checked) document.getElementById('toggle').checked = !document.getElementById('toggle').checked;
    updateText(document.getElementById('toggle').checked);
}

// Funzione per avviare il gioco
function startGame() {

    // ELEMENTI DA MOSTRARE (condizione, progress, restartButton)
    makeVisible(document.querySelector('.condition-container'));
    makeVisible(document.querySelector('.progress-container'));
    makeVisible(document.querySelector('.tunnel-sx'));
    makeVisible(document.querySelector('.tunnel-dx'));

    // ELEMENTI DA NASCONDERE (sezioni, switch)
    makeHidden(document.querySelector('.sezione-dx'));
    makeHidden(document.querySelector('.sezione-sx'));
    makeHidden(document.querySelector('.switch'));

    //Riaggiorno posizioni re
    window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
    window.idCellReNero = "03"; //id della cella su cui c'è il re nero

    window.game_started = true;
    window.turno_bianco = true; // Reset del turno al bianco

    // Ridimensione la scacchiera
    const grid_container = document.querySelector('.grid-container');
    if (grid_container) {
        grid_container.classList.add('grid-container-enlarged');
    }

    // Rimuove la classe che disabilita l'hover
    document.querySelector('.game-container').classList.remove('game-not-started');

    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.remove('game-not-started');
    });
   
    //PEDINE

    // Aggiunge la classe active a tutte le pedine
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('pedina-active');
    });
    
    // Abilita il movimento delle pedine
    abilitaPedine();
    window.canMovePiece = function(pieceId) {
        return window.game_started && window.turno_bianco === (pieceId.toLowerCase() === pieceId);
    };
    aggiornaStatoPedine();
    

    // Reset dei timer e avvio
    resetTimers();
    startTimer();

}

// Funzione per terminare la partita
function endGame(){

    let vincitore = window.turno_bianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
    aggiornaStatistiche();  //aggiorna punti, partite e vittorie

    window.game_started = false;
    freezeTimer();
    cambioTurno();
    
    resetSottoscacco();

    launchEndgamePopup(vincitore);
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.condition-container'));
    makeHidden(document.getElementById('tutorialButton'));
    makeVisible(document.getElementById('logout-button'));
    document.querySelector('.game-container').classList.add('game-not-started');

    window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
    window.idCellReNero = "03"; //id della cella su cui c'è il re nero
    window.cellaReBianco = document.getElementById(window.idCellReBianco);
    window.cellaReNero = document.getElementById(window.idCellReNero);
    resetSottoscacco();
    if(document.getElementById('div-ped-promotion')) document.getElementById('div-ped-promotion').remove();

    playSound('fischio_finale', 0.2);

}

// Funzione per tornare alla home
function goHome(){
    
    makeHidden(document.getElementById('popup-gameover'));
    
    window.location.href = 'index.html';
}