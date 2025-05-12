async function fetchCalciatoriLiberi() {
    const data = await fetch('/get_giocatori_mercato');
    results = await data.json();
    return results;
}

//Funzione che mette l'username nel campo dedicato dopo il login
function fillUsernameMercato(){
    document.getElementById("playerusername").textContent = `Benvenuto, ${LS_getUserMercatoData()[1]}`;
}

//Funzione per costruire la riga della rosa
function BuildRowForCalciatore(calciatore){
    //creo la riga
    const row = document.createElement('div');
    row.className = 'riga_finestra';

    //creo il campo foto nella riga
    const campoFoto = document.createElement('div');
    campoFoto.className = 'campo_foto';
    const img = document.createElement('img');
    img.src = calciatore.url_foto;
    img.className = 'foto_calciatore';

    const img_graff = document.createElement('img');
    img_graff.src = "images/graffetta.png";
    img_graff.style.position = "absolute";
    img_graff.style.width = "20%";
    img_graff.style.aspectRatio = "1/1";
    img_graff.style.top = "0";
    img_graff.style.left = "0";
    campoFoto.appendChild(img);
    campoFoto.appendChild(img_graff);

    //creo il campo info nella riga

    const campoInfo = document.createElement('div');
    campoInfo.className = 'campo_info';
    const nomeCognome = document.createElement('h2');
    nomeCognome.style.marginBlockEnd = '0.20em';
    nomeCognome.style.fontSize = 'min(1.5vw, 1.5em)';

    const informazioni = document.createElement('div');
    informazioni.className = 'informazioni';

    if(calciatore.nome == null) nomeCognome.textContent = `${calciatore.cognome}`;
    else nomeCognome.textContent = `${calciatore.nome} ${calciatore.cognome}`;

    //divisione in due liste

    const lista1 = document.createElement('ul');
    lista1.style.marginBlockStart = '0.20em';
    
    const lista2 = document.createElement('ul');
    lista2.style.marginBlockStart = '0.20em';

    //Itero sui campi giocatore per costruire la lista

    keys = Object.keys(calciatore);
    keys = keys.filter(key => !['id', 'nome', 'cognome', 'url_foto', 'id_player'].includes(key));

    for(const key of keys){
        if(key == 'presenze') break;
        const li = document.createElement('li');
        li.textContent = `${KeyConverter(key)}: ${calciatore[key]}`;
        if(key == 'data_nascita'){
            li.textContent = `${KeyConverter(key)}: ${convertDate(calciatore[key])}`;
        }
        lista1.appendChild(li);
    }

    let start = false;
    for(const key of keys){
        if(key == 'presenze') start = true;
        if(start){
            const li = document.createElement('li');
            li.textContent = `${KeyConverter(key)}: ${calciatore[key]}`;
            lista2.appendChild(li);
        }
    }

    informazioni.appendChild(lista1);
    informazioni.appendChild(lista2);
    campoInfo.appendChild(nomeCognome);
    campoInfo.appendChild(informazioni);
    row.appendChild(campoFoto);
    row.appendChild(campoInfo);

    //creo il bottone compra

    const bottone = document.createElement('button');
    const spanbottone = document.createElement('span');
    spanbottone.textContent = 'Acquista';
    spanbottone.className = 'button_top';
    spanbottone.style.position = 'absolute';
    spanbottone.style.right = "5%";
    bottone.style.position = 'absolute';
    bottone.style.right = "5%";
    bottone.style.height = "30%";
    bottone.style.top = "50%";
    //log d'acquisto
    bottone.onclick = async () => {
        try {
            await ListAcquista(calciatore,bottone);
        } catch (error) {
            console.error('Errore durante l\'acquisto:', error);
        }
    };
    bottone.appendChild(spanbottone);
    row.appendChild(bottone);
    document.getElementById('finestramercato').appendChild(row);
}

//Funzione per costruire la rosa
async function BuildMercato(){
    results = await fetchCalciatoriLiberi();
    for (let i = 0; i < results.length; i++){
        const calciatore = results[i];
        BuildRowForCalciatore(calciatore);
    }
}
