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


function listner_DrugDrop_caclciatori(){
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
            var idCalciatore = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            let div_pedina = drop_cell.querySelector('.pedina');
            
            if (div_pedina) {
                // Crea l'elemento h1 se non esiste
                let h1 = div_pedina.querySelector('h1');
                if (!h1) {
                    h1 = document.createElement('h1');
                    div_pedina.appendChild(h1);
                }
                
                // Imposta il testo dell'h1 con l'id del calciatore
                div_pedina.style.position = "relative";
                h1.textContent = idCalciatore;
                h1.style.color = "black";
                h1.style.fontSize = "1.2em";
                h1.style.margin = "0";
                h1.style.padding = "0";
                h1.style.textAlign = "center";
                h1.style.position = "absolute";
                h1.style.bottom = "-0.9em";
                h1.style.width = "100%";
            }
        });
    });
}

sx_draft();
listner_DrugDrop_caclciatori();

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
    
