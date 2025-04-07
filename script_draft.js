function sx_draft(){
    let scell00 = document.getElementById("s00");
    let s00 = document.createElement("img");
    s00.id = "Messi";
    s00.className = "santino";
    s00.src = "https://img.a.transfermarkt.technology/portrait/header/28003-1740766555.jpg?lm=1";
    s00.alt = "Messi";
    s00.draggable = true;
    scell00.appendChild(s00);

    let scell01 = document.getElementById("s01");
    let s01 = document.createElement("img");
    s01.id = "Ronaldo";
    s01.className = "santino";
    s01.src = "https://img.a.transfermarkt.technology/portrait/header/8198-1694609670.jpg?lm=1";
    s01.alt = "Ronaldo";
    s01.draggable = true;
    scell01.appendChild(s01);

    let scell02 = document.getElementById("s02");
    let s02 = document.createElement("img");
    s02.id = "Neymar";
    s02.className = "santino";
    s02.src = "https://img.a.transfermarkt.technology/portrait/header/68290-1692601435.jpg?lm=1";
    s02.alt = "Neymar";
    s02.draggable = true;
    scell02.appendChild(s02);

    let scell03 = document.getElementById("s03");
    let s03 = document.createElement("img");
    s03.id = "Isla";
    s03.className = "santino";
    s03.src = "https://img.a.transfermarkt.technology/portrait/header/43722-1718986946.jpg?lm=1";
    s03.alt = "Isla";
    s03.draggable = true;
    scell03.appendChild(s03);
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
    
