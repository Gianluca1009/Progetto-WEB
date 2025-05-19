// Funzione che lancia il popup di fine partita
function launchEndgamePopup(){

    // Ottengo il nome del vincitore
    let vincitore = window.turno_bianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');

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

function closeEndgamePopup(){
    const end_game_popup = document.getElementById('popup-gameover');
    makeHidden(end_game_popup);
    setTimeout(() => {
        end_game_popup.remove();
    }, 100);
}