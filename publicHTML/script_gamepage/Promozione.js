const grid_container = document.querySelector('.grid-container');
let div_promotion = null; // Sarà creato dinamicamente quando necessario

// Funzione per creare il div di promozione pedone dinamicamente
function createPromotionDiv() {
    // Se il div è già stato creato, rimuoviamolo prima
    if (div_promotion) {
        div_promotion.remove();
    }
    
    // Crea il div principale
    div_promotion = document.createElement('div');
    div_promotion.id = 'div_ped_promotion';
    div_promotion.className = 'div-scelte';
    
    // Crea la struttura HTML con createElement
    const table = document.createElement('table');
    table.className = 'tabella-pedone-promotion';
    
    const tbody = document.createElement('tbody');
    
    // Prima riga per la Regina
    const tr_regina = document.createElement('tr');
    const td_regina = document.createElement('td');
    td_regina.className = 'foto-ped-promotion';
    
    const santino_div_regina = document.createElement('div');
    santino_div_regina.className = 'santino-container';
    
    const img_regina = document.createElement('img');
    img_regina.alt = 'regina';
    img_regina.id = 'pedonepromotion_regina';
    img_regina.className = 'regina';
    
    santino_div_regina.appendChild(img_regina);
    td_regina.appendChild(santino_div_regina);
    tr_regina.appendChild(td_regina);
    
    // Seconda riga per il Cavallo
    const tr_çavallo = document.createElement('tr');
    const td_cavallo = document.createElement('td');
    td_cavallo.className = 'foto-ped-promotion';
    
    const santino_div_cavallo = document.createElement('div');
    santino_div_cavallo.className = 'santino-container';
    
    const img_cavallo = document.createElement('img');
    img_cavallo.alt = 'cavallo';
    img_cavallo.id = 'pedonepromotion_cavallo';
    img_cavallo.className = 'cavallo';
    
    santino_div_cavallo.appendChild(img_cavallo);
    td_cavallo.appendChild(santino_div_cavallo);
    tr_çavallo.appendChild(td_cavallo);
    
    // Assembla la struttura
    tbody.appendChild(tr_regina);
    tbody.appendChild(tr_çavallo);
    table.appendChild(tbody);
    div_promotion.appendChild(table);
    
    // Aggiungi il div al grid-container
    grid_container.appendChild(div_promotion);
    
    // Nascondi inizialmente il div
    div_promotion.classList.add('hidden');
    
    return div_promotion;
}

// Funzione per la logica di promozione
function helperPromozione(pedina_d, img_pedina, turno_bianco) {
    const stile = getStyle(); // "MODERN" o "CLASSIC"
    const colore = turno_bianco ? 'bianco' : 'nero';

    const idImgRegina = 'pedonepromotion_regina';
    const idImgCavallo = 'pedonepromotion_cavallo';

    // Funzione per aggiornare l'immagine del bottone
    function aggiornaImg(idElemento, tipo) {
        const elem = document.getElementById(idElemento);
        elem.src = pezzi[tipo].img[stile][colore];
        return elem.cloneNode(true); // clona per rimuovere listener vecchi
    }

    // Aggiorna e sostituisce le immagini dei bottoni
    const nuovaRegina = aggiornaImg(idImgRegina, 'regina');
    const nuovaCavallo = aggiornaImg(idImgCavallo, 'cavallo');

    document.getElementById(idImgRegina).replaceWith(nuovaRegina);
    document.getElementById(idImgCavallo).replaceWith(nuovaCavallo);

    // Funzione comune per gestire la promozione
    function gestisciPromozione(tipo) {
        pedina_d.id = pezzi[tipo].id[colore];
        img_pedina.src = pezzi[tipo].img[stile][colore];
        makeHidden(document.getElementById("div_ped_promotion"));

        // Rimuove indicatori di scacco
        const reB = document.getElementById(window.idCellReBianco);
        const reN = document.getElementById(window.idCellReNero);
        reB.classList.remove('sottoscacco');
        reN.classList.remove('sottoscacco');

        // Controlli scacco
        if (check_mio_re_sottoscacco()) {
            (turno_bianco ? reB : reN).classList.add('sottoscacco');
        }

        if (check_reAvversario_sottoscacco()) {
            (turno_bianco ? reN : reB).classList.add('sottoscacco');
        }

        cambioTurno();
        aggiornaStatoPedine();
    }

    // Aggiunta listener ai nuovi elementi
    nuovaRegina.addEventListener('click', () => gestisciPromozione('regina'));
    nuovaCavallo.addEventListener('click', () => gestisciPromozione('cavallo'));
}

// Funzione per trasformare il pedone in un altro pezzo (regina o cavallo)
function upgradePedone(img_pedina, cella_dest){
    let current_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    let is_pedone_promosso = false;
    
    //controllo se il pedone è arrivato in fondo alla scacchiera
    if ((div_pedina.id === "p" && current_row === 0) || (div_pedina.id === "P" && current_row === 5)) {
        createPromotionDiv();
        setPositionRelativeToDiv(cella_dest, div_promotion, 'right', 1);
        makeVisible(div_promotion);
        disabilitaPedine();
        helperPromozione(div_pedina, img_pedina, div_pedina.id === "p"); // true per bianco, false per nero
        is_pedone_promosso = true;
    }
    return is_pedone_promosso;
}

