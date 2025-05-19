// ---- AGGIORNAMENTO RISOLUZIONE ---- //

window.addEventListener('resize', function() {
    setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatore
});

// ---- INIZIALIZZAZIONE DEL GIOCO ---- //
// Inizializza il gioco quando la pagina si carica

document.addEventListener('DOMContentLoaded', () => {

    setHamburgerLunghezza(); // Imposta la lunghezza del menu hamburger

    isSessioneAperta(); //Gestione della sessione aperta
    
    preloadSounds();    // Pre-carico i suoni
    setSoccerPlayerNameFontSize();  // Imposta la grandezza del font dei nomi dei calciatori
    StartPosition();
    updateCondition(); // Aggiorna la condizione iniziale   

    //ELEMENTI DA NASCONDERE ALL'INIZIO (sezioni, condizione,switch,timer,pedine)
    document.querySelector('.sezione_sx').classList.add('hidden');
    document.querySelector('.sezione_dx').classList.add('hidden');
    document.querySelector('.switch').classList.add('hidden');
    document.querySelector('.background-overlay').classList.add('hidden');
    document.querySelector('.condition-container').classList.add('hidden');
    document.querySelector('.progress-container').classList.add('hidden');
    document.querySelector('.tunnel-sx').classList.add('hidden');
    document.querySelector('.tunnel-dx').classList.add('hidden');
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('hidden');
    })

    //ELEMENTI DISABILITATI
    document.querySelector('.background').classList.add('disabled');
    document.querySelector('.grid-container').classList.add('disabled');

    // LISTENER PER IL BOTTONE PRINCIPALE GIOCA
    document.getElementById('giocaButton').addEventListener('click', () => {
        if(LS_getUser1Game()[0] != null && LS_getUser2Game()[0] != null){
            preparaSounds();        // Inizializza i suoni al primo click
            startDraft();                    // Prepara il draft
            scrollToGameContainer();    // Scroll naturale con ritardo e velocità variabile
            aggiornaStatoPedine();     // Inizializza lo stato delle pedine all'avvio
            
        } else {
            Swal.fire('Accedi per scendere in campo!');
        }
    });


    //LISTENER SUL RICARICA DELLA PAGINA
    window.addEventListener('beforeunload', (event) => {
        if(window.game_started){
            event.preventDefault();
            event.returnValue = 'Se lasci la pagina ora, perderai la partita.';
            return event.returnValue;
        }
    });


    // PERMETTE DI NON FAR VEDERE IL MENU DI CONTESTO PER IL GAME CONTAINER COL TASTO DESTRO 
    document.querySelectorAll('.riga_draft').forEach(container => {
        container.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });


    // PERMETTE DI RIDURRE AL MINIMO I RITARDI DEI SUONI
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            window.audioCtx.resume().then(() => {
                forzaAudio(); // suona un colpo vuoto
            });
        }
    });


    //LISTENER PER IL MENU HAMBURGER
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('gamepage');
    });
    
});