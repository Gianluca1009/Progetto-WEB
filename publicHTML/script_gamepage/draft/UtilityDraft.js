//------ FUNZIONI GRAFICHE ------//

// Funzione per evidenziare le celle di drop della squadra nera
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

// Funzione per sottolineare le celle di drop della squadra bianca
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

// Funzione per resettare le celle di drop
function resetEvidenziaCelleDrop(){
    document.querySelectorAll(".highlight-drop-cell").forEach(cell => {
        cell.classList.remove('highlight-drop-cell');
    });
}



//------ FUNZIONI DROP ------//

// Funzione per assegnare il cognome del calciatore al testo del div_pedina
function assegnaCognome(text,cognome_calciatore){
    if (!text.textContent){
        text.textContent = cognome_calciatore;
        text.classList.add('nome-giocatore');
        return true;
    }
    return false;
}

// Funzione per assegnare calciatore a pedine
async function AssegnaCalciatoreAPedina(event, drop_cell) {
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
            if(!assegnaCognome(text, cognome_calciatore)) return;  // QUI CONTROLLA ANCHE CHE LA PEDINA NON SIA GIA' OCCUPATA
            if(isPedinaBianca){
                div_pedina.firstChild.dataset.json = JSON.stringify(window.dragged_class_calciatore_bianco); // Usa il JSON della classe com id dell'immagine
                await populateDraft("bianco"); // Popola il draft per la squadra
            }
            if(!isPedinaBianca){
                div_pedina.firstChild.dataset.json = JSON.stringify(window.dragged_class_calciatore_nero); // Usa il JSON della classe com id dell'immagine
                await populateDraft("nero"); // Popola il draft per la squadra
            }
        }
    }
}




//------ FUNZIONI PER L'ESTRAZIONE DA DATABASE ------//

// Funzione per ottiene i calciatori dal server
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
    }
    else if(colore== "bianco"){
        // Rimuovi i primi 3 calciatori dall'array dei bianchi
        array_calciatori_partita_bianchi.splice(0, 3);

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
async function creaListeCalciatori() {
    window.array_calciatori_partita = await fetchCalciatori();
    window.array_calciatori_partita_neri = window.array_calciatori_partita.slice(0, 36); // I primi 36 calciatori sono neri
    window.array_calciatori_partita_bianchi = window.array_calciatori_partita.slice(36, 72); // Gli ultimi 36 calciatori sono bianchi
}

// Funzione per far vedere le statistiche del calciatore nello specifico
function displayStatistiche(calciatore, div_info, posizione){
    console.log("costruendo statistiche...")

    // Controlla se esiste già un div con le statistiche e rimuovilo
    if (document.querySelector('.statistiche-draft')) {
        document.querySelector('.statistiche-draft').remove();
    }


    const keys = Object.keys(calciatore).filter(key => !['id', 'nome', 'cognome', 'img_url', 'id_player', 'data_nascita', 'squadra', 'ruolo'].includes(key));

    const divStatistiche = document.createElement('div');
    divStatistiche.classList.add('statistiche-draft');

    const freccia = document.createElement('img');
    freccia.src = (posizione === "sinistra") ? "images/frecciadestra.png" : "images/frecciasinistra.png";
    freccia.classList.add(posizione === "sinistra" ? "freccia-destra" : "freccia-sinistra");
    divStatistiche.appendChild(freccia);

    const listaStatistiche = document.createElement('ul');
    for (const key of keys) {
            const li = document.createElement('li');
            li.innerHTML = `<strong> ${KeyConverter(key)}</strong>:  ${calciatore[key]}`;
            listaStatistiche.appendChild(li);
    }
    divStatistiche.appendChild(listaStatistiche);

    div_info.parentElement.appendChild(divStatistiche);

    setPositionRelativeToDiv(
    div_info,
    divStatistiche,
    posizione === "sinistra" ? "right" : "left",
    posizione === "sinistra" ? 42 : 91
    );

    document.addEventListener('click', () => {
        document.querySelectorAll('.statistiche-draft').forEach(div => {
            div.remove(); // Rimuovi il div delle statistiche
        });
    });
}