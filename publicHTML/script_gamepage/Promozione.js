const gridContainer = document.querySelector('.grid-container');
let divPromotion = null; // Sarà creato dinamicamente quando necessario

// Funzione per creare il div di promozione pedone dinamicamente
function createPromotionDiv() {
    // Se il div è già stato creato, rimuoviamolo prima
    if (divPromotion) {
        divPromotion.remove();
    }
    
    // Crea il div principale
    divPromotion = document.createElement('div');
    divPromotion.id = 'div_ped_promotion';
    divPromotion.className = 'div_scelte';
    
    // Crea la struttura HTML con createElement
    const table = document.createElement('table');
    table.className = 'tabella_pedone_promotion';
    
    const tbody = document.createElement('tbody');
    
    // Prima riga per la Regina
    const trRegina = document.createElement('tr');
    const tdRegina = document.createElement('td');
    tdRegina.className = 'foto_ped_promotion';
    
    const santinoDivRegina = document.createElement('div');
    santinoDivRegina.className = 'santino-container';
    
    const imgRegina = document.createElement('img');
    imgRegina.alt = 'regina';
    imgRegina.id = 'pedonepromotion_regina';
    imgRegina.className = 'regina';
    
    santinoDivRegina.appendChild(imgRegina);
    tdRegina.appendChild(santinoDivRegina);
    trRegina.appendChild(tdRegina);
    
    // Seconda riga per il Cavallo
    const trCavallo = document.createElement('tr');
    const tdCavallo = document.createElement('td');
    tdCavallo.className = 'foto_ped_promotion';
    
    const santinoDivCavallo = document.createElement('div');
    santinoDivCavallo.className = 'santino-container';
    
    const imgCavallo = document.createElement('img');
    imgCavallo.alt = 'cavallo';
    imgCavallo.id = 'pedonepromotion_cavallo';
    imgCavallo.className = 'cavallo';
    
    santinoDivCavallo.appendChild(imgCavallo);
    tdCavallo.appendChild(santinoDivCavallo);
    trCavallo.appendChild(tdCavallo);
    
    // Assembla la struttura
    tbody.appendChild(trRegina);
    tbody.appendChild(trCavallo);
    table.appendChild(tbody);
    divPromotion.appendChild(table);
    
    // Aggiungi il div al grid-container
    gridContainer.appendChild(divPromotion);
    
    // Nascondi inizialmente il div
    divPromotion.classList.add('hidden');
    
    return divPromotion;
}

function upgrade_pedone(img_pedina, cella_dest){
    let current_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    let isPedonePromosso = false;
    
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(current_row == 0){
            // Crea il div di promozione dinamicamente
            createPromotionDiv();
            // Posiziona il div
            setPositionRelativeToDiv(cella_dest, divPromotion, 'right', 1);
            makeVisible(divPromotion);
            disabilitaPedine(); // Disabilita tutte le pedine quando divPromotion diventa visibile
            ListenerPromozione(div_pedina, img_pedina, true); // Passa true perché è un pedone bianco
            isPedonePromosso = true;
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(current_row == 5){
            console.log('promozione nero ok!')
            // Crea il div di promozione dinamicamente
            createPromotionDiv();
            // Posiziona il div
            setPositionRelativeToDiv(cella_dest, divPromotion, 'right', 1);
            makeVisible(divPromotion);
            disabilitaPedine(); // Disabilita tutte le pedine quando divPromotion diventa visibile
            ListenerPromozione(div_pedina, img_pedina, false); // Passa false perché è un pedone nero
            isPedonePromosso = true;
        } 
    }
    
    return isPedonePromosso;
}

function ListenerPromozione(pedina_d, img_pedina, turnoBianco){
    // Ottieni i riferimenti alle immagini dal div creato dinamicamente
    const CellaReginaVecchia = document.getElementById('pedonepromotion_regina');
    const CellaCavalloVecchia = document.getElementById('pedonepromotion_cavallo');
    
    // Imposta le immagini corrette in base al turno e allo stile
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
    
    // Rimuovi eventuali listener precedenti creando nuove versioni degli elementi
    const CellaReginaNuova = CellaReginaVecchia.cloneNode(true);
    const CellaCavalloNuova = CellaCavalloVecchia.cloneNode(true);

    // Aggiorna le immagini anche nei cloni
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

    // Sostituisci gli elementi vecchi con quelli nuovi per rimuovere i listener precedenti
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

