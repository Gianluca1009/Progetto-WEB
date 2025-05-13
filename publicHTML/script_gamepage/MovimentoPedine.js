// Nota: le funzioni sono definite nel file utility.js e sono accessibili globalmente

/*
*    LISTENER PER MUOVERE LE PEDINE:
*           1. seleziona il pezzo che voglio muovere 
*           2. seleziona la cella di destinazione dove voglio spostare il pezzo -> se valida -> sposta il pezzo in quella cella
*/

// SELEZIONA LA PEDINA
function ListenerMovimentoPedine(){
    document.querySelectorAll(".greencell .pedina, .creamcell .pedina").forEach(pedina => {
        pedina.addEventListener("click", function(event) {
            event.stopPropagation();

            // Se clicchiamo sulla stessa pedina già selezionata, deseleziona tutto
            if (window.selectedImage === event.target) {
                resetHighlighted();
                resetSuggerimenti(); //resetta i suggerimenti
                resetSelezione();
                return;
            }
            
            // Rimuovi l'evidenziazione precedente se presente
            if (window.selectedCell) {
                resetHighlighted();
                resetSuggerimenti();
            }
            // Seleziona l'elemento (pedina) da spostare
            window.selectedImage = event.target;        //immagine della pedina selezionata
            window.selectedElement = window.selectedImage.parentElement; //div pezzo della pedina selezionata
            window.selectedCell = window.selectedElement.parentElement; //cella della pedina selezionata

            // Verifica se è il turno corretto per muovere questa pedina
            if (!canMovePiece(window.selectedElement.id)) {
                resetSelezione();
                return;
            }
            // Evidenzia la cella sorgente e le caselle disponibili
            playSound("selezione", 0.6);
            addHighlighted();
            SuggerisciMosse();
        });
    });

    // SELEZIONA LA CELLA DI DESTINAZIONE
    document.querySelectorAll(".greencell, .creamcell").forEach(cell => {
        cell.addEventListener("click", function(event) {
            if (window.selectedElement && this.tagName === "TD") {
                let pedinaAvanza = true;
                let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione
                // Verifica se la mossa è valida secondo le regole degli scacchi
                if (validationMove(window.selectedImage, this)) {
                
                    if(pedinaBersaglio){
                        if(! mangia(pedinaBersaglio,this) ) pedinaAvanza = false; //mangia la pedina bersaglio se presente e condiz vera
                        playSound("mangia", 0.7);
                    } 
                    else{
                        avanza(this); //SPOSTAMENTO PEDINA
                        playSound("mossa", 0.5);
                    }
                    resetSuggerimenti();        //resetta la selezione delle mosse suggerite

                    if (pedinaAvanza) update_re_position(window.selectedImage, this);     // reset della cella del re se non più in scacco
                    
                    highlight_re_if_sottoscacco();      //controlla se dopo la mossa corrente mette sottoscacco il re dell'AVVERSARIO (LOGICA INV) 
               
                    //CONTROLLA SIA LO STATO DEL RE, SIA PROMUOVE IL PEDONE SE IL RE E' VIVO
                    if(!isReMangiato(pedinaBersaglio) && pedinaAvanza){
                        let isPedonePromosso = upgrade_pedone(window.selectedImage, this);

                        // Cambio turno solo se non c'è promozione del pedone in corso
                        if (!isPedonePromosso) {
                            cambioTurno();
                        }
                    //pedina non avanza e re vivo
                    } else if(!isReMangiato(pedinaBersaglio)) {
                            cambioTurno();
                        }
                    else {
                        let vincitore = window.turnoBianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
                        // Se il re è stato mangiato, cambia comunque il turno
                        cambioTurno();
            
                        Swal.fire({
                            title: null,
                            html: `
                            <div>
                                <p class="title-gameover"> PARTITA TERMINATA </p>
                                <p class="text-gameover">Congratulazioni ${vincitore} <br> +20 pt!</p>
                                <div class="bottoni-gameover-container">
                                    
                                    <button id="restartDraftButtonAtEnd" class="button-gameover" onclick = "restartDraft()">
                                        <span class="button_top top-gameover"> RIGIOCA DRAFT </span>
                                    </button>

                                    <button id="HomeButtonAtEnd" class="button-gameover" onclick = "goHome()">
                                        <span class="button_top"> HOME </span>
                                    </button>

                                </div>
                            </div>
                            `,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'no-title-padding',
                                htmlContainer: 'popup-gameover',
                            },
                            didOpen: () => {
                                const titleEl = document.querySelector('.swal2-title');
                                if (titleEl) titleEl.remove();
                            }
                        });
                        window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
                        window.idCellReNero = "03"; //id della cella su cui c'è il re nero
                        //clean scacchiera
                    }
                }

                // Resetta la selezione e l'evidenziazione
                resetHighlighted();
                resetSelezione();   
                highlight_re_if_sottoscacco(); // controllo se il mio re è sottoscacco 
            }
        });
    });
}
// Inizializza lo stato delle pedine all'avvio
aggiornaStatoPedine();

