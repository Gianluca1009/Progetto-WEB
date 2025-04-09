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
    // Memorizza i riferimenti agli event listener per poterli rimuovere
    const dragListeners = new Map();
    const dragoverListeners = new Map();
    const dropListeners = new Map();
    
    //selziona tutti le img calciatore -> drag elem
    document.querySelectorAll(".santino").forEach(santino_img => {
        const dragstartListener = function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
        };
        
        santino_img.addEventListener("dragstart", dragstartListener);
        dragListeners.set(santino_img, dragstartListener);
    });

    //selziona tutte le caselle pezzi -> drop zone
    document.querySelectorAll(".greencell, .creamcell").forEach(drop_cell => {
        // Gestisci l'evento dragover
        const dragoverListener = function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        };
        
        drop_cell.addEventListener("dragover", dragoverListener);
        dragoverListeners.set(drop_cell, dragoverListener);

        // Gestisci l'evento drop
        const dropListener = function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.preventDefault();
            var cognome_calciatore = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            let div_pedina = drop_cell.querySelector('.pedina');
            
            if (div_pedina) {
                // Crea l'elemento h1 se non esiste
                let text = div_pedina.querySelector('text');
                if (!text) {
                    text = document.createElement('text');
                    text.classList.add('nome-giocatore');
                    div_pedina.appendChild(text);
                }
                
                // Imposta il testo dell'h1 con l'id del calciatore e aggiunge la classe
                assegnaCognome(text,cognome_calciatore);
            }
        };
        
        drop_cell.addEventListener("drop", dropListener);
        dropListeners.set(drop_cell, dropListener);
    });
    
    // Funzione per disabilitare completamente il drag and drop
    window.disableDragDrop = function() {
        // Rimuovi tutti i listener dragstart
        dragListeners.forEach((listener, element) => {
            element.removeEventListener("dragstart", listener);
        });
        
        // Rimuovi tutti i listener dragover
        dragoverListeners.forEach((listener, element) => {
            element.removeEventListener("dragover", listener);
        });
        
        // Rimuovi tutti i listener drop
        dropListeners.forEach((listener, element) => {
            element.removeEventListener("drop", listener);
        });
        
        // Imposta tutti gli elementi santino come non trascinabili
        document.querySelectorAll(".santino").forEach(santino_img => {
            santino_img.draggable = false;
        });
        
        console.log("Drag and drop disabilitato");
    };
}

sx_draft();
DragDrop(); // Inizializza il drag and drop all'avvio
    
