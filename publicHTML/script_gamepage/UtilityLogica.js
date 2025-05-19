// ---- VARIABILI IMPORTANTI PER LA GESTIONE DEL GIOCO ---- //

window.selected_element = null; // div pezzo selezionato
window.selected_cell = null;  // Memorizza la cella selezionata
window.selected_image = null;  // Memorizza l'immagine selezionata

window.turno_bianco = true; // Supponiamo che il bianco inizi per primo
window.game_started = false; // Controlla se il gioco è iniziato

//
// ---- FUNZIONI AUSILIARIE PER LE PEDINE ---- //
//

// Funzione per verificare se una pedina può essere mossa in quel turno
function canMovePiece(pieceId) {
    // Se è turno del bianco (true), può muovere solo pedine maiuscole (bianche)
    if (window.turno_bianco) {
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
            if (areSameColor(div_pezzo.id, pedinaBersaglio.id)) {  //old param (window.selected_element.id, pedinaBersaglio.parentElement.id
                return false; // Non permettere la mossa se le pedine sono dello stesso colore
            }
        }

    return valid;
}

// Funzione per spostare una pedina
function avanza(cella_dest){
    cella_dest.appendChild(window.selected_element); //SPOSTAMENTO PEDINA
    update_re_position(window.selected_image, cella_dest); //aggiorna la posizione del re
    highlight_re_if_sottoscacco();      //controlla se dopo la mossa corrente mette sottoscacco il re dell'AVVERSARIO (LOGICA INV) 
}

// Funzione per cambiare turno
function cambioTurno(){
    window.turno_bianco = !window.turno_bianco;
    aggiornaStatoPedine();
    updateCondition();
    resetSuggerimenti();        //resetta la selezione delle mosse suggerite

}

// Funzione per attivare l'hover delle pedine spostabili nel turno
function aggiornaStatoPedine() {
    document.querySelectorAll(".pedina").forEach(pedina => {
        if ((window.turno_bianco && pedina.id.toLowerCase() === pedina.id) ||       //se è minuscolo la pedina è bianca
            (!window.turno_bianco && pedina.id.toUpperCase() === pedina.id)) {      //se è maiuscolo la pedina è nera
            pedina.classList.remove("no-hover");
            pedina.style.cursor = 'pointer';
        } else {
            pedina.classList.add("no-hover");
            pedina.style.cursor = 'default';
        }
    });

    // Aggiorna l'effetto di brillantezza della scacchiera
    const scacchiera = document.querySelector('.scacchiera');
    if (!window.turno_bianco) {  // Se NON è il turno del nero, significa che è il turno del bianco
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

// Funzione per ripristinare le posizioni delle pedine
function resetPedine(){
    // Rimuove tutte le pedine esistenti
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.remove();
    });
    resetNumCelleRe();

    // Riposiziona le pedine usando la funzione esistente
    StartPosition();

    // Aggiorna lo stato delle pedine solo se il gioco è iniziato
    if (window.game_started) {
        aggiornaStatoPedine();
    } else {
        // In modalità draft, disabilita l'hover per tutte le pedine
        document.querySelectorAll('.pedina').forEach(pedina => {
            pedina.classList.add('no-hover');
            pedina.style.cursor = 'default';
        });
    }
}

// Funzione per riportare i bottoni allo stato iniziale
function resetProntoButton() {

    //reimposto lo stato
    window.player1Ready = false;
    window.player2Ready = false;

    //reimposto il colore
    document.getElementById('top_player1').style.background = "var(--button_color)";
    document.getElementById('top_player2').style.background = "var(--button_color)";
}

