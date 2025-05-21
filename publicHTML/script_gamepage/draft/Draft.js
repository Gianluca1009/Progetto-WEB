window.array_calciatori_partita = [];
window.array_calciatori_partita_neri = [];
window.array_calciatori_partita_bianchi = [];

window.dragged_class_calciatore_bianco = null; 
window.dragged_class_calciatore_nero = null;

//------ FUNZIONI DI LISTENER ------//

async function santinoSxDragStart(santino_img, event) {
    // Se il gioco è iniziato, non fare nulla
    if (window.game_started) {
        event.preventDefault();
        return false;
    }

    document.querySelectorAll('.statistiche-draft').forEach(div => {
            div.remove(); // Rimuovi il div delle statistiche
    });
    window.dragged_class_calciatore_bianco = JSON.parse(santino_img.dataset.json); //parsing dell'oggetto JSON id sarebbe il json della classe calciatore
    event.dataTransfer.setData("text", window.dragged_class_calciatore_bianco.cognome);  //salva cognome calciatore nell'evento
    event.dataTransfer.setData("type", "sx"); // Indica che è un santino-sx
    document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
    evidenziaCelleDropBianco();
}

async function santinoDxDragStart(santino_img, event) {
    if (window.game_started) {
        event.preventDefault();
        return false;
    }
    document.querySelectorAll('.statistiche-draft').forEach(div => {
            div.remove(); // Rimuovi il div delle statistiche
    });
    window.dragged_class_calciatore_nero = JSON.parse(santino_img.dataset.json); //parsing dell'oggetto JSON
    event.dataTransfer.setData("text", window.dragged_class_calciatore_nero.cognome);  //salva id del div nell'evento
    event.dataTransfer.setData("type", "dx"); // Indica che è un santino-dx
    document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
    evidenziaCelleDropNero();
}

async function santinoDragEnd() {
    document.body.style.cursor = 'default';  // Ripristina il cursore default
    resetEvidenziaCelleDrop();
}

async function dropCellDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}

async function dropCellDrop(drop_cell, event) {
    event.preventDefault();
    AssegnaCalciatoreAPedina(event, drop_cell); // Assegna il calciatore alla pedina    
}


//------ DRAG & DROP ------//

// Funzione per gestire il drag dei santini
async function dragSantini(){
    
    document.querySelectorAll(".santino-sx").forEach(santino_img => {
        santino_img.addEventListener("dragstart", async function(event){ santinoSxDragStart(santino_img, event); });

        // Evento dragend
        santino_img.addEventListener("dragend", santinoDragEnd); 
    });

    //selziona tutti le img calciatore -> drag elem dx
    document.querySelectorAll(".santino-dx").forEach(santino_img => {
        santino_img.addEventListener("dragstart", async function(event) {santinoDxDragStart(santino_img, event); });
            
        // Evento dragend
        santino_img.addEventListener("dragend", santinoDragEnd);
    });
}

// Funzione per gestire il drop dei santini
async function dropSantini(){
    //selziona tutti le img calciatore -> drag elem sx
    dragSantini(); // Inizializza il drag&drop per i santini

    document.querySelectorAll(".greencell, .creamcell").forEach(drop_cell => {
        // Gestisci l'evento dragover
        drop_cell.addEventListener("dragover", dropCellDragOver);

        // Gestisci l'evento drop
        drop_cell.addEventListener("drop", async function(event) { dropCellDrop(drop_cell, event);});
    });

    
}


//------ ESTRAZIONE DATABASE ------//

// Funzione per popolare il draft con i calciatori selezionati
async function populateDraft(colore) {
    try {

        if (colore=="nero" && (!array_calciatori_partita_neri || array_calciatori_partita_neri.length < 3)) {
            setSoccerPlayerNameFontSize();

            // AGGIORNAMENTO GRAFICHE

            makeHidden(document.getElementById('draft_table_dx'));
            makeHidden(document.getElementById('random2'));
            makeVisible(document.getElementById('player2button'));
            return;
        }

        else if (colore=="bianco" && (!array_calciatori_partita_bianchi || array_calciatori_partita_bianchi.length < 3)) {
            setSoccerPlayerNameFontSize();

            // AGGIORNAMENTO GRAFICHE
            
            makeHidden(document.getElementById('draft_table_sx'));
            makeHidden(document.getElementById('random1'));
            makeVisible(document.getElementById('player1button'));
            return;
        }

        // Seleziona i primi 6 calciatori casuali
        const selected_calciatori = get3Calciatori(colore);

        // Rimuovi i calciatori selezionati dall'array originale
        remove3Calciatori(colore);

        let santini_containers = [];
        let info_statistiche = [];

        if(colore == "nero"){
            santini_containers = [
                document.getElementById('d00'),
                document.getElementById('d10'),
                document.getElementById('d20')
            ];
            info_statistiche = [
                document.getElementById('d01'),   //div -> elenco puntato
                document.getElementById('d11'),
                document.getElementById('d21')
            ]
        } else if(colore == "bianco"){
            santini_containers = [
                document.getElementById('s00'),
                document.getElementById('s10'),
                document.getElementById('s20')
            ];
            info_statistiche = [
                document.getElementById('s01'),
                document.getElementById('s11'),
                document.getElementById('s21')
            ]
        }

        // Popola i container di destra (giocatori da 3 a 5)
        for (let i = 0; i < 3; i++) {
            const calciatore = selected_calciatori[i];
            const container = santini_containers[i]; // Usa l'indice corretto per i container di dx
            if (container && calciatore) {
                //pulizia dei campi precedenti
                container.innerHTML = ''; // Pulisci il container precedente se necessario

                if (info_statistiche[i].hasChildNodes()){
                    info_statistiche[i].removeChild(info_statistiche[i].firstChild);
                }
                //POPOlAMENTO IMG
                const img = document.createElement('img');
                img.src = calciatore.img_url; // Assicurati che 'url_foto' sia il nome corretto della proprietà
                img.alt = calciatore.cognome; // Usa 'cognome' come alt text
                img.dataset.json = JSON.stringify(selected_calciatori[i]); // Usa il JSON della classe com id dell'immagine

                //POPOLAMENTO INFO
                div_info = info_statistiche[i];
                    //crea la lista puntata
                const ul_info = document.createElement('ul');
                const li1_info = document.createElement('li');
                const li2_info = document.createElement('li');
                const li3_info = document.createElement('li');
                const li4_info = document.createElement('li');

                //approfondimento statistiche sul click
                if (colore === 'bianco'){
                    div_info.addEventListener('mousedown', function(event){
                        if(event.button === 2){
                            console.log("clickdestro");
                            displayStatistiche(calciatore, this, "sinistra", calciatore.isFromRosa);
                        }
                    });
                }
                else{
                    div_info.addEventListener('mousedown', function(event){
                        if(event.button === 2){
                            console.log("clickdestro");
                            displayStatistiche(calciatore, this, "destra", calciatore.isFromRosa);
                        }
                    });
                } 

                setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatori

                //Breve sezione stile
                ul_info.style.padding = "0"; // Rimuovi il padding della lista
                ul_info.style.margin = "0"; // Rimuovi i punti elenco
                li1_info.style.fontWeight = "bold"; // Imposta il testo in grassetto
                li1_info.style.fontFamily = "'Georgia', serif"; // Imposta la dimensione del font
                li4_info.style.fontStyle = "italic"; // Imposta il testo in corsivo

                if (calciatore.nome != null){
                    li1_info.textContent = `${calciatore.nome} ${calciatore.cognome}`;
                }else{
                    li1_info.textContent = `${calciatore.cognome}`;
                }
                li2_info.textContent = `${calciatore.squadra} `;
                li3_info.textContent = `${calciatore.ruolo} `;
                li4_info.textContent = `${convertDate(calciatore.data_nascita)} `;

                ul_info.appendChild(li1_info);
                ul_info.appendChild(li2_info);
                ul_info.appendChild(li3_info);
                ul_info.appendChild(li4_info);
                div_info.appendChild(ul_info);


                // setto una variabile per controllare se il calciatore è della rosa
                if(calciatore.isFromRosa) div_info.dataset.fromRosa = "true";
                else div_info.dataset.fromRosa = "false";

                if(calciatore.isFromRosa){
                    buildFlagRosa(div_info);
                }
        
                if(colore == "nero"){
                    img.classList.add('santino-dx'); // Aggiungi la classe per lo stile e il drag&drop
                }
                else if(colore == "bianco"){
                    img.classList.add('santino-sx'); // Aggiungi la classe per lo stile e il drag&drop
                }
                img.draggable = true;
                container.appendChild(img);
            }
        }
        setColoreRiga();

        dragSantini();

    } catch (error) {
        console.error('Errore durante il popolamento del draft:', error);
    }
}

// Funzione per popolare i calciatori casuali
function populateRandom(colore) {
    // Verifica se ci sono abbastanza calciatori disponibili
    if (colore=="nero" && (!array_calciatori_partita_neri || array_calciatori_partita_neri.length === 0)) {
        console.log("Non ci sono abbastanza calciatori neri disponibili");

        return;
    }
    else if (colore=="bianco" && (!array_calciatori_partita_bianchi || array_calciatori_partita_bianchi.length === 0)) {
        console.log("Non ci sono abbastanza calciatori bianchi disponibili");
        return;
    }

    // Ottieni la lista dei calciatori rimanenti
    let lista_calciatori_rimanenti = getListaCalciatori(colore);

    // Mescola l'array dei calciatori per assegnazione casuale
    shuffleArray(lista_calciatori_rimanenti);

    // Seleziona le pedine in base al colore
    let pedine = [];
    if (colore === "nero") {
        // Seleziona tutte le pedine nere (id maiuscolo)
        document.querySelectorAll(".pedina").forEach(pedina => {
            const pedinaId = pedina.id;
            // Verifica se la pedina è nera (id maiuscolo)
            const isPedinaNera = pedinaId === pedinaId.toUpperCase();

            if (isPedinaNera && !pedina.querySelector('.nome-giocatore')) {
                pedine.push(pedina);
            }
        });
    } else if (colore === "bianco") {
        // Seleziona tutte le pedine bianche (id minuscolo)
        document.querySelectorAll(".pedina").forEach(pedina => {
            const pedinaId = pedina.id;
            // Verifica se la pedina è bianca (id minuscolo)
            const isPedinaBianca = pedinaId === pedinaId.toLowerCase() && pedinaId !== pedinaId.toUpperCase();

            if (isPedinaBianca && !pedina.querySelector('.nome-giocatore')) {
                pedine.push(pedina);
            }
        });
    }

    // Calcola quanti calciatori assegnare (un terzo dei rimanenti o tutti se sono meno delle pedine)
    const num_calciatori_da_assegnare = Math.min(
        Math.ceil((lista_calciatori_rimanenti.length / 3) + 1),
        pedine.length,
        lista_calciatori_rimanenti.length
    );


    // Assegna i calciatori alle pedine
    for (let i = 0; i < num_calciatori_da_assegnare; i++) {
        if (i >= pedine.length || i >= lista_calciatori_rimanenti.length) break;

        const pedina = pedine[i];
        const calciatore = lista_calciatori_rimanenti[i];
        pedina.firstChild.dataset.json = JSON.stringify(calciatore); // Usa il JSON della classe com id dell'immagine

        // Crea l'elemento text se non esiste
        let text = pedina.querySelector('text');
        if (!text) {
            text = document.createElement('text');
            text.classList.add('nome-giocatore');
            pedina.appendChild(text);
        }

        // Assegna il cognome del calciatore
        text.textContent = calciatore.cognome;

        // Evidenzia i calciatori dalla rosa
        if (calciatore.isFromRosa === true) {
            // Aggiungi un indicatore visuale alla pedina
            if (colore === "bianco") {
                pedina.classList.add('player-from-rosa-bianco');
            } else if (colore === "nero") {
                pedina.classList.add('player-from-rosa-nero');
            }
        }

        // Salva la mappatura del calciatore e della pedina
    }

    setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatori
    
    // Rimuovi i calciatori assegnati dall'array originale
    if (colore === "nero") {
        array_calciatori_partita_neri.splice(0, num_calciatori_da_assegnare);
    } else if (colore === "bianco") {
        array_calciatori_partita_bianchi.splice(0, num_calciatori_da_assegnare);
    }




    //AGGIORNAMENTO GRAFICHE

    if(colore=="nero"){
        makeHidden(document.getElementById('draft_table_dx'));
        makeHidden(document.getElementById('random2'));
        setTimeout(() => {
            makeVisible(document.getElementById('player2button'));
        }, 500); // Mostra il bottone dopo 1 secondo
    }
    else if(colore=="bianco"){
        makeHidden(document.getElementById('draft_table_sx'));
        makeHidden(document.getElementById('random1'));
        setTimeout(() => {
            makeVisible(document.getElementById('player1button'));
        }, 500);
    }
}

