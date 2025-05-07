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

function setSoccerPlayerNameFontSize() {
    const nomiGiocatori = document.querySelectorAll('.nome-giocatore');
    const dimensioniCella = misuraDimensioniCelle().width;
    
    nomiGiocatori.forEach(nome => {
        nome.style.fontSize = `${dimensioniCella * 0.12}px`;
    });
}
