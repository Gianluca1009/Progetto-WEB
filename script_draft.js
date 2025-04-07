function sx_draft(){
    let scell00 = document.getElementById("s00");
    let s00 = document.createElement("img");
    s00.className = "santino";
    s00.src = "https://img.a.transfermarkt.technology/portrait/header/28003-1740766555.jpg?lm=1";
    s00.alt = "Messi";
    scell00.appendChild(s00);

    let scell01 = document.getElementById("s01");
    let s01 = document.createElement("img");
    s01.className = "santino";
    s01.src = "https://img.a.transfermarkt.technology/portrait/header/8198-1694609670.jpg?lm=1";
    s01.alt = "Ronaldo";
    scell01.appendChild(s01);

    let scell02 = document.getElementById("s02");
    let s02 = document.createElement("img");
    s02.className = "santino";
    s02.src = "https://img.a.transfermarkt.technology/portrait/header/68290-1692601435.jpg?lm=1";
    s02.alt = "Neymar";
    scell02.appendChild(s02);

    let scell03 = document.getElementById("s03");
    let s03 = document.createElement("img");
    s03.className = "santino";
    s03.src = "https://img.a.transfermarkt.technology/portrait/header/43722-1718986946.jpg?lm=1";
    s03.alt = "Oriolo";
    scell03.appendChild(s03);
}


function listner_DrugDrop_caclciatori(){
    //selziona tutti le img calciatore -> drag elem
    //list dragElement.addEventListener("dragstart", function(event)
    document.querySelectorAll(".dragCell .div").forEach(santino_div => {   //devono essere div
        santino_div.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
        }
    );
    });

    //selziona tutte le caselle pezzi -> drop zone
    //list dropZone.addEventListener("dragover", function(event) {
    document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(drop_cell => {
        drop_cell.addEventListener("dragover", function(event) {
            event.preventDefault();
        }
    );
    });

    //list dropZone.addEventListener("drop", function(event) 
    document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(drop_cell => {
        drop_cell.addEventListener("drop", function(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");  // Ottieni l'id dell'elemento
            console.log(data)
            //var draggedElement = document.getElementById(data);
            //dropZone.appendChild(draggedElement);
    
            }
        );
    });
}

sx_draft();

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
    
