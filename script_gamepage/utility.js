// ---- VARIABILI IMPORTANTI PER LA GESTIONE DEL GIOCO ---- //

window.selectedElement = null; // div pezzo selezionato
window.selectedCell = null;  // Memorizza la cella selezionata
window.selectedImage = null;  // Memorizza l'immagine selezionata
window.turnoBianco = true; // Supponiamo che il bianco inizi per primo
window.gameStarted = false; // Controlla se il gioco è iniziato




//
// ---- FUNZIONI AUSILIARIE PER LE PEDINE ---- //
//

// Funzione per verificare se una pedina può essere mossa in quel turno
function canMovePiece(pieceId) {
    // Se è turno del bianco (true), può muovere solo pedine maiuscole (bianche)
    if (window.turnoBianco) {
        return pieceId === pieceId.toUpperCase();
    }
    // Se è turno del nero (false), può muovere solo pedine minuscole (nere)
    return pieceId === pieceId.toLowerCase();
}

// Funzione per verificare se due pedine sono dello stesso colore
function areSameColor(piece1Id, piece2Id) {
   return (piece1Id.toUpperCase() === piece1Id) === (piece2Id.toUpperCase() === piece2Id);
}

// Funzione di supporto per verificare se ci sono pedine nel percorso
function checkPathClear(start_x, start_y, end_x, end_y) {
    let dx = end_x - start_x;
    let dy = end_y - start_y;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    // Calcola la direzione del movimento
    let step_x = dx === 0 ? 0 : dx / Math.abs(dx);
    let step_y = dy === 0 ? 0 : dy / Math.abs(dy);
    
    // Controlla ogni casella nel percorso
    for (let i = 1; i < steps; i++) {
        let check_x = start_x + (i * step_x);
        let check_y = start_y + (i * step_y);
        let check_cell = document.getElementById(check_x + "" + check_y);
        
        // Se la cella contiene una pedina, il percorso non è libero e ritorna false
        if (check_cell && check_cell.querySelector('.pedina')) {
            return false;
        }
    }
    //se non ci sono pedine nel percorso ritorna true
    return true;
}

// Funzione per verifcare se la mossa è valida
function validationMove(img, dest_cell){
    let valid = false; // Inizialmente la mossa non è valida

    let div_pezzo = img.parentElement; //variabile per il pezzo selezionato
    let td_cell = div_pezzo.parentElement; //variabile per la cella selezionata

    if(div_pezzo.id=='P' || div_pezzo.id=='p'){
        // Determina la direzione del movimento in base al colore del pedone
        let curr_x = parseInt(td_cell.id[0]);           //posizione iniziale x
        let curr_y = parseInt(td_cell.id[1]);           //posizione iniziale y
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Calcola la direzione del movimento (1 per nero, -1 per bianco)
        let direction = (div_pezzo.id == 'p') ? -1 : 1;
        let forward_x = curr_x + direction;

        // Movimento in verticale (senza cattura)
        if (dest_cell_x == forward_x && dest_cell_y == curr_y){
            // Il movimento in verticale è valido solo se la cella di destinazione è vuota
            valid = !dest_cell.querySelector('.pedina');
        }
        // Movimento in diagonale (con cattura)
        if (dest_cell_x == forward_x && Math.abs(dest_cell_y - curr_y) == 1){
            // La cattura è valida solo se c'è una pedina avversaria
            let pedinaBersaglio = dest_cell.querySelector('.pedina');
            if(pedinaBersaglio && pedinaBersaglio.parentElement){
                // Verifica che la pedina sia del colore opposto
                valid = !areSameColor(div_pezzo.id, pedinaBersaglio.id);
            }
        }
        //promozione pedone quando arriva in fondo
            //bianco arriva in cima
       
    }

    if(div_pezzo.id=='t' || div_pezzo.id=='T'){
        let start_cell_x = parseInt(td_cell.id[0]);
        let start_cell_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(dest_cell_x==start_cell_x || dest_cell_y==start_cell_y) {
            // Verifica che il percorso sia libero
            valid = checkPathClear(start_cell_x, start_cell_y, dest_cell_x, dest_cell_y);
        }
    }

    if(div_pezzo.id=='a' || div_pezzo.id=='A'){
        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(Math.abs(dest_cell_x-curr_x) == Math.abs(dest_cell_y-curr_y)) {
            // Verifica che il percorso sia libero
            valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
        }
    }

    if(div_pezzo.id=='c' || div_pezzo.id=='C'){
        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il cavallo può saltare, quindi non serve controllare il percorso
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        valid = (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }

    if(div_pezzo.id=='q' || div_pezzo.id=='Q'){
        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // La regina si muove come torre o alfiere
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (dx === 0 || dy === 0 || dx === dy) {
            // Verifica che il percorso sia libero
            valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
        }
    }

    if(div_pezzo.id=='r' || div_pezzo.id=='R'){
        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il re si muove di una casella in qualsiasi direzione
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        valid = dx <= 1 && dy <= 1;
    }
    let pedinaBersaglio = dest_cell.querySelector('.pedina');  //pedina contenuta nella cella di destinazione
        // IMPORTANTE: Se c'è una pedina nella cella di destinazione, verifica che non sia dello stesso colore
        if (pedinaBersaglio && pedinaBersaglio.parentElement) {
            if (areSameColor(div_pezzo.id, pedinaBersaglio.id)) {  //old param (window.selectedElement.id, pedinaBersaglio.parentElement.id
                return false; // Non permettere la mossa se le pedine sono dello stesso colore
            }
        }

    return valid;
}

// Funzione per cambiare turno
function cambioTurno(){
    resetTimer();
    window.turnoBianco = !window.turnoBianco;
    aggiornaStatoPedine();
    updateCondition();
}

//promuove il pedone se arriva in fondo 
/*
* STILL TO_DO : chiedere ad utente il tipo di pezzo per promozione
*/
function upgrade_pedone(img_pedina, cella_dest){
    let cur_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(cur_row == 0){
            //utente seleziona il nuovo
            tipo = 'regina'
            //modifica il div con un nuovo pezzo
            div_pedina.id = pezzi[tipo].id.bianco ;
            img_pedina.src = pezzi[tipo].img.bianco;
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(cur_row == 5){
             //utente seleziona il nuovo
             tipo = 'regina'
             //modifica il div con un nuovo pezzo
             div_pedina.id = pezzi[tipo].id.nero ;
             img_pedina.src = pezzi[tipo].img.nero;
        } 
    }
}

// Funzione per attivare l'hover delle pedine spostabili nel turno
function aggiornaStatoPedine() {
    document.querySelectorAll(".pedina").forEach(pedina => {
        if ((window.turnoBianco && pedina.id.toLowerCase() === pedina.id) ||       //se è minuscolo la pedina è bianca
            (!window.turnoBianco && pedina.id.toUpperCase() === pedina.id)) {      //se è maiuscolo la pedina è nera
            pedina.classList.remove("no-hover");
            pedina.style.cursor = 'pointer';
        } else {
            pedina.classList.add("no-hover");
            pedina.style.cursor = 'default';
        }
    });

    // Aggiorna l'effetto di brillantezza della scacchiera
    const scacchiera = document.querySelector('.scacchiera');
    if (!window.turnoBianco) {  // Se NON è il turno del nero, significa che è il turno del bianco
        scacchiera.classList.remove('turno-nero');
        scacchiera.classList.add('turno-bianco');
    } else {  // Se è il turno del nero
        scacchiera.classList.remove('turno-bianco');
        scacchiera.classList.add('turno-nero');
    }

    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.style.cursor = 'pointer';
    });
}

// Funzione per evidenziare le caselle disponibili
function SuggerisciMosse() {
    // Rimuovi eventuali evidenziazioni precedenti
    let startCell = window.selectedElement.parentElement;  //cella di partenza

    // Controlla tutte le caselle della scacchiera 6x6
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 6; y++) {
            
            let targetCell = document.getElementById(x + "" + y);
            let pedinaBersaglio = targetCell.querySelector('.pedina');
            if (targetCell && targetCell !== startCell) {
                // Verifica se la mossa è valida
                if (validationMove(window.selectedImage, targetCell)) {
                    if(targetCell.hasChildNodes() && pedinaBersaglio){
                        targetCell.classList.add('eating-move');
                    }
                    else{
                        targetCell.classList.add('available-move');
                    }
                    targetCell.classList.add('available-move');
                }
            }
        }
    }
}

// Funzione per ripristinare le posizioni delle pedine
function resetPedine(){
    // Rimuove tutte le pedine esistenti
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.remove();
    });

    // Riposiziona le pedine usando la funzione esistente
    posizion_iniziali();

    // Aggiorna lo stato delle pedine
    aggiornaStatoPedine();
}

function resetProntoButton() {

    //reimposto lo stato
    window.player1Ready = false;
    window.player2Ready = false;

    //reimposto il colore
    document.getElementById('player1button').style.color = "black";
    document.getElementById('player2button').style.color = "white";
}



//
// ---- FUNZIONI AUSILIARIE PER LA GRAFICA ---- //
//

// Funzione per resettare i suggerimenti
function resetSuggerimenti(){
    document.querySelectorAll('.available-move').forEach(cell => {
        cell.classList.remove('available-move');
    });
    document.querySelectorAll('.eating-move').forEach(cell => {
        cell.classList.remove('eating-move');
    });
}

// Funzione per evidenziare la cella selezionata
function addHighlighted(){
    window.selectedCell.classList.add("highlighted");
}

// Funzione per resettare l'evidenziazione della cella selezionata
function resetHighlighted(){
    window.selectedCell.classList.remove("highlighted");
}

// Funzione per resettare la selezione degli elementi image,element,cell
function resetSelezione(){
    window.selectedElement = null;
    window.selectedCell = null;
    window.selectedImage = null;
}

// Funzione per rendere visibile un elemento con animazione
function makeVisible(element) {
    if (!element) return;
    
    // Rimuovi la classe hidden se presente
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
    
    // Salva lo stile di display originale se non è già stato salvato
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }
    
    // Imposta l'opacità a 0 e il display al valore originale
    element.style.opacity = '0';
    element.style.display = element.dataset.originalDisplay;
    
    // Forza un reflow per avviare l'animazione
    element.offsetHeight;
    
    // Anima l'opacità
    element.style.transition = 'opacity 0.8s ease';
    element.style.opacity = '1';
}

// Funzione per nascondere un elemento con animazione
function makeHidden(element) {
    if (!element) return;
    
    // Salva lo stile di display originale se non è già stato salvato
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }
    
    // Anima l'opacità
    element.style.transition = 'opacity 0.8s ease';
    element.style.opacity = '0';
    
    // Dopo l'animazione, imposta display a none
    setTimeout(() => {
        element.style.display = 'none';
    }, 800);
}

// Funzione per scrollare la pagina verso il game container
function scrollToGameContainer(){
    const gameContainer = document.querySelector('.game-container');
    setTimeout(() => {
        const startPosition = window.pageYOffset;
        const endPosition = gameContainer.offsetTop - (window.innerHeight - gameContainer.offsetHeight) / 2;
        const distance = endPosition - startPosition;
        const duration = 1000; // 1 secondo
        let startTime = null;

        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Funzione di easing per un movimento più naturale
            const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const currentPosition = startPosition + (distance * easeInOutCubic(percentage));
            
            window.scrollTo(0, currentPosition);
            
            if (progress < duration) {
                window.requestAnimationFrame(scrollStep);
            }
        }

        window.requestAnimationFrame(scrollStep);
    }, 10); // Piccolo ritardo prima di iniziare lo scroll
}





// 
//---- FUNZIONI PER LA GESTIONE DELLA PARTITA ----//
// 

//Funzione per iniziare la preparazione del draft
function startDraft(){
    makeHidden(document.querySelector('.gioca-button'));
    makeVisible(document.querySelector('.table_draft_dx'));
    makeVisible(document.querySelector('.table_draft_sx'));

    document.querySelector('.background').classList.remove('disabled');
    document.querySelector('.grid-container').classList.remove('disabled');
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.style.cursor = 'default';
    });
    
}

// Funzione per avviare il gioco
function startGame() {
    window.gameStarted = true;
    window.turnoBianco = true; // Reset del turno al bianco
    aggiornaStatoPedine();
    
    // Disabilita il drag and drop
    if (window.disableDragDrop) {
        window.disableDragDrop();
    }
    
    // Ingrandisci la scacchiera
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.classList.add('grid-container-enlarged');
    }

    // Gestione della visibilità dei vari elementi
    
    makeVisible(document.querySelector('.condition-container'));
    makeVisible(document.querySelector('.timer-text'));
    makeVisible(document.querySelector('.progress-container'));
    makeVisible(document.querySelector('.progress-bar'));
    makeHidden(document.querySelector('.table_draft_sx'));
    makeHidden(document.querySelector('.table_draft_dx'));

    
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
    
    startTimer();
}

// Funzione per terminare la partita
function endGame(){
    window.gameStarted = false;
    freezeTimer();
    makeVisible(document.querySelector('.game-over'));
    makeHidden(document.querySelector('.progress-container'));
    makeHidden(document.querySelector('.condition-container'));
    document.querySelector('.game-container').classList.add('game-not-started');
}

// Funzione per rigiocare la partita
function restartGame() {
    resetSottoscacco();
    resetPedine();
    window.gameStarted = false; // Reset dello stato del gioco
    
    makeHidden(document.querySelector('.game-over'));
    document.querySelector('.game-container').classList.remove('game-not-started');
    aggiornaStatoPedine();
    startGame();
}

// Funzione per cambiare il draft
function restartDraft(){
    //avvio il draft
    startDraft();

    //riposiziono le pedine nelle posizioni iniziali
    resetPedine();

    // nascondo il pop up del game over
    const popUp = document.querySelector('.game-over');
    makeHidden(popUp);

    //resetto il colore delle celle
    resetSottoscacco();

    //resetto i bottoni pronto
    resetProntoButton();
}

// Funzione per tornare alla home
function goHome(){
    window.location.href = 'index.html';
}

// Funzione per gestire il ripristino della pagina
function inizializzaPagina() {
    window.location.reload();
}


