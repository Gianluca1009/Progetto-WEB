
document.querySelectorAll(".pedina").forEach(ped =>{
    ped.addEventListener("dragstart", function(event) {
        // Salva l'elemento che stai trascinando
        draggedElement = event.target;
        event.dataTransfer.setData("text", event.target.id);
    });
});

document.querySelectorAll("td").forEach(cell => {
    // Permetti il drop sulle celle della tabella
        cell.addEventListener("dragover", function(event) {
        event.preventDefault();  // Necessario per consentire il drop
    });

    // Gestisci il drop sulle celle della tabella
    cell.addEventListener("drop", function(event) {
        event.preventDefault();

        // Ottieni la cella di destinazione
        let x = event.clientX;
        let y = event.clientY;
        let cell = document.elementFromPoint(x, y);

        // Se è una cella (tagName == "TD"), aggiungi l'elemento
        if (cell && cell.tagName === "TD") {
            cell.appendChild(draggedElement);
        }
    });
});