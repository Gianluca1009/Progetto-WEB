// Funzione che lancia il popup di fine partita
function launchEndgamePopup(){

    // Ottengo il nome del vincitore
    let vincitore = window.turnoBianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');

    const endGamePopup = document.createElement('div');
    endGamePopup.classList.add('popup-gameover');
    endGamePopup.classList.add('hidden');
    endGamePopup.id = 'popup-gameover';
    endGamePopup.innerHTML = `
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
    document.querySelector('.grid-container').appendChild(endGamePopup);
    makeVisible(endGamePopup);
}

function closeEndgamePopup(){
    const endGamePopup = document.getElementById('popup-gameover');
    makeHidden(endGamePopup);
    setTimeout(() => {
        endGamePopup.remove();
    }, 100);
}