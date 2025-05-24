// Funzione per misurare le dimensioni delle celle della scacchiera
function misuraDimensioniCelle() {
    // Seleziona la prima cella della scacchiera
    const cella = document.getElementById('00');
    
    if (cella) {
        // Ottiene le dimensioni effettive della cella
        dimensioni = cella.getBoundingClientRect();
    }
    return dimensioni;
}

//Funzione per misurare le dimensioni del contenitore del gioco
function misuraGameContainer() {
    // Seleziona il contenitore del gioco
    const gameContainer = document.querySelector('.game-container');
    
    if (gameContainer) {
        // Ottiene le dimensioni effettive del contenitore del gioco
        dimensioni = gameContainer.getBoundingClientRect();
    }
    return dimensioni;
}

//Funzione per misurare le dimensioni del contenitore della griglia
function misuraGridContainer() {
    // Seleziona il contenitore della griglia
    const gridContainer = document.querySelector('.grid-container');
    
    if (gridContainer) {
        // Ottiene le dimensioni effettive del contenitore della griglia
        dimensioni = gridContainer.getBoundingClientRect();
    }
    return dimensioni;
}

//Funzione per misurare le dimensioni del contenitore delle informazioni
function misuraInfoDraftCell() {
    // Seleziona il contenitore delle informazioni
    const infoContainer = document.querySelector('.info-draftcell');
    
    if (infoContainer) {
        // Ottiene le dimensioni effettive del contenitore delle informazioni
        dimensioni = infoContainer.getBoundingClientRect();
    }
    return dimensioni;
}

// Funzione per misurare le dimensioni del div di log
function misuraDivLog() {
    const divLog = document.querySelector('.div-log');
    if (divLog) {
        // Ottiene le dimensioni effettive del div log
        dimensioni = divLog.getBoundingClientRect();
    }
    return dimensioni;
}

// Funzione per settare la font size ai calciatori nelle celle
function setSoccerPlayerNameFontSize() {
    const nomiGiocatori = document.querySelectorAll('.nome-giocatore');
    const dimensioniCella = misuraDimensioniCelle().width;
    nomiGiocatori.forEach(nome => {
        nome.style.fontSize = `${dimensioniCella * 0.12}px`;
    });
}

// Funzione che mi sa non usiamo
function setSoccerPlayerInfoFontSize(){
    const lista = document.querySelectorAll('lista-info');
    const textElements = document.getElementsByTagName('li');
    const dimensioniInfoDraftCell = misuraInfoDraftCell().width;

    for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        // Imposta la grandezza del font in base alla dimensione della cella
        element.style.fontSize = dimensioniInfoDraftCell * 0.09 + 'px';
    }
}

// Funzione per settare la lunghezza del menu hamburger dinamicamente
function setHamburgerLunghezza(){
    const altezzaPagina = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );

    const hamburger = document.querySelector('.hamburger');
    hamburger.style.height = `${altezzaPagina}px`;
}

