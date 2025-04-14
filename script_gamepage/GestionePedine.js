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
            addHighlighted();
            SuggerisciMosse();
        });
    });

    function mangia(pedinaBersaglio,cella_dest){
        //controllo condizione per mangiare la pedina
        
        if(cella_dest.hasChildNodes() && pedinaBersaglio){    //se la cella di destinazione ha già una pedina,
            cella_dest.removeChild(pedinaBersaglio);          //la rimuovo
        }
    }

    // SELEZIONA LA CELLA DI DESTINAZIONE
    document.querySelectorAll(".greencell, .creamcell").forEach(cell => {
        cell.addEventListener("click", function(event) {
            if (window.selectedElement && this.tagName === "TD") {
                let pedinaBersaglio = this.querySelector('.pedina');  //pedina contenuta nella cella di destinazione
                // Verifica se la mossa è valida secondo le regole degli scacchi
                if (validationMove(window.selectedImage, this)) {
                
                    mangia(pedinaBersaglio,this); //mangia la pedina bersaglio
                    this.appendChild(window.selectedElement);
                    // Verifica se il re è stato mangiato
                        //isReMangiato(pedinaBersaglio);
                    //promozione del pedone se arriva alla fine della scacchiera 
                    if(!isReMangiato(pedinaBersaglio)){
                        upgrade_pedone(window.selectedImage, this);
                    }
                    //resetta la selezione delle mosse suggerite
                    resetSuggerimenti();
                    //update posizione del re + reset della cella del re se non più in scacco
                    update_re_position(window.selectedImage, this);
                    //controlla se dopo la mossa corrente mette sottoscacco  il re dell'AVVERSARIO (LOGICA INV)
                    highlight_re_if_sottoscacco();

                    cambioTurno();  
                    
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

