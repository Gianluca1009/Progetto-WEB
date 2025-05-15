//Funzione per recuperare la rosa dal db
async function fetchMiaRosa(){
    try{
        if (LS_get_idPlayerRose()){
            const id_player = LS_get_idPlayerRose();
            const data = await fetch(`/get_giocatori_rosa?id=${id_player}`);
            if(!data.ok){
                throw new Error("errore server");
            }
            const results = await data.json();
            return results;
            
        }
        else{
            console.log("utente non loggato");
        }
    }catch (error){
        console.error(error);
    }
    
}

//Funzione che mette l'username nel campo dedicato dopo il login
function fillUsernameRosa(){
    document.getElementById("playerusername").textContent = `Benvenuto, ${LS_get_usernamePlayerRose()}`;
}

//Funzione per costruire la riga della rosa
function BuildRowForCalciatore(calciatore){
    //creo la riga
    const row = document.createElement('div');
    row.className = 'riga_finestra';

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
    campoFoto.className = 'campo_foto';
    const img = document.createElement('img');
    img.src = calciatore.url_foto;
    img.className = 'foto_calciatore';
    // const img_graff = document.createElement('img');
    // img_graff.src = "images/graffetta.png";
    // img_graff.style.position = "absolute";
    // img_graff.style.width = "20%";
    // img_graff.style.aspectRatio = "1/1";
    // img_graff.style.top = "0";
    // img_graff.style.left = "0";
    campoFoto.appendChild(img);
    // campoFoto.appendChild(img_graff);

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

    //Aggiungo tutto

       //creo il bottone vendi

    const bottone = document.createElement('button');
    const spanbottone = document.createElement('span');
    spanbottone.textContent = 'Vendi';
    spanbottone.className = 'button_top';
    spanbottone.style.position = 'absolute';
    spanbottone.style.right = "5%";
    bottone.style.position = 'absolute';
    bottone.style.right = "5%";
    bottone.style.height = "30%";
    bottone.style.top = "50%";
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
    document.getElementById('finestrarosa').appendChild(row);
    makeVisible(row);
}

//Funzione per costruire la rosa
async function BuildRosa(){
    results = await fetchMiaRosa();
    let i=0;
    function processNext() {
        if (i < results.length) {
            BuildRowForCalciatore(results[i]);
            i++;
            setTimeout(processNext, 50); // dà respiro al browser
        }
    }

    processNext(); // inizia il ciclo
}