
    document.addEventListener("DOMContentLoaded", function() {
    let draggedElement = null;

    document.querySelectorAll(".draggable").forEach(img => {
        img.addEventListener("dragstart", function(event) {
            draggedElement = event.target;
        });
    });

    document.querySelector("table").addEventListener("dragover", function(event) {
        event.preventDefault();  // Necessario per consentire il drop
    });

    document.querySelector("table").addEventListener("drop", function(event) {
        event.preventDefault();

        // Ottieni le coordinate del mouse
        let x = event.clientX;
        let y = event.clientY;

        // Trova la cella della tabella sotto il mouse
        let cell = document.elementFromPoint(x, y);

        // Se è una cella della tabella, inserisci l'immagine
        if (cell && cell.tagName === "TD") {
            cell.appendChild(draggedElement);
        }
    });
});