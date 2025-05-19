const conditions = [
    "Goal segnati in carriera",
    "Assist forniti in carriera",
    "Presenze collezionate in carriera",
    "Minor numero di cartellini gialli in carriera",
    "Minor numero di cartellini rossi in carriera",
    "Numero di trofei vinti in carriera",
    "Record di goal stagionale",
    "Record di assist stagionale",
    "Numero di maglia più alto",
    "Giocatore più alto"
];


//----- GESTIONE CONDIZIONE ------//

// Funzione per ottenere una condizione casuale
function getRandomCondition() {
    return conditions[Math.floor(Math.random() * conditions.length)];
}

// Funzione per aggiornare la condizione
function updateCondition() {
    const conditionElement = document.getElementById('condition');
    if (conditionElement) {
        conditionElement.textContent = getRandomCondition();
    }
}

// Funzione che ritorna la condizione attuale
function getCondition (){
    const condition_text = document.getElementById('condition').textContent;
    return condition_text;
}