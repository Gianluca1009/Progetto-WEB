// Funzione che lancia il popup di fine partita
function launchEndgamePopup(){

    // Ottengo il nome del vincitore
    let vincitore = null;

    if(window.turno_bianco){
        vincitore = localStorage.getItem('game_username1');
        // aumentare le partite giocate
    }
    else{
        vincitore = localStorage.getItem('game_username2');
    }

    const end_game_popup = document.createElement('div');
    end_game_popup.classList.add('popup-gameover');
    end_game_popup.classList.add('hidden');
    end_game_popup.id = 'popup-gameover';
    end_game_popup.innerHTML = `
            <p class="title-gameover"> PARTITA TERMINATA </p>
            <p class="text-gameover">Congratulazioni ${vincitore} <br> +20 pt!</p>
            <div class="bottoni-gameover-container">
                 
                <button id="restartDraftButtonAtEnd" class="button-gameover" onclick = "restartDraft(); closeEndgamePopup();">
                    <span class="button_top top-gameover"> DRAFT </span>
                </button>

                <button id="HomeButtonAtEnd" class="button-gameover" onclick = "goHome(); closeEndgamePopup();">
                    <span class="button_top"> HOME </span>
                </button>

            </div>
        `;
    document.querySelector('.grid-container').appendChild(end_game_popup);
    makeVisible(end_game_popup);
}

// Funzione che chiude il popup di fine partita
function closeEndgamePopup(){
    const end_game_popup = document.getElementById('popup-gameover');
    makeHidden(end_game_popup);
    setTimeout(() => {
        end_game_popup.remove();
    }, 100);
}

function launchProfilePopup(){
    if(document.querySelector('.sezione-profilo').dataset.aperto == "false"){
        const profile_popup = document.createElement('div');
        profile_popup.classList.add('div-profilo');
        profile_popup.classList.add('hidden');
        profile_popup.id = 'profilo';
        profile_popup.innerHTML = `
                <strong style="top: 5%; position: absolute; font-size: 1.2vw">PROFILO</strong>
                <ul>
                    <li> <strong>Username:</strong>
                    ${LS_getUserMercatoData()[1]}</li>
                    <li> <strong>Email:</strong>
                    ${LS_getUserMercatoData()[4]}</li>
                    <li> <strong>Punti:</strong> 
                    ${LS_getUserMercatoData()[2]} Pt.</li>
                    <li> <strong>Partite:</strong>
                    ${LS_getUserMercatoData()[3]}</li>
                </ul>
            `;
        makeVisible(profile_popup, 0.5);
        document.querySelector('.container-bottoni-login').appendChild(profile_popup);
        setPositionRelativeToDiv(document.querySelector('.sezione-profilo'), profile_popup, 'bottom', 60);

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