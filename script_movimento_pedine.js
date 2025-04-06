// Variabili globali per la gestione del gioco
window.selectedElement = null;
window.selectedCell = null;  // Memorizza la cella selezionata
window.selectedImage = null;  // Memorizza l'immagine selezionata
window.turnoBianco = true; // Supponiamo che il bianco inizi per primo

// Funzione per verificare se una pedina può essere mossa in quel turno

// ---- IMPORTANTE ---- //

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

function validationMove(elem,dest_cell){

    let valid = true; //booleano che decide se la mossa sia valida o meno secondo le regole

    let div_pezzo = elem.parentElement; //variabile per il pezzo selezionato
    let td_cell = div_pezzo.parentElement; //variabile per la cella selezionata

    if(div_pezzo.id=='P' || div_pezzo.id=='p'){
        // Determina la direzione del movimento in base al colore del pedone
        let curr_x = parseInt(td_cell.id[0]);           //posizione iniziale x
        let curr_y = parseInt(td_cell.id[1]);           //posizione iniziale y
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Calcola la direzione del movimento (-1 per nero, +1 per bianco)
        let direction = (div_pezzo.id == 'p') ? -1 : 1;
        let forward_x = curr_x + direction;

        // Movimento in verticale (senza cattura)
        if (dest_cell_x == forward_x && dest_cell_y == curr_y){
            // Il movimento in verticale è valido solo se la cella di destinazione è vuota
            valid = !dest_cell.querySelector('.pedina');
        }
        // Movimento in diagonale (con cattura)
        else if (dest_cell_x == forward_x && Math.abs(dest_cell_y - curr_y) == 1){
            // La cattura è valida solo se c'è una pedina avversaria
            let pedinaBersaglio = dest_cell.querySelector('.pedina');
            if(pedinaBersaglio && pedinaBersaglio.parentElement){
                // Verifica che la pedina sia del colore opposto
                valid = !areSameColor(div_pezzo.id, pedinaBersaglio.parentElement.id);
            } else {
                valid = false;
            }
        }
        else valid = false;
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
        else valid = false;
    }

    if(div_pezzo.id=='a' || div_pezzo.id=='A'){

        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(Math.abs(dest_cell_x-curr_x) != Math.abs(dest_cell_y-curr_y)) return false;
        
        // Verifica che il percorso sia libero
        valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
    }

    if(div_pezzo.id=='c' || div_pezzo.id=='C'){

        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il cavallo può saltare, quindi non serve controllare il percorso
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (!((dx === 2 && dy === 1) || (dx === 1 && dy === 2))) return false;
    }

    if(div_pezzo.id=='q' || div_pezzo.id=='Q'){

        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // La regina si muove come torre o alfiere
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (!(dx === 0 || dy === 0 || dx === dy)) return false;
        
        // Verifica che il percorso sia libero
        valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
    }

    if(div_pezzo.id=='r' || div_pezzo.id=='R'){

        let curr_x = parseInt(td_cell.id[0]);
        let curr_y = parseInt(td_cell.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il re si muove di una casella in qualsiasi direzione e non serve controllare il percorso
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (dx > 1 || dy > 1) return false;
    }

    return valid;
}

function aggiornaStatoPedine() {
    document.querySelectorAll(".pedina").forEach(pedina => {
        if ((window.turnoBianco && pedina.id.toLowerCase() === pedina.id) ||       //se è minuscolo la pedina è nera
            (!window.turnoBianco && pedina.id.toUpperCase() === pedina.id)) {      //se è maiuscolo la pedina è bianca
            pedina.classList.remove("no-hover");
        } else {
            pedina.classList.add("no-hover");
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
}

/*
*    LISTENER PER MUOVERE LE PEDINE:
*           1. seleziona il pezzo che voglio muovere 
*           2. seleziona la cella di destinazione dove voglio spostare il pezzo -> se valida -> sposta il pezzo in quella cella
*/

// Aggiungi un event listener per selezionare la pedina
document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
    pedina.addEventListener("click", function(event) {
        event.stopPropagation(); // Impedisce che l'evento si propaghi alla cella

        // Se clicchiamo sulla stessa pedina già selezionata, deseleziona tutto
        if (window.selectedImage === event.target) {
            window.selectedCell.classList.remove("highlighted");
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
            return;
        }

        // Rimuovi l'evidenziazione precedente se presente
        if (window.selectedCell) {
            window.selectedCell.classList.remove("highlighted");
        }

        // Seleziona l'elemento (pedina) da spostare
        window.selectedImage = event.target;
        window.selectedElement = window.selectedImage.parentElement;
        window.selectedCell = window.selectedElement.parentElement;

        // Verifica se è il turno corretto per muovere questa pedina
        if (!canMovePiece(window.selectedElement.id)) {
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
            return;
        }

        // Evidenzia la cella sorgente
        window.selectedCell.classList.add("highlighted");
    });
});

// Aggiungi un event listener per le celle per gestire il click di destinazione
document.querySelectorAll(".greencell, .creamcell").forEach(cell => {
    cell.addEventListener("click", function(event) {
        if (window.selectedElement && this.tagName === "TD") {
            let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione
            
            // IMPORTANTE: Se c'è una pedina nella cella di destinazione, verifica che non sia dello stesso colore
            if (pedinaBersaglio && pedinaBersaglio.parentElement) {
                if (areSameColor(window.selectedElement.id, pedinaBersaglio.parentElement.id)) {
                    return; // Non permettere la mossa se le pedine sono dello stesso colore
                }
            }

            // Verifica se la mossa è valida secondo le regole degli scacchi
            if (validationMove(window.selectedImage, this)) {
                if(this.hasChildNodes() && pedinaBersaglio){    //se la cella di destinazione ha già una pedina,
                    this.removeChild(pedinaBersaglio);          //la rimuovo
                }
                this.appendChild(window.selectedElement);
                resetTimer();
                
                window.turnoBianco = !window.turnoBianco;
                window.aggiornaStatoPedine();
                updateCondition();
            }

            // Resetta la selezione
            window.selectedElement = null;
            window.selectedImage = null;
            if (window.selectedCell) {
                window.selectedCell.classList.remove("highlighted");
                window.selectedCell = null;
            }
        }
    });
});

// Inizializza lo stato delle pedine all'avvio
window.aggiornaStatoPedine();

