let selectedElement = null;
let selectedCell = null;  // Memorizza la cella selezionata

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
        
        // Se la cella contiene una pedina, il percorso non è libero
        if (check_cell && check_cell.querySelector('.pedina')) {
            return false;
        }
    }
    return true;
}

function validationMove(elem,dest_cell){

    let valid = true; //booleano che decide se la mossa sia valida o meno secondo le regole

    if(elem.parentElement.id=='P' || elem.parentElement.id=='p'){

        if(elem.parentElement.id=='p'){
            var valid_cell_x = parseInt(elem.parentElement.parentElement.id[0])-1;  //x dello spostamento valido
        }
        if(elem.parentElement.id=='P'){
            var valid_cell_x = parseInt(elem.parentElement.parentElement.id[0])+1;
        }
        let valid_cell_y = parseInt(elem.parentElement.parentElement.id[1]);    //y dello spostamento valido

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

    if(elem.parentElement.id=='t' || elem.parentElement.id=='T'){

        let start_cell_x = parseInt(elem.parentElement.parentElement.id[0]);
        let start_cell_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(dest_cell_x==start_cell_x || dest_cell_y==start_cell_y) {
            // Verifica che il percorso sia libero
            valid = checkPathClear(start_cell_x, start_cell_y, dest_cell_x, dest_cell_y);
        }
        else valid = false;
    }

    if(elem.parentElement.id=='a' || elem.parentElement.id=='A'){

        let curr_x = parseInt(elem.parentElement.parentElement.id[0]);
        let curr_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(Math.abs(dest_cell_x-curr_x) != Math.abs(dest_cell_y-curr_y)) return false;
        
        // Verifica che il percorso sia libero
        valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
    }

    if(elem.parentElement.id=='c' || elem.parentElement.id=='C'){

        let curr_x = parseInt(elem.parentElement.parentElement.id[0]);
        let curr_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il cavallo può saltare, quindi non serve controllare il percorso
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (!((dx === 2 && dy === 1) || (dx === 1 && dy === 2))) return false;
    }

    if(elem.parentElement.id=='q' || elem.parentElement.id=='Q'){

        let curr_x = parseInt(elem.parentElement.parentElement.id[0]);
        let curr_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // La regina si muove come torre o alfiere
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (!(dx === 0 || dy === 0 || dx === dy)) return false;
        
        // Verifica che il percorso sia libero
        valid = checkPathClear(curr_x, curr_y, dest_cell_x, dest_cell_y);
    }

    if(elem.parentElement.id=='r' || elem.parentElement.id=='R'){

        let curr_x = parseInt(elem.parentElement.parentElement.id[0]);
        let curr_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        // Il re si muove di una casella in qualsiasi direzione
        let dx = Math.abs(dest_cell_x - curr_x);
        let dy = Math.abs(dest_cell_y - curr_y);
        
        if (dx > 1 || dy > 1) return false;
    }

    return valid;
}
// Aggiungi un event listener per selezionare la pedina
document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
    pedina.addEventListener("click", function(event) {
        // Seleziona l'elemento (pedina) da spostare
        selectedImage = event.target; //immagine
        selectedElement = selectedImage.parentElement;
        selectedCell = selectedElement.parentElement;  // Memorizza la cella sorgente
        
        // Evidenzia la cella sorgente in giallo
        document.querySelectorAll(".greencell, .creamcell").forEach(cell => cell.classList.remove("highlighted"));
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
                if(validationMove(selectedImage,this))
                    this.appendChild(selectedElement);

                // Resetta l'elemento selezionato
                selectedElement = null;

                // Rimuovi l'evidenziazione dalla cella sorgente
                selectedCell.classList.remove("highlighted");
                selectedCell = null;

            }
        }
    });
});
