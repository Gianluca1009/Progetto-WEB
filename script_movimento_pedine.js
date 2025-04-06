// Variabili globali per la gestione del gioco
window.selectedElement = null;
window.selectedCell = null;  // Memorizza la cella selezionata
window.selectedImage = null;  // Memorizza l'immagine selezionata
window.turnoBianco = true; // Supponiamo che il bianco inizi per primo

// Funzione per verificare se una pedina può essere mossa in quel turno

// ---- IMPORTANTE ---- //

function canMovePiece(pieceId) {
    return window.turnoBianco === (pieceId.toLowerCase() === pieceId);
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

        if(div_pezzo.id=='p'){
            var valid_cell_x = parseInt(td_cell.id[0])-1;  //x dello spostamento valido
        }
        if(div_pezzo.id=='P'){
            var valid_cell_x = parseInt(td_cell.id[0])+1;
        }
        let valid_cell_y = parseInt(td_cell.id[1]);    //y dello spostamento valido

        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if (dest_cell_x==valid_cell_x && dest_cell_y==valid_cell_y){
            // Verifica che non ci siano pedine nella cella di destinazione
            if (dest_cell.querySelector('.pedina')) {
                valid = false;
            } else {
                valid = true;
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
        // Se clicchiamo sulla stessa pedina già selezionata, deseleziona tutto
        if (window.selectedImage === event.target) {
            window.selectedCell.classList.remove("highlighted");
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
            return;  // Importante: esce dalla funzione dopo la deselezione
        }

        // Rimuovi l'evidenziazione precedente se presente
        if (window.selectedCell) {
            window.selectedCell.classList.remove("highlighted");
        }

        // Seleziona l'elemento (pedina) da spostare
        window.selectedImage = event.target; //immagine selezionata
        window.selectedElement = window.selectedImage.parentElement; //elemento selezionato (div)
        window.selectedCell = window.selectedElement.parentElement;  // Memorizza la cella sorgente (td)

        // Verifica se è il turno corretto per muovere questa pedina
        if (!window.canMovePiece(window.selectedElement.id)) {
            // Se non è il turno corretto, deseleziona tutto
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
            return;
        }
        
        // Evidenzia la cella sorgente in giallo
        window.selectedCell.classList.add("highlighted");
    });
});

// Aggiungi un event listener per le celle per gestire il click di destinazione
document.querySelectorAll(".greencell, .creamcell").forEach(cell => {
    cell.addEventListener("click", function(event) {
        if (window.selectedElement) {
            // Verifica che la cella cliccata non contenga già una pedina
            if (this.tagName === "TD" && !this.querySelector('.pedina')) {
                // Sposta la pedina nella cella cliccata
                if (validationMove(window.selectedImage, this)) {
                    this.appendChild(window.selectedElement);
                    resetTimer(); // Resetta il timer quando la mossa è valida
                    
                    // Cambia turno dopo una mossa valida
                    window.turnoBianco = !window.turnoBianco;
                    window.aggiornaStatoPedine();
                    updateCondition(); // Aggiorna la condizione quando cambia il turno
                }

                // Resetta l'elemento selezionato
                window.selectedElement = null;
                window.selectedImage = null;

                // Rimuovi l'evidenziazione dalla cella sorgente
                window.selectedCell.classList.remove("highlighted");
                window.selectedCell = null;
            }
        }
    });
});

// Inizializza lo stato delle pedine all'avvio
window.aggiornaStatoPedine();
