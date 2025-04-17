function populate_draft(){
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
            id: "Ramos",
            cellId: "s20",
            src: "https://img.a.transfermarkt.technology/portrait/header/25557-1694502812.jpg?lm=1",
            alt: "Sergio Ramos"
        },
        
        {
            id: "Buffon",
            cellId: "d00",
            src: "https://img.a.transfermarkt.technology/portrait/header/5023-1713425275.jpg?lm=1",
            alt: "Buffon"
        },
        {
            id: "Haaland",
            cellId: "d10",
            src: "https://img.a.transfermarkt.technology/portrait/big/418560-1656179352.jpg",
            alt: "Haaland"
        },
        {
            id: "Lewandowski",
            cellId: "d20",
            src: "https://img.a.transfermarkt.technology/portrait/header/38253-1701118759.jpg?lm=1",
            alt: "Lewandowski"
        },
        

    ];
    
    // Creazione degli elementi con un ciclo
    calciatori.forEach(calciatore => {
        let cell = document.getElementById(calciatore.cellId);
        if (cell) { // Verifica che la cella esista prima di procedere
            let img = document.createElement("img");
            if(calciatore.cellId.includes("s")){
                img.className = "santino-sx";
            }
            else{
                img.className = "santino-dx";
            }
            img.id = calciatore.id;
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
function DragDrop_draft(){
    //selziona tutti le img calciatore -> drag elem sx
    document.querySelectorAll(".santino-sx").forEach(santino_img => {
        // Evento dragstart
        santino_img.addEventListener("dragstart", function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
            event.dataTransfer.setData("type", "sx"); // Indica che è un santino-sx
            document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
        });

        // Evento dragend
        santino_img.addEventListener("dragend", function(event) {
            document.body.style.cursor = 'default';  // Ripristina il cursore default
        });
    });

    //selziona tutti le img calciatore -> drag elem dx
    document.querySelectorAll(".santino-dx").forEach(santino_img => {
        // Evento dragstart
        santino_img.addEventListener("dragstart", function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
            event.dataTransfer.setData("type", "dx"); // Indica che è un santino-dx
            document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
        });

        // Evento dragend
        santino_img.addEventListener("dragend", function(event) {
            document.body.style.cursor = 'default';  // Ripristina il cursore default
        });
    });

    //selziona tutte le caselle pezzi -> drop zone
    document.querySelectorAll(".greencell, .creamcell").forEach(drop_cell => {
        // Gestisci l'evento dragover
        drop_cell.addEventListener("dragover", function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        // Gestisci l'evento drop
        drop_cell.addEventListener("drop", function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            
            event.preventDefault();
            var cognome_calciatore = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            var tipoSantino = event.dataTransfer.getData("type"); // Ottieni il tipo di santino (sx o dx)
            
            let div_pedina = drop_cell.querySelector('.pedina');
            
            if (div_pedina) {
                // Ottieni l'id della pedina
                const pedinaId = div_pedina.id;
                
                // Verifica se la pedina è bianca (id minuscolo) o nera (id maiuscolo)
                const isPedinaBianca = pedinaId === pedinaId.toLowerCase() && pedinaId !== pedinaId.toUpperCase();
                
                // Controlla se è possibile effettuare il drop in base al tipo di santino e di pedina
                if ((tipoSantino === "sx" && isPedinaBianca) || (tipoSantino === "dx" && !isPedinaBianca)) {
                    // Crea l'elemento text se non esiste -cognome sotto alla pedina
                    let text = div_pedina.querySelector('text');
                    if (!text) {
                        text = document.createElement('text');
                        text.classList.add('nome-giocatore');
                        div_pedina.appendChild(text);
                    }
                    
                    // Imposta il testo con l'id del calciatore e aggiunge la classe
                    assegnaCognome(text, cognome_calciatore);
                }
            }
        });
    });
}

populate_draft();
DragDrop_draft(); // Inizializza il drag and drop all'avvio
    
