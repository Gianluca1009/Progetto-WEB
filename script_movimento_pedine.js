let selectedElement = null;
let selectedCell = null;  // Memorizza la cella selezionata

// Aggiungi un event listener per selezionare la pedina
document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
    pedina.addEventListener("click", function(event) {
        // Seleziona l'elemento (pedina) da spostare
        selectedImage = event.target; //immagine
        selectedElement = selectedImage.parentElement;
        selectedCell = selectedElement.parentElement;  // Memorizza la cella sorgente
        
        console.log(selectedImage);
        console.log(selectedElement);       //osservare cosa succede ai click
        console.log(selectedCell);

        // Aggiungi evidenza sulla pedina selezionata
        document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(p => p.classList.remove("selected"));
        selectedCell.classList.add("selected");

        // Evidenzia la cella sorgente in giallo
        document.querySelectorAll(".greencell, .creamcell, .greencell:hover, .creamcell:hover").forEach(cell => cell.classList.remove("highlighted"));
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
                this.appendChild(selectedElement);

                // Rimuovi l'evidenziazione della pedina
                selectedElement.classList.remove("selected");

                // Resetta l'elemento selezionato
                selectedElement = null;

                // Rimuovi l'evidenziazione dalla cella sorgente
                selectedCell.classList.remove("highlighted");
                selectedCell = null;
            }
        }
    });
});
