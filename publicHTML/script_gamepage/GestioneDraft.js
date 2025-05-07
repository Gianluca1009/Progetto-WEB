window.array_calciatori_partita = [];
window.array_calciatori_partita_neri = [];
window.array_calciatori_partita_bianchi = [];
window.DraggedClassCalciatoreBianco = null; // Variabile per memorizzare il calciatore trascinato
window.DraggedClassCalciatoreNero = null; // Variabile per memorizzare il calciatore trascinato

window.MappaPedineCalciatori = {}


//funzione per assegnare il cognome del calciatore al testo del div_pedina
function assegnaCognome(text,cognome_calciatore){
    if (!text.textContent){
        text.textContent = cognome_calciatore;
        text.classList.add('nome-giocatore');
        return true;
    }
    return false;
}

//funzione per evidenziare le celle di drop della squadra nera
function evidenziaCelleDropNero(){
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 6; j++){
            const cella = document.getElementById(`${i}${j}`);
            // Controlla se c'è una pedina
            if(cella.children.length == 1){
                const pedina = cella.querySelector('.pedina');
                // Controlla se la pedina esiste e non ha già un nome giocatore assegnato
                if(pedina && !pedina.querySelector('.nome-giocatore')){
                    cella.classList.add('highlight-drop-cell');
                }
            }
        }
    }
}

//funzione per sottolineare le celle di drop della squadra bianca
function evidenziaCelleDropBianco(){
    for(let i = 4; i < 6; i++){
        for(let j = 0; j < 6; j++){
            const cella = document.getElementById(`${i}${j}`);
            // Controlla se c'è una pedina
            if(cella.children.length == 1){
                const pedina = cella.querySelector('.pedina');
                // Controlla se la pedina esiste e non ha già un nome giocatore assegnato
                if(pedina && !pedina.querySelector('.nome-giocatore')){
                    cella.classList.add('highlight-drop-cell');
                }
            }
        }
    }
}

//funzione per resettare le celle di drop
function resetEvidenziaCelleDrop(){
    document.querySelectorAll(".highlight-drop-cell").forEach(cell => {
        cell.classList.remove('highlight-drop-cell');
    });
}

//funzione per gestire il drag e drop dei santini
async function DragDropSantiniOnly(){
    document.querySelectorAll(".santino-sx").forEach(santino_img => {
        // Evento dragstart
        santino_img.addEventListener("dragstart", async function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            OggettoCalciatoreBianco = JSON.parse(santino_img.id); //parsing dell'oggetto JSON id sarebbe il json della classe calciatore
            window.DraggedClassCalciatoreBianco = OggettoCalciatoreBianco; // Salva il calciatore trascinato
            event.dataTransfer.setData("text", OggettoCalciatoreBianco.cognome);  //salva id del div nell'evento
            event.dataTransfer.setData("type", "sx"); // Indica che è un santino-sx
            document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
            evidenziaCelleDropBianco();
        });

        // Evento dragend
        santino_img.addEventListener("dragend", function(event) {
            document.body.style.cursor = 'default';  // Ripristina il cursore default
            resetEvidenziaCelleDrop();
        });
    });

    //selziona tutti le img calciatore -> drag elem dx
    document.querySelectorAll(".santino-dx").forEach(santino_img => {
        // Evento dragstart
        santino_img.addEventListener("dragstart", async function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            OggettoCalciatoreNero = JSON.parse(santino_img.id); //parsing dell'oggetto JSON
            window.DraggedClassCalciatoreNero = OggettoCalciatoreNero;
            event.dataTransfer.setData("text", OggettoCalciatoreNero.cognome);  //salva id del div nell'evento
            event.dataTransfer.setData("type", "dx"); // Indica che è un santino-dx
            document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
            evidenziaCelleDropNero();
        });

        // Evento dragend
        santino_img.addEventListener("dragend", async function(event) {
            document.body.style.cursor = 'default';  // Ripristina il cursore default
            resetEvidenziaCelleDrop();
        });
    });
}

//funzione per gestire il drag e drop
async function DragDrop_draft(){
    //selziona tutti le img calciatore -> drag elem sx
    DragDropSantiniOnly(); // Inizializza il drag&drop per i santini

    //selziona tutte le caselle pezzi -> drop zone
    document.querySelectorAll(".greencell, .creamcell").forEach(drop_cell => {
        // Gestisci l'evento dragover
        drop_cell.addEventListener("dragover", async function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }

            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        // Gestisci l'evento drop
        drop_cell.addEventListener("drop", async function(event) {
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
                    if(!assegnaCognome(text, cognome_calciatore)) return;
                    if(isPedinaBianca)
                        await populateDraft("bianco"); // Popola il draft per la squadra
                    if(!isPedinaBianca)
                        await populateDraft("nero"); // Popola il draft per la squadra
                    if(isPedinaBianca && !MappaPedineCalciatori[div_pedina.id]){
                        MappaPedineCalciatori[div_pedina.id] = DraggedClassCalciatoreBianco; // Salva la mappatura del calciatore e della pedina
                    }
                    else if(!isPedinaBianca && !MappaPedineCalciatori[div_pedina.id]){
                        MappaPedineCalciatori[div_pedina.id] = DraggedClassCalciatoreNero; // Salva la mappatura del calciatore e della pedina
                    }
                }
                console.log(MappaPedineCalciatori)
            }
        });
    });
}

//ottiene i calciatori dal server
async function fetchCalciatori() {
    const response = await fetch('http://localhost:3000/populate-draft');
    const data = await response.json(); // Estrai i dati JSON dalla risposta
    return data; // Restituisci l'array di calciatori
}

// Funzione per mescolare un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Scambia elementi
    }
}

// Funzione per ottenere 3 calciatori casuali da un array
function get3Calciatori(colore) {
    if(colore== "nero"){
        shuffleArray(array_calciatori_partita_neri);
        return array_calciatori_partita_neri.slice(0, 3);
    }
    else if(colore== "bianco"){
        shuffleArray(array_calciatori_partita_bianchi);
        return array_calciatori_partita_bianchi.slice(0, 3);
    }
}

// Funzione per rimuovere 3 calciatori da un array
function remove3Calciatori(colore) {
    if(colore== "nero"){
        // Rimuovi i primi 3 calciatori dall'array dei neri
        array_calciatori_partita_neri.splice(0, 3);
        console.log("rimossi 3 neri");
    }
    else if(colore== "bianco"){
        // Rimuovi i primi 3 calciatori dall'array dei bianchi
        array_calciatori_partita_bianchi.splice(0, 3);
        console.log("rimossi 3 bianchi");
    }
}

// Funzione per ottenere la lista dei calciatori in base al colore
function getListaCalciatori(colore) {
    if(colore== "nero"){
        return array_calciatori_partita_neri;
    }
    else if(colore== "bianco"){
        return array_calciatori_partita_bianchi;
    }
}

// Funzione per creare le liste dei calciatori
async function CreaListeCalciatori() {
    window.array_calciatori_partita = await fetchCalciatori();
    window.array_calciatori_partita_neri = window.array_calciatori_partita.slice(0, 36); // I primi 36 calciatori sono neri
    window.array_calciatori_partita_bianchi = window.array_calciatori_partita.slice(36, 72); // Gli ultimi 36 calciatori sono bianchi
    console.log("calciatori:", array_calciatori_partita_neri);
}

// Funzione per popolare il draft con i calciatori selezionati
async function populateDraft(colore) {
    try {

        if (colore=="nero" && (!array_calciatori_partita_neri || array_calciatori_partita_neri.length < 3)) {
            makeHidden(document.getElementById('draft_table_dx'));
            makeHidden(document.getElementById('random2'));
            document.getElementById('player2button').style.transform = "translateY(450%) scale(1.1)";
            return;
        }

        else if (colore=="bianco" && (!array_calciatori_partita_bianchi || array_calciatori_partita_bianchi.length < 3)) {
            makeHidden(document.getElementById('draft_table_sx'));
            makeHidden(document.getElementById('random1'));
            document.getElementById('player1button').style.transform = "translateY(450%) scale(1.1)";
            return;
        }

        // Seleziona i primi 6 calciatori casuali
        const selectedPlayers = get3Calciatori(colore);

        // Rimuovi i calciatori selezionati dall'array originale
        remove3Calciatori(colore);

        santiniContainers = [];

        if(colore == "nero"){
            santiniContainers = [
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
            santiniContainers = [
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
            const player = selectedPlayers[i];
            const container = santiniContainers[i]; // Usa l'indice corretto per i container di dx
            if (container && player) {
                //POPOlAMENTO IMG
                container.innerHTML = ''; // Pulisci il container precedente se necessario
                const img = document.createElement('img');
                img.src = player.img_url; // Assicurati che 'url_foto' sia il nome corretto della proprietà
                img.alt = player.cognome; // Usa 'cognome' come alt text
                img.id = JSON.stringify(selectedPlayers[i]); // Usa il JSON della classe com id dell'immagine

                //POPOLAMENTO INFO
                
                div_info = info_statistiche[i];
                    //crea la lista puntata
                const ul_info = document.createElement('ul');
                const li1_info = document.createElement('li');
                const li2_info = document.createElement('li');
                const li3_info = document.createElement('li');
                const li4_info = document.createElement('li');
                if (player.nome != null){
                    li1_info.textContent = `${player.nome} ${player.cognome}`;
                }else{
                    li1_info.textContent = `${player.cognome}`;
                }
                li2_info.textContent = `${player.squadra} `;
                li3_info.textContent = `${player.ruolo} `;
                li4_info.textContent = `${player.data_nascita} `;

                ul_info.appendChild(li1_info);
                ul_info.appendChild(li2_info);
                ul_info.appendChild(li3_info);
                ul_info.appendChild(li4_info);

                div_info.appendChild(ul_info);

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

        DragDropSantiniOnly();

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

    if(colore=="nero"){
        makeHidden(document.getElementById('draft_table_dx'));
        makeHidden(document.getElementById('random2'));
        document.getElementById('player2button').style.transform = "translateY(450%) scale(1.1)";
    }
    else if(colore=="bianco"){
        makeHidden(document.getElementById('draft_table_sx'));
        makeHidden(document.getElementById('random1'));
        document.getElementById('player1button').style.transform = "translateY(450%) scale(1.1)";
    }

    // Ottieni la lista dei calciatori rimanenti
    let listaCalciatoriRimanenti = getListaCalciatori(colore);

    // Mescola l'array dei calciatori per assegnazione casuale
    shuffleArray(listaCalciatoriRimanenti);

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
    const numCalciatoriDaAssegnare = Math.min(
        Math.ceil((listaCalciatoriRimanenti.length / 3) + 1),
        pedine.length,
        listaCalciatoriRimanenti.length
    );


    // Assegna i calciatori alle pedine
    for (let i = 0; i < numCalciatoriDaAssegnare; i++) {
        if (i >= pedine.length || i >= listaCalciatoriRimanenti.length) break;

        const pedina = pedine[i];
        const calciatore = listaCalciatoriRimanenti[i];

        // Crea l'elemento text se non esiste
        let text = pedina.querySelector('text');
        if (!text) {
            text = document.createElement('text');
            text.classList.add('nome-giocatore');
            pedina.appendChild(text);
        }

        // Assegna il cognome del calciatore
        text.textContent = calciatore.cognome;

        // Salva la mappatura del calciatore e della pedina
        MappaPedineCalciatori[pedina.id] = calciatore;
    }

    
    // Rimuovi i calciatori assegnati dall'array originale
    if (colore === "nero") {
        array_calciatori_partita_neri.splice(0, numCalciatoriDaAssegnare);
    } else if (colore === "bianco") {
        array_calciatori_partita_bianchi.splice(0, numCalciatoriDaAssegnare);
    }
}
