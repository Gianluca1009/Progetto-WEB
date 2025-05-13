//
//---- FUNZIONI PER LA GESTIONE DELLA PARTITA ----//
//

// Funzione per controllare se entrambi i giocatori sono pronti
function checkBothPlayersReady() {
    if (window.player1Ready && window.player2Ready) {
        startGame();
    }
}

//Funzione per iniziare la preparazione del draft
async function startDraft(){
    makeHidden(document.querySelector('.gioca-button'));
    makeVisible(document.querySelector('.background-overlay'));
    makeVisible(document.querySelector('.sezione_dx'));
    makeVisible(document.querySelector('.sezione_sx'));
    makeVisible(document.querySelector('.restart-draft'));
    makeVisible(document.querySelector('.populate-random-both-container'));
    makeVisible(document.querySelector('.switch'));

    await CreaListeCalciatori(); // Popola l'array di calciatori
    await populateDraft("bianco");
    await populateDraft("nero");
    await DragDrop_draft();

    // Gestione della visibilità dei vari elementi

    document.querySelector('.background').classList.remove('disabled');
    document.querySelector('.grid-container').classList.remove('disabled');
}

// Funzione per avviare il gioco
function startGame() {
    window.gameStarted = true;
    window.turnoBianco = true; // Reset del turno al bianco
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.remove('game-not-started');
    });
    aggiornaStatoPedine();

    // Ingrandisci la scacchiera
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.classList.add('grid-container-enlarged');
    }
    makeHidden(document.querySelector('.switch'));

    // Gestione della visibilità dei vari elementi

    makeVisible(document.querySelector('.condition-container'));
    makeVisible(document.querySelector('.timer-text'));
    makeVisible(document.querySelector('.progress-container'));
    makeVisible(document.querySelector('.progress-bar'));
    makeVisible(document.getElementById('restartButton'));

    makeHidden(document.querySelector('.sezione_sx'));
    makeHidden(document.querySelector('.sezione_dx'));
    makeHidden(document.querySelector('.populate-random-both-container'));



    // Rimuove la classe che disabilita l'hover
    document.querySelector('.game-container').classList.remove('game-not-started');

    // Aggiunge la classe active a tutte le pedine
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('pedina-active');
    });

    // Abilita il movimento delle pedine
    window.canMovePiece = function(pieceId) {
        return window.gameStarted && window.turnoBianco === (pieceId.toLowerCase() === pieceId);
    };

    // Reset dei timer e avvio
    resetTimers();
    startTimer();
}

// Funzione per terminare la partita
function endGame(){
    window.gameStarted = false;
    freezeTimer();

    //makeVisible(document.querySelector('.game-over'));
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.condition-container'));
    document.querySelector('.game-container').classList.add('game-not-started');
}

// Funzione per rigiocare la partita
function restartGame() {
    resetNumCelleRe();
    resetColoreSottoscacco();
    resetPedine();
    window.gameStarted = false; // Reset dello stato del gioco

    //makeHidden(document.querySelector('.game-over'));
    document.querySelector('.game-container').classList.remove('game-not-started');
    aggiornaStatoPedine();
    startGame();
}

// Funzione per cambiare il draft
function restartDraft(){

    resetSottoscacco();

    //avvio il draft
    window.gameStarted = false;
    window.turnoBianco = true;

    //makeHidden(document.querySelector('.game-over'));
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.condition-container'));
    makeHidden(document.querySelector('.restart-button'));
    document.querySelector('.grid-container').classList.remove('grid-container-enlarged');
    makeVisible(document.getElementById('draft_table_dx'));
    makeVisible(document.getElementById('draft_table_sx'));
    makeVisible(document.getElementById('random1'));
    makeVisible(document.getElementById('random2'));
    document.getElementById('player1button').style.transform = "translateY(0) scale(1)";
    document.getElementById('player2button').style.transform = "translateY(0) scale(1)";

    disabilitaPedine();

    startDraft();

    //riposiziono le pedine nelle posizioni iniziali
    resetPedine();

    //resetto i bottoni pronto
    resetProntoButton();

    //resetto i timer
    resetTimers();

    document.querySelector(".game-container").classList.remove('game-not-started');
}

// Funzione per tornare alla home
function goHome(){
    window.location.href = 'index.html';
}

// Funzione che lancia il popup di fine partita
function launchEndgameSwal(){

    let vincitore = window.turnoBianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');

    Swal.fire({
        title: '',
        html: `
        <div>
            <p class="title-gameover"> PARTITA TERMINATA </p>
            <p class="text-gameover">Congratulazioni ${vincitore} <br> +20 pt!</p>
            <div class="bottoni-gameover-container">
                 
                <button id="restartDraftButtonAtEnd" class="button-gameover" onclick = "restartDraft(); Swal.close();">
                    <span class="button_top top-gameover"> DRAFT </span>
                </button>

                <button id="HomeButtonAtEnd" class="button-gameover" onclick = "goHome(); Swal.close();">
                    <span class="button_top"> HOME </span>
                </button>

            </div>
        </div>
        `,
        showConfirmButton: false,
        customClass: {
            popup: 'no-title-padding',
            htmlContainer: 'popup-gameover',
        },
        didOpen: () => {
            document.body.style.overflow = 'auto';
            const titleEl = document.querySelector('.swal2-title');
            if (titleEl) titleEl.remove();
        }
    });
}