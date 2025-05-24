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
            if (window.selected_image === event.target) {
                resetHighlighted();
                resetSuggerimenti(); //resetta i suggerimenti
                resetSelezione();
                return;
            }
            
            // Rimuovi l'evidenziazione precedente se presente
            if (window.selected_cell) {
                resetHighlighted();
                resetSuggerimenti();
            }
            // Seleziona l'elemento (pedina) da spostare
            window.selected_image = event.target;        //immagine della pedina selezionata
            window.selected_element = window.selected_image.parentElement; //div pezzo della pedina selezionata
            window.selected_cell = window.selected_element.parentElement; //cella della pedina selezionata

            // Verifica se è il turno corretto per muovere questa pedina
            if (!canMovePiece(window.selected_element.id)) {
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
            if (window.selected_element && this.tagName === "TD") {

                resetSuggerimenti();

                let pedinaAvanza = true;
                let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione

                //controlla che la mossia sia valida per le regole
                if (validationMove(window.selected_image, this)) {
                    
                    resetSuggerimenti();

                    //se la cella è libera
                    if (!pedinaBersaglio){
                        avanza(this); //SPOSTAMENTO PEDINA
                        playSound("mossa", 0.5);
                        let isPedonePromosso = upgradePedone(window.selected_image, this);
                        if (!isPedonePromosso) cambioTurno();
                        
            
                    }

                    //se c'è un bersaglio
                    if(pedinaBersaglio){

                        //condizione sfavorevole
                        if(!cattura(pedinaBersaglio,this)){
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
                                let isPedonePromosso = upgradePedone(window.selected_image, this);
                                if (!isPedonePromosso) cambioTurno();   //cambia turno solo se non c'è promozione del pedone in corso perchè update già fa promo
                        
                                
                            }
                        }
                        
                    } 
                    
                    
                                        
                }

                // Resetta la selezione e l'evidenziazione
                resetHighlighted();
                resetSelezione();   
            }
        });
    });
}

