let selectedElement = null;
let selectedCell = null;  // Memorizza la cella selezionata

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
            valid = true;       //spostamento validato dal confronto
        }
        else valid = false;
    }

    if(elem.parentElement.id=='t' || elem.parentElement.id=='T'){

        let start_cell_x = parseInt(elem.parentElement.parentElement.id[0]);
        let start_cell_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(dest_cell_x==start_cell_x || dest_cell_y==start_cell_y) valid=true;      //una tra x e y deve rimanere invariata
        else valid = false;
    }
    if(elem.parentElement.id=='a' || elem.parentElement.id=='A'){

        let curr_x = parseInt(elem.parentElement.parentElement.id[0]);
        let curr_y = parseInt(elem.parentElement.parentElement.id[1]);
        
        let dest_cell_x = parseInt(dest_cell.id[0]);    //x dello spostamento desiderato
        let dest_cell_y = parseInt(dest_cell.id[1]);    //y dello spostamento desiderato

        if(Math.abs(dest_cell_x-curr_x) != Math.abs(dest_cell_y-curr_y)) return false;      //una tra x e y deve rimanere invariata

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
        
        //console.log(selectedImage);
        //console.log(selectedElement);       //osservare cosa succede ai click
        //console.log(selectedCell);

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
