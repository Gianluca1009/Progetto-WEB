
function fetchCalciatoriLiberi() {
    const results = fetch('/get_giocatori_mercato')
    return results.json();
}

function BuildRowForCalciatore(calciatore){
    const row = document.createElement('div');
    row.className = 'riga_mercato';
    document.getElementById('mercato').appendChild(row);
    console.log("creata riga per:" ,calciatore);
}

function BuildMercato(){
    results = fetchCalciatoriLiberi();
    for (let i = 0; i < results.length; i++){
        const calciatore = results[i];
        BuildRowForCalciatore(calciatore);
    }
}
