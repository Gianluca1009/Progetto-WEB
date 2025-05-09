async function fetchCalciatoriLiberi() {
    const data = await fetch('/get_giocatori_mercato')
    results = await data.json();
    return results;
}

function KeyConverter(key){
    keytoReturn = key.replace(/_/g, ' ');
    keytoReturn = keytoReturn.charAt(0).toUpperCase() + keytoReturn.slice(1);
    return keytoReturn;
}

// Funzione per convertire la data in formato italiano
function convertDate(stringa){
    const mesi = {"01": "Gennaio", "02": "Febbraio", "03": "Marzo", "04": "Aprile", "05": "Maggio", "06": "Giugno",
     "07": "Luglio", "08": "Agosto", "09": "Settembre", "10": "Ottobre", "11": "Novembre", "12": "Dicembre"};
    const anno = stringa.substring(0,4);
    const mese = mesi[stringa.substring(5,7)];
    const giorno = stringa.substring(8);
    
    return `${giorno} ${mese} ${anno}`;

}


function BuildRowForCalciatore(calciatore){
    const row = document.createElement('div');
    row.className = 'riga_mercato';
    const campoFoto = document.createElement('div');
    campoFoto.className = 'campo_foto';
    const img = document.createElement('img');
    img.src = calciatore.url_foto;
    campoFoto.appendChild(img);
    const campoInfo = document.createElement('div');
    campoInfo.className = 'campo_info';
    const nomeCognome = document.createElement('h2');
    nomeCognome.textContent = `${calciatore.nome} ${calciatore.cognome}`;
    const ul_info = document.createElement('ul');
    console.log("tipo:",typeof calciatore);

    //Itero sui campi giocatore per costruire la lista
    Object.keys(calciatore).forEach(key => {
        if(key != 'url_foto' && key != 'id_player' && key != 'id' && key != 'nome' && key != 'cognome'){
            const info = document.createElement('li');
            if (key === 'data_nascita') {
                info.textContent = `${KeyConverter(key)}: ${convertDate(calciatore[key])}`;
            } else if (key === 'nazionalita') {
                info.textContent = `${KeyConverter(key)}: ${calciatore[key].toUpperCase()}`;
            } else if (key === 'ruolo') {
                info.textContent = `${KeyConverter(key)}: ${calciatore[key].toUpperCase()}`;
            } else {
                info.textContent = `${KeyConverter(key)}: ${calciatore[key]}`;
            }
            info.textContent = `${KeyConverter(key)}: ${calciatore[key]}`;
            ul_info.appendChild(info);
        }
    })
    campoInfo.appendChild(nomeCognome);
    campoInfo.appendChild(ul_info);
    row.appendChild(campoFoto);
    row.appendChild(campoInfo);
    document.getElementById('finestramercato').appendChild(row);
}

async function BuildMercato(){
    results = await fetchCalciatoriLiberi();
    for (let i = 0; i < results.length; i++){
        const calciatore = results[i];
        BuildRowForCalciatore(calciatore);
    }
}
