let selectedElement = null;
let selectedCell = null;  // Memorizza la cella selezionata
let selectedImage = null;  // Memorizza l'immagine selezionata

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

/*
*    LISTNER PER MUOVERE LE PEDINE:
*           1. seleziona il pezzo che voglio muovere 
*           2. seleziona la cella di destinazione dove voglio spostare il pezzo -> se valida -> sposta il pezzo in quella cella
*/

// Aggiungi un event listener per selezionare la pedina
document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
    pedina.addEventListener("click", function(event) {
        // Se clicchiamo sulla stessa pedina già selezionata, deseleziona tutto
        if (selectedImage === event.target) {
            selectedCell.classList.remove("highlighted");
            selectedElement = null;
            selectedCell = null;
            selectedImage = null;
            return;  // Importante: esce dalla funzione dopo la deselezione
        }

        // Rimuovi l'evidenziazione precedente se presente
        if (selectedCell) {
            selectedCell.classList.remove("highlighted");
        }

        // Seleziona l'elemento (pedina) da spostare
        selectedImage = event.target; //immagine
        selectedElement = selectedImage.parentElement;
        selectedCell = selectedElement.parentElement;  // Memorizza la cella sorgente
        
        // Evidenzia la cella sorgente in giallo
        selectedCell.classList.add("highlighted");
    });
});



// Aggiungi un event listener per le celle per gestire il click di destinazione
document.querySelectorAll(".greencell, .creamcell").forEach(cell => {
    cell.addEventListener("click", function(event) {
        if (selectedElement) {
            // Verifica che la cella cliccata non contenga già una pedina
            if (this.tagName === "TD" && !this.contains(selectedElement)) {
                // Sposta la pedina nella cella cliccata
                if(validationMove(selectedImage, this)) {
                    this.appendChild(selectedElement);
                    resetTimer(); // Resetta il timer quando la mossa è valida
                }

                // Resetta l'elemento selezionato
                selectedElement = null;
                selectedImage = null;

                // Rimuovi l'evidenziazione dalla cella sorgente
                selectedCell.classList.remove("highlighted");
                selectedCell = null;
            }
        }
    });
});
