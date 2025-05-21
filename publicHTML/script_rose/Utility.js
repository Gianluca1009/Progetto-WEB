//Funzione per recuperare la rosa dal db
async function fetchMiaRosa(){
    try{
        if (LS_getUserRosaData().id){
            const id_player = LS_getUserRosaData().id;
            const data = await fetch(`/get_giocatori_rosa?id=${id_player}`);
            if(!data.ok){
                throw new Error("errore server");
            }
            const results = await data.json();
            return results;
            
        }
        else{
            console.log("utente non loggato");
            return [];
        }
    }catch (error){
        console.error(error);
    }
    
}

//Funzione che mette l'username nel campo dedicato dopo il login
function fillUsernameRosa(){
    document.getElementById("player-username").textContent = `Benvenuto, ${LS_getUserRosaData().username}`;
}

// Popola gli array di finestra dividendo i calciatori della rosa per ruolo
function dividiPerRuolo(calciatore) {

    if(calciatore.ruolo === "Difensore") {
        difensori.push(calciatore);
    }

    if(calciatore.ruolo === "Centrocampista") {
        centrocampisti.push(calciatore);
    }

    if(calciatore.ruolo === "Attaccante") {
        attaccanti.push(calciatore);
    }
}

// Crea il titolo per ogni ruolo
function buildTitoloRuolo(ruolo) {

    const titolo = document.createElement('h3');
    titolo.className = "title-ruolo";
    titolo.textContent = ruolo;
    window.bacheca.appendChild(titolo)
}

//Funzione per costruire la riga della rosa
function BuildRowForCalciatore(calciatore){
    //creo la riga
    const row = document.createElement('div');
    row.className = 'riga-bacheca';

    //creo il punteruolo
    const img_pnt = document.createElement('img');
    img_pnt.src = "images/punteruolo.png";
    img_pnt.style.width = "8%";
    img_pnt.style.aspectRatio = "1/1";
    img_pnt.style.position = "absolute";
    img_pnt.style.top = "0";
    img_pnt.style.left = "0";
    img_pnt.style.transform = "translate(-25%, -25%)";
    img_pnt.style.zIndex = "1000";
    row.appendChild(img_pnt);

    //creo il campo foto nella riga
    const campoFoto = document.createElement('div');
    campoFoto.className = 'campo-foto';
    const img = document.createElement('img');
    img.src = calciatore.url_foto;
    img.className = 'foto-calciatore';

    campoFoto.appendChild(img);

    //creo il campo info nella riga

    const campoInfo = document.createElement('div');
    campoInfo.className = 'campo-info';
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


    //creo il bottone vendi

    const bottone = document.createElement('button');
    const spanbottone = document.createElement('span');
    bottone.style.position = 'absolute';
    bottone.className = "btn-vendi";
    spanbottone.textContent = 'Vendi';
    spanbottone.className = 'button-top';
    
    //log da vendita
    bottone.onclick = async () => {
        try {
            await ListVendi(calciatore,bottone);
        } catch (error) {
            console.error('Errore durante la vendita:', error);
        }
    };
    bottone.appendChild(spanbottone);
    row.appendChild(bottone);

    row.classList.add("fade-hidden");

    window.bacheca.appendChild(row);
    makeVisible(row);
}

//Crea la riga per comunicare che non si hanno calciatori di un determinato ruolo
function buildRowNoResult(ruolo) {
    const row = document.createElement('div');
    row.className = 'riga-bacheca no-result';
    row.id = 'no-result';

    // Campo info con messaggio
    const campoInfo = document.createElement('div');
    campoInfo.className = 'no-result';

    const titolo = document.createElement('h2');
    titolo.textContent = `Nessun ${ruolo} trovato`;
    titolo.style.fontSize = 'min(1.5vw, 1.5em)';
    titolo.style.marginBlockEnd = '0.5em';
    titolo.style.color = 'black'; // rosso scuro per enfasi

    const testo = document.createElement('p');
    testo.textContent = "Vai a comprare quelli che vuoi nella pagina del mercato!";
    testo.style.fontSize = 'min(1vw, 1em)';
    testo.style.color = '#555';

    campoInfo.appendChild(titolo);
    campoInfo.appendChild(testo);
    row.appendChild(campoInfo);

    // Aggiunta alla finestra del mercato
    row.classList.add("fade-hidden");
    window.bacheca.appendChild(row);
    makeVisible(row);
}

// Svuota le bacheca eliminandone il contenuto
function svuotaBacheca() {
  window.bacheca.querySelectorAll("*").forEach(el => el.remove());
}

// Mostra la rosa nella bacheca
async function BuildRosa(){
    results = await fetchMiaRosa();

    let i=0;
    while(i < results.length) {
        calciatore = results[i];
        dividiPerRuolo(calciatore);
        i++;
    }

    // SEZIONE DIFENSORI
    buildTitoloRuolo("Difensori");

    // Crea una riga per ogni difenisore posseduto
    if(difensori.length > 0) {
        window.difensori.forEach(difensore => {
            BuildRowForCalciatore(difensore)
        });
    } else {
        buildRowNoResult("difensore");
    }

    // SEZIONE CENTROCAMPISTI
    buildTitoloRuolo("Centrocampisti");

    // Crea una riga per ogni centrocampista posseduto
    if(centrocampisti.length > 0) {
        window.centrocampisti.forEach(centrocampista => {
            BuildRowForCalciatore(centrocampista)
        });
    } else {
        buildRowNoResult("centrocampista");
    }

    // SEZIONE ATTACCANTI
    buildTitoloRuolo("Attaccanti");

    // Crea una riga per ogni attaccante posseduto
    if(attaccanti.length > 0) {
        window.attaccanti.forEach(attaccante => {
            BuildRowForCalciatore(attaccante)
        });
    } else {
        buildRowNoResult("attaccante");
    }
}