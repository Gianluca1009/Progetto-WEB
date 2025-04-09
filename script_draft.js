function sx_draft(){
    // Dati dei calciatori con tutte le informazioni necessarie
    const calciatori = [
        {
            id: "Messi",
            cellId: "s00",
            src: "https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg",
            alt: "Messi"
        },
        {
            id: "Mbappé",
            cellId: "s10",
            src: "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg",
            alt: "Mbappé"
        },
        {
            id: "Mbappé",
            cellId: "d10",
            src: "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg",
            alt: "Mbappé"
        },
        {
            id: "Haaland",
            cellId: "d20",
            src: "https://img.a.transfermarkt.technology/portrait/big/418560-1656179352.jpg",
            alt: "Haaland"
        },
        {
            id: "Lewandowski",
            cellId: "d30",
            src: "https://img.a.transfermarkt.technology/portrait/big/38253-1642434447.jpg",
            alt: "Lewandowski"
        },
        {
            id: "Haaland",
            cellId: "d00",
            src: "https://img.a.transfermarkt.technology/portrait/big/418560-1656179352.jpg",
            alt: "Haaland"
        },
        

    ];
    
    // Creazione degli elementi con un ciclo
    calciatori.forEach(calciatore => {
        let cell = document.getElementById(calciatore.cellId);
        if (cell) { // Verifica che la cella esista prima di procedere
            let img = document.createElement("img");
            
            img.id = calciatore.id;
            img.className = "santino";
            img.src = calciatore.src;
            img.alt = calciatore.alt;
            img.draggable = true;
            
            cell.appendChild(img);
        }
    });
}

//funzione per assegnare il cognome del calciatore al testo del div_pedina
function assegnaCognome(text,cognome_calciatore){
    text.textContent = cognome_calciatore;
    text.classList.add('nome-giocatore');
}

//funzione per gestire il drag e drop
function DragDrop(){
    //selziona tutti le img calciatore -> drag elem
    document.querySelectorAll(".santino").forEach(santino_img => {
        santino_img.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
        });
    });

    //selziona tutte le caselle pezzi -> drop zone
    document.querySelectorAll(".greencell, .creamcell").forEach(drop_cell => {
        // Gestisci l'evento dragover
        drop_cell.addEventListener("dragover", function(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        // Gestisci l'evento drop
        drop_cell.addEventListener("drop", function(event) {
            event.preventDefault();
            var cognome_calciatore = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            let div_pedina = drop_cell.querySelector('.pedina');
            
            if (div_pedina) {
                // Crea l'elemento h1 se non esiste
                let text = div_pedina.querySelector('text');
                if (!text) {
                    text = document.createElement('text');
                    div_pedina.appendChild(text);
                }
                
                // Imposta il testo dell'h1 con l'id del calciatore e aggiunge la classe
                assegnaCognome(text,cognome_calciatore);
            }
        });
    });
}

sx_draft();
DragDrop();

    /*
    
        // Prendere gli elementi dal DOM
        var dragElement = document.getElementById("dragElement");
        var dropZone = document.getElementById("dropZone");

        // Permettere il drag (trascinamento)
        dragElement.addEventListener("dragstart", function(event) {
            // Salva l'elemento da trascinare (qui utilizziamo l'id)
            event.dataTransfer.setData("text", event.target.id);
        });

        // Permettere il drop (rilascio)
        dropZone.addEventListener("dragover", function(event) {
            event.preventDefault();  // Necessario per consentire il drop
        });

        dropZone.addEventListener("drop", function(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            var draggedElement = document.getElementById(data);
            dropZone.appendChild(draggedElement);  // Sposta l'elemento nella zona di drop
        });
    */
    
