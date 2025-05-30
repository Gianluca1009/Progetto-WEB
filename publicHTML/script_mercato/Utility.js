//----- FUNZIONI AUSILIARIE PER IL MERCATO ------//

//Funzione per ritornare dal DB i calciatori liberi
async function fetchCalciatoriLiberi() {
    if(LS_getUserMercatoData().id){
        const id_player = LS_getUserMercatoData().id;
        const data = await fetch(`/get_giocatori_mercato?id=${id_player}`);
        if(!data.ok){
            throw new Error("errore server");
        }
        results = await data.json();

        //Ordino i giocatori in ordine di prezzo decrescente
        results.sort((a, b) => b.prezzo - a.prezzo);
        return results;
    }
}

//Funzione che mette l'username nel campo dedicato dopo il login
function fillUsernameMercato(){
    window.player_username.textContent = `Benvenuto, ${LS_getUserMercatoData().username}`;
}

//Funzione per costruire la riga della rosa
function BuildRowForCalciatore(calciatore){
    //creo la riga
    const row = document.createElement('div');
    row.className = 'riga-bacheca';

    const img_pnt = document.createElement('img');
    img_pnt.src = "images/bacheche/punteruolo.png";
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
    nomeCognome.style.fontSize = 'min(1.5vw, 1.5em)';

    const informazioni = document.createElement('div');
    informazioni.className = 'informazioni';

    if(calciatore.nome == null) nomeCognome.textContent = `${calciatore.cognome}`;
    else nomeCognome.textContent = `${calciatore.nome} ${calciatore.cognome}`;

    //divisione in due liste

    const lista1 = document.createElement('ul');
    
    const lista2 = document.createElement('ul');

    //Itero sui campi giocatore per costruire la lista

    let keys = Object.keys(calciatore);
    keys = keys.filter(key => !['id', 'nome', 'cognome', 'url_foto', 'id_player', 'prezzo'].includes(key));

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

    //creo il bottone acquista
    const btn_acquista = document.createElement('button');
    btn_acquista.className = "btn-acquista";

    const spanbtn_acquista = document.createElement('span');
    spanbtn_acquista.className = 'button-top';
    spanbtn_acquista.classList.add('span-acquista');

    const span_top = document.createElement('div');
    span_top.className = 'span-top';
    const carrello = document.createElement('img');
    carrello.src = "images/bacheche/carrello.png";
    carrello.className = "carrello";
    span_top.appendChild(carrello);
    const top_text = document.createElement("p");
    top_text.className = "prezzo";
    top_text.textContent = "Acquista";
    span_top.appendChild(top_text);
    spanbtn_acquista.appendChild(span_top);

    const span_bottom = document.createElement('p');
    span_bottom.className = 'prezzo';
    span_bottom.textContent = `${calciatore.prezzo}Pt.`;
    spanbtn_acquista.appendChild(span_bottom);    

    //Acquisto calciatore
    btn_acquista.onclick = async () => {
        try {
            await acquistaCalciatore(calciatore,row);
        } catch (error) {
            console.error('Errore durante l\'acquisto:', error);
        }
    };
    btn_acquista.appendChild(spanbtn_acquista);
    row.appendChild(btn_acquista);

    //Aggiungi la riga alla finestra mercato
    row.classList.add("fade-hidden");
    
    window.bacheca.appendChild(row);
    makeVisible(row);
}

//Funzione che crea la riga che segnala il login non effettuato
function buildMessageNoResult() {
    const div_testi = document.createElement('div');
    div_testi.id = 'testo-no-result';
    div_testi.classList.add('hidden');
    div_testi.style.display = 'flex';
    div_testi.style.flexDirection = 'column';
    div_testi.style.alignItems = 'center';
    div_testi.style.justifyContent = 'center';
    div_testi.style.position = 'absolute';
    div_testi.style.top = '50%';
    div_testi.style.left = '50%';
    div_testi.style.transform = 'translate(-50%, -50%)';

    const titolo = document.createElement('h2');
    titolo.textContent = "NESSUN CALCIATORE TROVATO";
    titolo.style.fontSize = 'calc(1.2vw + 1.2vh)';
    titolo.style.color = 'aliceblue';
    titolo.style.margin = '0';
    titolo.style.webkitTextStroke = 'calc(0.03vh + 0.03vw) var(--color-crema)';

    const testo = document.createElement('p');
    testo.textContent = "Modifica i criteri di ricerca e riprova";
    testo.marginTop = '2%';
    testo.style.fontSize = 'calc(1vw + 1vh)';
    testo.style.color = 'aliceblue';
    testo.style.margin = '0';
    testo.style.webkitTextStroke = 'calc(0.02vh + 0.02vw) var(--color-crema)';

    div_testi.appendChild(titolo);
    div_testi.appendChild(testo);

    // Aggiunta alla finestra del mercato
    window.bacheca.appendChild(div_testi);
    makeVisible(div_testi);
}

// Funzione che crea la riga che segnala il login non effettuato
function buildMessageNoLogin() {

    const titolo = document.createElement('h2');
    titolo.id = 'titolo-no-login';
    titolo.textContent = `EFFETTUA IL LOGIN PER COMPRARE I CALCIATORI`;
    titolo.style.fontSize = 'calc(1.2vw + 1.2vh)';
    titolo.style.color = 'aliceblue';
    titolo.style.margin = '0';
    titolo.style.position = 'absolute';
    titolo.style.top = '50%';
    titolo.style.left = '50%';
    titolo.style.transform = 'translate(-50%, -50%)';
    titolo.style.textAlign = 'center';
    titolo.style.width = '100%';
    titolo.style.webkitTextStroke = 'calc(0.03vh + 0.03vw) var(--color-crema)';

    // Aggiunta alla finestra del mercato
    titolo.classList.add("hidden");
    window.bacheca.appendChild(titolo);
    makeVisible(titolo);
}

//Funzione per eliminare le righe della finestra mercato
function deleteRows() {
    window.bacheca.querySelectorAll('.riga-bacheca, .no-result').forEach(riga_calc => {
        riga_calc.remove();
    });
    if(document.getElementById('testo-no-result')) {
        document.getElementById('testo-no-result').remove();
    }
    if(document.getElementById('titolo-no-login')) {
        document.getElementById('titolo-no-login').remove();
    }
}

//Funzione per costruire il mercato (filtra attraverso il testo nella barra di ricerca e il valore del menù a tendina)
async function BuildMercato(inputNome, inputRuolo){
    if(LS_getUserMercatoData().id == null) {
        deleteRows();
        buildMessageNoLogin();
        return;
    }
    const results = await fetchCalciatoriLiberi();
    deleteRows();
    let i = 0;
    let risultatoRicerca = false;

    const nome = (inputNome || "").toLowerCase();

    while(i < results.length) {
        const calciatore = results[i]

        let nomeCognome;
        if(calciatore.nome == null) nomeCognome = `${calciatore.cognome}`;
        else nomeCognome = `${calciatore.nome} ${calciatore.cognome}`;
        nomeCognome = nomeCognome.toLowerCase(); // Contiene il nome completo del calciatore in lowercase
        let ruolo = calciatore.ruolo.toLowerCase(); // Contiene il ruolo del calciatore in lowercase

        if(inputRuolo === "qualsiasi") {
            if(nome) {
                if(nomeCognome.includes(nome)) {
                    BuildRowForCalciatore(calciatore);
                    risultatoRicerca = true;
                }
            }
            else {
                BuildRowForCalciatore(calciatore);
                risultatoRicerca = true;
            }
        }
        else {
            if(nome) {
                if(nomeCognome.includes(nome) && ruolo === inputRuolo) {
                    BuildRowForCalciatore(calciatore);
                    risultatoRicerca = true;
                }
            }
            else {
                if(ruolo === inputRuolo) {
                    BuildRowForCalciatore(calciatore);
                    risultatoRicerca = true;
                }
            }
        }

        i++;
    }
    if (!risultatoRicerca) {
        buildMessageNoResult();
    }
    setListeFontSize();
    setFontSizeAcquistaBtn();
}
