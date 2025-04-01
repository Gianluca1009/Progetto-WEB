let selectedElement = null;

// Aggiungi un event listener per selezionare la pedina
document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
    pedina.addEventListener("click", function(event) {
        // Seleziona l'elemento (pedina) da spostare
        selectedElement = event.target;

        // Aggiungi evidenza sull'elemento selezionato (opzionale)
        document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(p => p.classList.remove("selected"));
        selectedElement.classList.add("selected");
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
            }
        }
    });
});
