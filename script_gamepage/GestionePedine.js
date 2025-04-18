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
                let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione
                // Verifica se la mossa è valida secondo le regole degli scacchi
                if (validationMove(window.selectedImage, this)) {
                
                    if(pedinaBersaglio){
                        mangia(pedinaBersaglio,this); //mangia la pedina bersaglio se presente
                        playSound("mangia", 0.7);
                    } 
                    else{
                        avanza(this); //SPOSTAMENTO PEDINA
                        playSound("mossa", 0.5);
                    }
                    resetSuggerimenti();        //resetta la selezione delle mosse suggerite
                        
                    update_re_position(window.selectedImage, this);     // reset della cella del re se non più in scacco
                    
                    highlight_re_if_sottoscacco();      //controlla se dopo la mossa corrente mette sottoscacco il re dell'AVVERSARIO (LOGICA INV) 
                    
                    
                    //CONTROLLA SIA LO STATO DEL RE, SIA PROMUOVE IL PEDONE SE IL RE E' VIVO
                    if(!isReMangiato(pedinaBersaglio)){
                        let isPedonePromosso = upgrade_pedone(window.selectedImage, this);

                        // Cambio turno solo se non c'è promozione del pedone in corso
                        if (!isPedonePromosso) {
                            cambioTurno();
                        }
                    } else {
                        // Se il re è stato mangiato, cambia comunque il turno
                        cambioTurno();
                    }
                }

                // Resetta la selezione e l'evidenziazione
                resetHighlighted();
                resetSelezione();   
            }
        });
    });
}
// Inizializza lo stato delle pedine all'avvio
aggiornaStatoPedine();

