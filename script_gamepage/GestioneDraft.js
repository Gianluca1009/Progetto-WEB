//funzione per assegnare il cognome del calciatore al testo del div_pedina
function assegnaCognome(text,cognome_calciatore){
    text.textContent = cognome_calciatore;
    text.classList.add('nome-giocatore');
}

//funzione per sottolineare le celle di drop della squadra nera
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
        santino_img.addEventListener("dragstart", function(event) {
            // Se il gioco è iniziato, non fare nulla
            if (window.gameStarted) {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.setData("text", event.target.id);  //salva id del div nell'evento
            event.dataTransfer.setData("type", "dx"); // Indica che è un santino-dx
            document.body.style.cursor = 'grabbing';  // Imposta il cursore a grabbing su tutto il body
            evidenziaCelleDropNero();
        });

        // Evento dragend
        santino_img.addEventListener("dragend", function(event) {
            document.body.style.cursor = 'default';  // Ripristina il cursore default
            resetEvidenziaCelleDrop();
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

async function fetchCalciatori() {
    const response = await fetch('http://localhost:3000/populate-draft');
    const data = await response.json();
    return data;
}

// Funzione per mescolare un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Scambia elementi
    }
}

async function populate_draft() {
    try {
        const array_calciatori_partita = await fetchCalciatori();
        console.log('Raw data received:', array_calciatori_partita); // Log raw data
        console.log('Dati dal DB:', array_calciatori_partita);

        if (!array_calciatori_partita || array_calciatori_partita.length < 6) {
            console.error('Non ci sono abbastanza calciatori per popolare il draft (necessari almeno 6).');
            // Qui potresti voler mostrare un messaggio all'utente
            return;
        }

        // Mescola l'array dei calciatori
        shuffleArray(array_calciatori_partita);

        // Seleziona i primi 6 calciatori casuali
        const selectedPlayers = array_calciatori_partita.slice(0, 6);

        // Seleziona i container del draft
        const santiniSxContainers = [
            document.getElementById('s00'),
            document.getElementById('s10'),
            document.getElementById('s20')
        ];
        const santiniDxContainers = [
            document.getElementById('d00'),
            document.getElementById('d10'),
            document.getElementById('d20')
        ];

        // Popola i container di sinistra (primi 3 giocatori)
        for (let i = 0; i < 3; i++) {
            const player = selectedPlayers[i];
            const container = santiniSxContainers[i];
            if (container && player) {
                container.innerHTML = ''; // Pulisci il container precedente se necessario
                const img = document.createElement('img');
                img.src = player.img_url; // Assicurati che 'url_foto' sia il nome corretto della proprietà
                img.alt = player.cognome; // Usa 'cognome' come alt text
                img.id = player.cognome; // Usa 'cognome' come ID per il drag & drop
                img.classList.add('santino-sx'); // Aggiungi la classe per lo stile e il drag&drop
                img.draggable = true;
                container.appendChild(img);
            }
        }

        // Popola i container di destra (giocatori da 3 a 5)
        for (let i = 3; i < 6; i++) {
            const player = selectedPlayers[i];
            const container = santiniDxContainers[i - 3]; // Usa l'indice corretto per i container di dx
            if (container && player) {
                container.innerHTML = ''; // Pulisci il container precedente se necessario
                const img = document.createElement('img');
                img.src = player.img_url; // Assicurati che 'url_foto' sia il nome corretto della proprietà
                img.alt = player.cognome; // Usa 'cognome' come alt text
                img.id = player.cognome; // Usa 'cognome' come ID per il drag & drop
                img.classList.add('santino-dx'); // Aggiungi la classe per lo stile e il drag&drop
                img.draggable = true;
                container.appendChild(img);
            }
        }

    } catch (error) {
        console.error('Errore durante il popolamento del draft:', error);
    }
}
