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

         
            resetSuggerimenti();

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

                resetSuggerimenti();

                let pedinaAvanza = true;
                let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione

                //controlla che la mossia sia valida per le regole
                if (validationMove(window.selectedImage, this)) {
                    
                    resetSuggerimenti();

                    //se la cella è libera
                    if (!pedinaBersaglio){
                        avanza(this); //SPOSTAMENTO PEDINA
                        playSound("mossa", 0.5);
                        let isPedonePromosso = upgrade_pedone(window.selectedImage, this);
                        if (!isPedonePromosso) cambioTurno();
                        
            
                    }

                    //se c'è un bersaglio
                    if(pedinaBersaglio){

                        //condizione sfavorevole
                        if(!mangia(pedinaBersaglio,this)){
                            pedinaAvanza = false;               //pedina non avanzata
                            cambioTurno();
                        }

                        //condizione favorevole
                        else{
                            pedinaAvanza = true;               //pedina avanzata
                            playSound("mangia", 0.7);
                            
                            //se il ho mangiato il re
                            if(isReMangiato(pedinaBersaglio)){
                                resetSottoscacco();
                                endGame();

                            }

                            //se ho mangiato un pezzo avversario diverso dal re
                            else{
                                let isPedonePromosso = upgrade_pedone(window.selectedImage, this);
                                if (!isPedonePromosso) cambioTurno();   //cambia turno solo se non c'è promozione del pedone in corso perchè update già fa promo
                        
                                
                            }
                        }
                        
                    } 
                    
                    
                                        
                }

                // Resetta la selezione e l'evidenziazione
                //highlight_re_if_sottoscacco();
                resetHighlighted();
                resetSelezione();   
            }
        });
    });
}

