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
            document.getElementById('top_player1').style.background = "var(--button_color)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player1Ready = true;
            document.getElementById('top_player1').style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
}

// Funzione che gestisce il bottone pronto del giocatore 2
function handleButtonP2(){
    if (window.player2Ready) {
            window.player2Ready = false;
            document.getElementById('top_player2').style.background = "var(--button_color)";
        } else {
            // Se il giocatore non era pronto, imposta come pronto
            window.player2Ready = true;
            document.getElementById('top_player2').style.background = "linear-gradient(to right, #44c300, #027a16)";
            checkBothPlayersReady();
        }
}

//Funzione per iniziare la preparazione del draft
async function startDraft(){

    // ELEMENTI DA NASCONDERE (bottoni pronto, giocaButton)
    makeHidden(document.querySelector('.gioca-button'));
    document.getElementById('player1button').classList.add('hidden');
    document.getElementById('player2button').classList.add('hidden');
    
    // ELEMENTI DA MOSTRARE (sezioni, overlay, switch, pedine)
    makeVisible(document.querySelector('.background-overlay'));
    makeVisible(document.querySelector('.sezione_dx'));
    makeVisible(document.querySelector('.sezione_sx'));
    makeVisible(document.querySelector('.restart-draft'));
    makeVisible(document.querySelector('.switch'));
    document.querySelectorAll('.pedina').forEach(pedina => {
            makeVisible(pedina); // Rende visibili le pedine
    });

    //Gestione funzione per draft da DB

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

    // ELEMENTI DA MOSTRARE (condizione, progress, restartButton)
    makeVisible(document.querySelector('.condition-container'));
    makeVisible(document.querySelector('.progress-container'));

    // ELEMENTI DA NASCONDERE (sezioni, switch)
    makeHidden(document.querySelector('.sezione_dx'));
    makeHidden(document.querySelector('.sezione_sx'));
    makeHidden(document.querySelector('.switch'));

    //Riaggiorno posizioni re
    window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
    window.idCellReNero = "03"; //id della cella su cui c'è il re nero

    window.gameStarted = true;
    window.turnoBianco = true; // Reset del turno al bianco

    // Ridimensione la scacchiera
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.classList.add('grid-container-enlarged');
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
    window.canMovePiece = function(pieceId) {
        return window.gameStarted && window.turnoBianco === (pieceId.toLowerCase() === pieceId);
    };
    aggiornaStatoPedine();

    // Reset dei timer e avvio
    resetTimers();
    startTimer();
}

// Funzione per terminare la partita
function endGame(){

    //PARTE DEL PUNTEGGIO
    let vincitore = window.turnoBianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
    let id_vincitore = window.turnoBianco ? localStorage.getItem('game_userId1') : localStorage.getItem('game_userId2');
    let punti = window.turnoBianco ? localStorage.getItem('game_user_point1') : localStorage.getItem('game_user_point2');
    let new_punti = parseInt(punti) + 20;

    //incrementa punti del vincitore
    aggiornaPunti(id_vincitore, new_punti);
    update_LS_winner(id_vincitore, vincitore, new_punti);

    window.gameStarted = false;
    freezeTimer();
    cambioTurno();
    
    resetSottoscacco();

    launchEndgameSwal();
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.condition-container'));
    document.querySelector('.game-container').classList.add('game-not-started');

    window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
    window.idCellReNero = "03"; //id della cella su cui c'è il re nero
    window.cellaReBianco = document.getElementById(window.idCellReBianco);
    window.cellaReNero = document.getElementById(window.idCellReNero);
    resetSottoscacco();

}


//@deprecated

// Funzione per rigiocare la partita
// function restartGame() { 
//     resetNumCelleRe();
//     resetColoreSottoscacco();
//     resetPedine();
//     window.gameStarted = false; // Reset dello stato del gioco

//     //makeHidden(document.querySelector('.game-over'));
//     document.querySelector('.game-container').classList.remove('game-not-started');
//     aggiornaStatoPedine();
//     startGame();
// }

// Funzione per cambiare il draft
async function restartDraft(){
    
    scrollToGameContainer();
    
    //ELEMENTI DA MOSTRARE (sezioni, switch)
    makeVisible(document.querySelector('.sezione_dx'));
    makeVisible(document.querySelector('.sezione_sx'));
    makeVisible(document.getElementById('draft_table_dx'));
    makeVisible(document.getElementById('draft_table_sx'));
    makeVisible(document.getElementById('random1'));
    makeVisible(document.getElementById('random2'));

    //ELEMENTI DA NASCONDERE (condition, progress-container, bottoni pronto)
    makeHidden(document.querySelector('.condition-container'));
    makeHidden(document.querySelector('.progress-container'));
    document.getElementById('player1button').classList.add('hidden');
    document.getElementById('player2button').classList.add('hidden');

    resetSottoscacco();
    resetProntoButton();
    
    //avvio il draft
    window.gameStarted = false;
    window.turnoBianco = true;

    document.querySelector('.grid-container').classList.remove('grid-container-enlarged');

    disabilitaPedine();
    resetPedine();  //riposiziono le pedine nelle posizioni iniziali
    resetTimers();  //resetto il timer

    document.querySelector(".game-container").classList.remove('game-not-started');
    
    //Gestione funzione per draft da DB

    await CreaListeCalciatori();        // Popola l'array di calciatori
    await populateDraft("bianco");
    await populateDraft("nero");
    await DragDrop_draft();
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

async function aggiornaPunti(userid, new_punti) {
  try {
    const response = await fetch('/update_punti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid, new_punti })
    });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei punti:', error);
  }
}

function update_LS_winner(id, name, pti){
    if (window.turnoBianco)
            LS_login1Game(id,name,pti);

    else LS_login2Game(id,name,pti);
  
}