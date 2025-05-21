// Funzione che crea l'overlay scuro per i popup
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('hidden');
    document.querySelector('.game-container').appendChild(overlay);
    makeVisible(overlay);
}

// Funzione per rimuovere l'overlay
function deleteOverlay(){
    const overlay = document.querySelector('.overlay');
    if(overlay){
        makeHidden(overlay);
        setTimeout(() => {
            overlay.remove();
        }, 100);
    }
}

// Funzione che lancia il popup di fine partita
function launchEndgamePopup(vincitore){

    const end_game_popup = document.createElement('div');
    end_game_popup.classList.add('popup-gameover');
    end_game_popup.classList.add('hidden');
    end_game_popup.id = 'popup-gameover';
    end_game_popup.innerHTML = `
            <p class="title-gameover"> PARTITA TERMINATA </p>
            <p class="text-gameover">Congratulazioni ${vincitore} <br> +20 pt!</p>
            <div class="bottoni-gameover-container">
                 
                <button id="restartDraftButtonAtEnd" class="button-gameover" onclick = "restartDraft();">
                    <span class="button-top top-gameover"> DRAFT </span>
                </button>

                <button id="HomeButtonAtEnd" class="button-gameover" onclick = "goHome(); closeEndgamePopup();">
                    <span class="button-top"> HOME </span>
                </button>

            </div>
        `;
    createOverlay();
    document.querySelector('.game-container').appendChild(end_game_popup);
    makeVisible(end_game_popup);
}

// Funzione che chiude il popup di fine partita
function closeEndgamePopup(){
    const end_game_popup = document.getElementById('popup-gameover');
    makeHidden(end_game_popup);
    setTimeout(() => {
        end_game_popup.remove();
    }, 100);
    deleteOverlay();
}

// Funzione che lancia il popup del profilo
function launchProfilePopup(pagina){
    let Username, Email, Punti, Partite, Vittorie;
    if(pagina == "mercato"){
        Username = LS_getUserMercatoData().username;
        Email = LS_getUserMercatoData().email;
        Punti = LS_getUserMercatoData().punti;
        Partite = LS_getUserMercatoData().partite;
        Vittorie = LS_getUserMercatoData().vittorie;
    }
    if(pagina === "rosa"){
        Username = LS_getUserRosaData().username;
        Email = LS_getUserRosaData().email;
        Punti = LS_getUserRosaData().punti;
        Partite = LS_getUserRosaData().partite;
        Vittorie = LS_getUserRosaData().vittorie;
    }
    
    if(document.querySelector('.sezione-profilo').dataset.aperto == "false"){
        const profile_popup = document.createElement('div');
        profile_popup.classList.add('div-profilo');
        profile_popup.classList.add('hidden');
        profile_popup.id = 'profilo';
        profile_popup.innerHTML = `
                <strong style="top: 5%; position: absolute; font-size: 1.2vw">PROFILO</strong>
                <ul style="padding: 0;">
                    <li> <strong>Username:</strong>
                    ${Username}</li>
                    <li> <strong>Email:</strong>
                    ${Email}</li>
                    <li> <strong>Punti:</strong> 
                    ${Punti} Pt.</li>
                    <li> <strong>Partite:</strong>
                    ${Partite}</li>
                    <li> <strong>Storico:</strong>
                    ${Vittorie}-${Partite-Vittorie}</li>
                </ul>
            `;
        makeVisible(profile_popup, 0.5);
        document.querySelector('.container-bottoni-login').appendChild(profile_popup);
        setPositionRelativeToDiv(document.querySelector('.sezione-profilo'), profile_popup, 'bottom', 35);

        //GESTIONE DELLA RIMOZIONE DIV PROFILO
        setTimeout( () => {
            document.addEventListener("click", closeProfilePopup)
        }, 100);
        document.querySelector('.sezione-profilo').dataset.aperto = "true";
    }
    else{
        closeProfilePopup();
    }
}

// Funzione che chiude il popup del profilo
function closeProfilePopup(){
    if(document.getElementById("profilo")){
        makeHidden(document.getElementById("profilo"), 0.5);
        setTimeout(() => {
            document.getElementById("profilo").remove();
        },1000);
    }
    document.querySelector('.sezione-profilo').dataset.aperto = "false";
    document.removeEventListener("click", closeProfilePopup);
}

// Funzione che lancia il popup delle statistiche del calciatore nello specifico
function launchPopupStatistiche(calciatore, div_info, posizione, isFromRosa){
    // Controlla se esiste già un div con le statistiche e rimuovilo
    if (document.querySelector('.statistiche-draft')) {
        document.querySelector('.statistiche-draft').remove();
    }


    const keys = Object.keys(calciatore).filter(key => !['id', 'nome', 'cognome', 'img_url', 'id_player', 'data_nascita', 'squadra', 'ruolo', 'isFromRosa'].includes(key));

    const divStatistiche = document.createElement('div');
    divStatistiche.classList.add('statistiche-draft');
    if(isFromRosa) divStatistiche.style.background = "var(--gold)";

    const sfondo = document.createElement('img');
    sfondo.src = isFromRosa? "images/statistiche_rosa.png" : "images/statistiche.png";
    sfondo.style.objectFit = "cover";
    sfondo.style.position = "absolute";
    sfondo.style.bottom = "0";
    sfondo.style.width = "100%";
    sfondo.style.zIndex = "100001";
    sfondo.style.height = "70%";
    divStatistiche.appendChild(sfondo);

    const freccia = document.createElement('img');
    freccia.src = (posizione === "sinistra") ? "images/frecciadestra.png" : "images/frecciasinistra.png";
    freccia.classList.add(posizione === "sinistra" ? "freccia-destra" : "freccia-sinistra");
    divStatistiche.appendChild(freccia);

    const listaStatistiche = document.createElement('ul');
    listaStatistiche.style.zIndex = "100002";
    for (const key of keys) {
            const li = document.createElement('li');
            li.innerHTML = `<strong> ${KeyConverter(key)}</strong>:  ${calciatore[key]}`;
            listaStatistiche.appendChild(li);
    }
    divStatistiche.appendChild(listaStatistiche);

    div_info.parentElement.appendChild(divStatistiche);

    setPositionRelativeToDiv(
    div_info,
    divStatistiche,
    posizione === "sinistra" ? "right" : "left",
    posizione === "sinistra" ? 42 : 91
    );
}

// Funzione che chiude il popup delle statistiche
function closePopupStatistiche(){
    document.addEventListener('click', () => {
        document.querySelectorAll('.statistiche-draft').forEach(div => {
            div.remove(); // Rimuovi il div delle statistiche
        });
    });
}

// Funzione per lanciare il popup di riavvio del draft
function launchRestartDraftPopup(){
    const restart_draft_popup = document.createElement('div');
    restart_draft_popup.classList.add('popup-gameover');
    restart_draft_popup.style.height = "25%";
    restart_draft_popup.classList.add('hidden');
    restart_draft_popup.id = 'popup-restart-draft';
    restart_draft_popup.innerHTML = `
            <p class="text-gameover">Riavviare il draft?</p>
            <button id="confirmRestart" style="width: 35%; height: 20%;" onclick = "restartDraft();">
                <span class="button-top" style="font-size: calc(0.6vh + 0.6vw)"> CONFERMA </span>
            </button>
            <p style="font-size: calc(0.6vh + 0.6vw); cursor: pointer; border-bottom: 1px solid black;" onclick = "closeRestartDraftPopup();" >CONTINUA A GIOCARE</p>

        `;
    createOverlay();
    document.querySelector('.game-container').appendChild(restart_draft_popup);
    makeVisible(restart_draft_popup);
}

// Funzione che chiude il popup di riavvio del draft
function closeRestartDraftPopup(){
    const restart_draft_popup = document.getElementById('popup-restart-draft');
    makeHidden(restart_draft_popup);
    setTimeout(() => {
        restart_draft_popup.remove();
    }, 100);
    deleteOverlay();
}