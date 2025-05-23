// Classe Calciatore

class Calciatore {
    constructor(nome, cognome, img_url, data_nascita, nazionalita, ruolo, squadra, numero_maglia, goal, assist, presenze, cartellini_gialli, cartellini_rossi, trofei, record_goal, record_assist, altezza, isFromRosa) {
        this.nome = nome;
        this.cognome = cognome;
        this.img_url = img_url;
        this.data_nascita = data_nascita;
        this.nazionalita = nazionalita;
        this.ruolo = ruolo;
        this.squadra = squadra;
        this.numero_maglia = numero_maglia;
        this.goal = goal;
        this.assist = assist;
        this.presenze = presenze;
        this.cartellini_gialli = cartellini_gialli;
        this.cartellini_rossi = cartellini_rossi;
        this.trofei = trofei;
        this.record_goal = record_goal;
        this.record_assist = record_assist;
        this.altezza = altezza;
        this.isFromRosa = isFromRosa; // Aggiunto per tenere traccia se il calciatore è già presente nella rosa
    }
}

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

// Funzione che setta a oro le righe della rosa e a grigio le rige random
function setColoreRiga(){
    document.querySelectorAll('.info_draftcell').forEach(riga => {
        if (riga.dataset.fromRosa === "true") {
            riga.style.background = "var(--gold)";
        }
        else if (riga.dataset.fromRosa === "false") {
            riga.style.background = "rgb(193, 193, 193)";
        }
    });
}

// Funzione per creare la sezione del flag rosa
function buildFlagRosa(div_info){
    const sezione_flag = document.createElement('div');
    sezione_flag.classList.add('sezione-flag');

    const flag_text = document.createElement('p');
    flag_text.textContent = "ROSA";
    flag_text.classList.add('flag-rosa');
    sezione_flag.appendChild(flag_text);

    const img_flag = document.createElement('img');
    img_flag.src = "images/frecciarosa.png";
    sezione_flag.appendChild(img_flag);

    div_info.appendChild(sezione_flag);
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
    var isFromRosa = event.dataTransfer.getData("isFromRosa"); // Ottieni se il calciatore è già presente nella rosa
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
                var colore = event.dataTransfer.getData("colore"); // Ottieni il colore della rosa
                remove3Calciatori(colore);   // Rimuovi i calciatori selezionati dall'array della partita
                text = document.createElement('text');
                text.classList.add('nome-giocatore');
                if(isFromRosa) text.style.color = "red";
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
        shuffleArray(window.array_calciatori_partita_neri);
        return window.array_calciatori_partita_neri.slice(0, 3);
    }
    else if(colore== "bianco"){
        shuffleArray(window.array_calciatori_partita_bianchi);
        return window.array_calciatori_partita_bianchi.slice(0, 3);
    }
}

// Funzione per rimuovere 3 calciatori da un array
function remove3Calciatori(colore) {
    if(colore === "nero"){
        // Rimuovi i primi 3 calciatori dall'array dei neri
        window.array_calciatori_partita_neri.splice(0, 3);
    }
    else if(colore === "bianco"){
        // Rimuovi i primi 3 calciatori dall'array dei bianchi
        window.array_calciatori_partita_bianchi.splice(0, 3);
    }
}

// Funzione per ottenere la lista dei calciatori in base al colore
function getListaCalciatori(colore) {
    if(colore== "nero"){
        return window.array_calciatori_partita_neri;
    }
    else if(colore== "bianco"){
        return window.array_calciatori_partita_bianchi;
    }
}

// Funzione che trasforma i json dei calciatori in oggetti Calciatore
function objectifyCalciatori(array, provenienza) {
    try {
        const OggettiCalciatori = array.map(info_calciatore => 
            new Calciatore(
                info_calciatore.nome,
                info_calciatore.cognome,
                info_calciatore.url_foto,
                info_calciatore.data_nascita,
                info_calciatore.nazionalita,
                info_calciatore.ruolo,
                info_calciatore.squadra,
                info_calciatore.numero_maglia,
                info_calciatore.goal,
                info_calciatore.assist,
                info_calciatore.presenze,
                info_calciatore.cartellini_gialli,
                info_calciatore.cartellini_rossi,
                info_calciatore.trofei,
                info_calciatore.record_goal,
                info_calciatore.record_assist,
                info_calciatore.altezza,
                provenienza === "rosa" ? true : false // Aggiunto per tenere traccia se il calciatore è già presente nella rosa
            )
        );
        return OggettiCalciatori;
    } catch (error) {
        console.error('Error populating draft in the function objectifyCalciatore', error);
        throw error;
    }
}

// Funzione per creare le liste dei calciatori
async function creaListeCalciatori() {
    let id_player_bianco = LS_getUser1Game().id;
    let id_player_nero = LS_getUser2Game().id;

    let rosa_bianco_res = await fetch(`http://localhost:3000/get_giocatori_rosa?id=${id_player_bianco}`);
    let rosa_nero_res = await fetch(`http://localhost:3000/get_giocatori_rosa?id=${id_player_nero}`);

    let rosa_bianco = await rosa_bianco_res.json();
    let rosa_nero = await rosa_nero_res.json();

    rosa_bianco = objectifyCalciatori(rosa_bianco, "rosa");
    rosa_nero = objectifyCalciatori(rosa_nero, "rosa");

    let numero_mancanti_bianco = 36 - rosa_bianco.length;
    let numero_mancanti_nero = 36 - rosa_nero.length;

    let mancanti_bianco_res = await fetch(`http://localhost:3000/get_random_calciatori?id=${id_player_bianco}&n=${numero_mancanti_bianco}`);
    let mancanti_nero_res = await fetch(`http://localhost:3000/get_random_calciatori?id=${id_player_nero}&n=${numero_mancanti_nero}`);

    let mancanti_bianco = await mancanti_bianco_res.json();
    let mancanti_nero = await mancanti_nero_res.json();

    mancanti_bianco = objectifyCalciatori(mancanti_bianco, "mancante");
    mancanti_nero = objectifyCalciatori(mancanti_nero, "mancante");

    window.array_calciatori_partita_bianchi = rosa_bianco.concat(mancanti_bianco);
    window.array_calciatori_partita_neri = rosa_nero.concat(mancanti_nero);

}