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
    campoFoto.className = 'campo_foto';
    const img = document.createElement('img');
    img.src = calciatore.url_foto;
    img.className = 'foto_calciatore';

    campoFoto.appendChild(img);

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
    bottone.className = "btn-compravendita"
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
    row.classList.add("fade-hidden");
    document.getElementById('finestramercato').appendChild(row);
    makeVisible(row);
}

function buildRowNoResult() {
    const row = document.createElement('div');
    row.className = 'riga_finestra no-result';

    // Campo info con messaggio
    const campoInfo = document.createElement('div');
    campoInfo.className = 'no-result';

    const titolo = document.createElement('h2');
    titolo.textContent = "Nessun giocatore trovato";
    titolo.style.fontSize = 'min(1.5vw, 1.5em)';
    titolo.style.marginBlockEnd = '0.5em';
    titolo.style.color = '#b22222'; // rosso scuro per enfasi

    const testo = document.createElement('p');
    testo.textContent = "Modifica i criteri di ricerca e riprova.";
    testo.style.fontSize = 'min(1vw, 1em)';
    testo.style.color = '#555';

    campoInfo.appendChild(titolo);
    campoInfo.appendChild(testo);
    row.appendChild(campoInfo);

    // Aggiunta alla finestra del mercato
    row.classList.add("fade-hidden");
    document.getElementById('finestramercato').appendChild(row);
    makeVisible(row);
}

function deleteRows() {
    const container = document.getElementById("finestramercato");

    container.querySelectorAll('.riga_finestra, .no-result').forEach(riga_calc => {
        riga_calc.remove();
    });
}


//Funzione per costruire la rosa
async function BuildMercato(inputNome, inputRuolo){
    const results = await fetchCalciatoriLiberi();
    deleteRows();
    let i = 0;
    let numeroRighe = 0;

    const nome = (inputNome || "").toLowerCase();

    function processNext() {
        if (i < results.length) {
            const calciatore = results[i]

            let nomeCognome;
            if(calciatore.nome == null) nomeCognome = `${calciatore.cognome}`;
            else nomeCognome = `${calciatore.nome} ${calciatore.cognome}`;
            nomeCognome = nomeCognome.toLowerCase();
            let ruolo = calciatore.ruolo.toLowerCase();
            i++;

            if(inputRuolo === "qualsiasi") {
                if(nome) {
                    if(nomeCognome.includes(nome)) {
                        BuildRowForCalciatore(calciatore);
                        numeroRighe++;
                    }
                }
                else {
                    BuildRowForCalciatore(calciatore);
                    numeroRighe++;
                }
            }
            else {
                if(nome) {
                    if(nomeCognome.includes(nome) && ruolo === inputRuolo) {
                        BuildRowForCalciatore(calciatore);
                        numeroRighe++;
                    }
                }
                else {
                    if(ruolo === inputRuolo) {
                        BuildRowForCalciatore(calciatore);
                        numeroRighe++;
                    }
                }
            }

            processNext();
        }
        else {
            if (numeroRighe === 0) {
                buildRowNoResult();
            }
        }
    }

    processNext(); // inizia il ciclo
}
