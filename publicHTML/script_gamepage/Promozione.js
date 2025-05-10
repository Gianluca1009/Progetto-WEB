const gridContainer = document.querySelector('.grid-container');
const divPromotion = document.getElementById("div_ped_promotion");
const ReginaSostitutiva = document.getElementById("pedonepromotion_regina");
const CavalloSostitutivo = document.getElementById("pedonepromotion_cavallo");

function setDivPosition(cella_dest){

    // Posiziona il div_scelte alla destra della cella del pedone
    
    const cellRect = cella_dest.getBoundingClientRect(); //ottiene le dimensioni e la posizione della cella
    const gridRect = gridContainer.getBoundingClientRect(); //ottiene le dimensioni e la posizione della griglia
    
    // Calcola la posizione relativa rispetto al contenitore della griglia
    const relativeLeft = ((cellRect.right - gridRect.left) / gridRect.width) * 100;
    const relativeTop = ((cellRect.top - gridRect.top + cellRect.height/2) / gridRect.height) * 100;
    
    // Imposta la posizione del div di promozione
    divPromotion.style.left = `${relativeLeft+0.1}%`;
    divPromotion.style.top = `${relativeTop}%`;
    divPromotion.style.transform = 'translateY(-50%)';

}

function upgrade_pedone(img_pedina, cella_dest){
    let current_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    let isPedonePromosso = false;
    
    setDivPosition(cella_dest);  //imposta la posizione del div_scelte a destra della cella del pedone
        
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(current_row == 0){
            makeVisible(divPromotion);
            disabilitaPedine(); // Disabilita tutte le pedine quando divPromotion diventa visibile
            ListenerPromozione(div_pedina, img_pedina, true); // Passa true perché è un pedone bianco
            isPedonePromosso = true;
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(current_row == 5){
            makeVisible(divPromotion);
            disabilitaPedine(); // Disabilita tutte le pedine quando divPromotion diventa visibile
            ListenerPromozione(div_pedina, img_pedina, false); // Passa false perché è un pedone nero
            isPedonePromosso = true;
        } 
    }
    
    return isPedonePromosso;
}

function ListenerPromozione(pedina_d, img_pedina, turnoBianco){
    // Rimuovo event listener esistenti prima di aggiungerne di nuovi
    const CellaReginaVecchia = document.getElementById('pedonepromotion_regina');  //prende le celle della tabella di promozione
    const CellaCavalloVecchia = document.getElementById('pedonepromotion_cavallo');
    
    // Aggiorno esplicitamente le immagini (anche se già fatto in upgrade_pedone)
    if (turnoBianco) {
        if(getStyle() == "MODERN"){
            CellaReginaVecchia.src = "images/pedine/regina_bianca.png";
            CellaCavalloVecchia.src = "images/pedine/cavallo_bianco.png";
        }
        else{
            CellaReginaVecchia.src = "images/pedine/regina_bianca_prova.png";
            CellaCavalloVecchia.src = "images/pedine/cavallo_bianco_prova.png";
        }
    } else {
        if(getStyle() == "MODERN"){
            CellaReginaVecchia.src = "images/pedine/regina_nera.png";
            CellaCavalloVecchia.src = "images/pedine/cavallo_nero.png";
        }
        else{
            CellaReginaVecchia.src = "images/pedine/regina_nera_prova.png";
            CellaCavalloVecchia.src = "images/pedine/cavallo_nero_prova.png";
        }
    }
    
    // Rimuovo vecchi listener usando cloni della tabella perche sui vecchi rimane il listener precedente
    const CellaReginaNuova = CellaReginaVecchia.cloneNode(true);  //sostituisce con nuove celle nella tabella di promozione
    const CellaCavalloNuova = CellaCavalloVecchia.cloneNode(true);

    // Aggiorno anche le immagini nei cloni (importante!)
    if (turnoBianco) {
        if(getStyle() == "MODERN"){
            CellaReginaNuova.src = "images/pedine/regina_bianca.png";
            CellaCavalloNuova.src = "images/pedine/cavallo_bianco.png";
        }
        else{
            CellaReginaNuova.src = "images/pedine/regina_bianca_prova.png";
            CellaCavalloNuova.src = "images/pedine/cavallo_bianco_prova.png";
        }
    } else {
        if(getStyle() == "MODERN"){
            CellaReginaNuova.src = "images/pedine/regina_nera.png";
            CellaCavalloNuova.src = "images/pedine/cavallo_nero.png";
        }
        else{
            CellaReginaNuova.src = "images/pedine/regina_nera_prova.png";
            CellaCavalloNuova.src = "images/pedine/cavallo_nero_prova.png";
        }
    }

    //scambia le celle vecchie con quelle nuove per eliminare i vecchi listener
    CellaReginaVecchia.parentNode.replaceChild(CellaReginaNuova, CellaReginaVecchia);      
    CellaCavalloVecchia.parentNode.replaceChild(CellaCavalloNuova, CellaCavalloVecchia);
    
    // Aggiungo nuovi listener che agiscono solo sul pedone attuale
    document.getElementById('pedonepromotion_regina').addEventListener('click', () =>{
        let tipo = 'regina';
        //modifica il div con un nuovo pezzo
        if(turnoBianco){
            pedina_d.id = pezzi[tipo].id.bianco;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            pedina_d.id = pezzi[tipo].id.nero;
            img_pedina.src = pezzi[tipo].img.nero;
        }
        makeHidden(document.getElementById("div_ped_promotion"));
        
        // Rimuoviamo l'indicatore visuale di scacco da entrambi i re
        let cella_reBianco = document.getElementById(window.idCellReBianco);
        let cella_reNero = document.getElementById(window.idCellReNero);
        cella_reBianco.classList.remove('sottoscacco');
        cella_reNero.classList.remove('sottoscacco');
        
        // Verifichiamo se il mio re è sotto scacco dopo la promozione
        highlight_re_if_sottoscacco();
        
        // Cambio turno dopo la promozione
        cambioTurno();
        
        // Riabilita le pedine dopo la promozione
        aggiornaStatoPedine();
    });

    document.getElementById('pedonepromotion_cavallo').addEventListener('click', () =>{
        let tipo = 'cavallo';
        //modifica il div con un nuovo pezzo
        if(turnoBianco){
            pedina_d.id = pezzi[tipo].id.bianco;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            pedina_d.id = pezzi[tipo].id.nero;
            img_pedina.src = pezzi[tipo].img.nero;
        }
        makeHidden(document.getElementById("div_ped_promotion"));
        
        // Rimuoviamo l'indicatore visuale di scacco da entrambi i re
        let cella_reBianco = document.getElementById(window.idCellReBianco);
        let cella_reNero = document.getElementById(window.idCellReNero);
        cella_reBianco.classList.remove('sottoscacco');
        cella_reNero.classList.remove('sottoscacco');
        
        // Verifichiamo se il mio re è sotto scacco dopo la promozione
        if (check_mio_re_sottoscacco()) {
            // Se il re è sotto scacco, aggiungiamo la classe
            if (turnoBianco) {
                cella_reBianco.classList.add('sottoscacco');
            } else {
                cella_reNero.classList.add('sottoscacco');
            }
        }
        
        // Verifichiamo se il re avversario è sotto scacco dopo la promozione
        if (check_reAvversario_sottoscacco()) {
            // Se il re avversario è sotto scacco, aggiungiamo la classe
            if (turnoBianco) {
                cella_reNero.classList.add('sottoscacco');
            } else {
                cella_reBianco.classList.add('sottoscacco');
            }
        }
        
        // Cambio turno dopo la promozione
        cambioTurno();
        
        // Riabilita le pedine dopo la promozione
        aggiornaStatoPedine();
    });
}

