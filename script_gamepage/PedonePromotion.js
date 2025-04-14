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
    
    setDivPosition(cella_dest);  //imposta la posizione del div_scelte a destra della cella del pedone
        
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(current_row == 0){
            makeVisible(divPromotion);
            list_pedPromotion(div_pedina, img_pedina, true); // Passa true perché è un pedone bianco
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(current_row == 5){
            makeVisible(divPromotion);
            list_pedPromotion(div_pedina, img_pedina, false); // Passa false perché è un pedone nero
        } 
    }
}

function list_pedPromotion(pedina_d, img_pedina, turnoBianco){
    // Rimuovo event listener esistenti prima di aggiungerne di nuovi
    const PulsanteReginaVecchio = document.getElementById('pedonepromotion_regina');  //prende le celle della tabella di promozione
    const PulsanteCavalloVecchio = document.getElementById('pedonepromotion_cavallo');
    
    // Aggiorno esplicitamente le immagini (anche se già fatto in upgrade_pedone)
    if (turnoBianco) {
        PulsanteReginaVecchio.src = "images/pedine/regina_bianca.png";
        PulsanteCavalloVecchio.src = "images/pedine/cavallo_bianco.png";
    } else {
        PulsanteReginaVecchio.src = "images/pedine/regina_nera.png";
        PulsanteCavalloVecchio.src = "images/pedine/cavallo_nero.png";
    }
    
    // Rimuovo vecchi listener usando cloni della tabella perche sui vecchi rimane il listener precedente
    const PulsanteReginaNuovo = PulsanteReginaVecchio.cloneNode(true);  //sostituisce con nuove celle nella tabella di promozione
    const PulsanteCavalloNuovo = PulsanteCavalloVecchio.cloneNode(true);

    // Aggiorno anche le immagini nei cloni (importante!)
    if (turnoBianco) {
        PulsanteReginaNuovo.src = "images/pedine/regina_bianca.png";
        PulsanteCavalloNuovo.src = "images/pedine/cavallo_bianco.png";
    } else {
        PulsanteReginaNuovo.src = "images/pedine/regina_nera.png";
        PulsanteCavalloNuovo.src = "images/pedine/cavallo_nero.png";
    }

    //scambia le celle vecchie con quelle nuove per eliminare i vecchi listener
    PulsanteReginaVecchio.parentNode.replaceChild(PulsanteReginaNuovo, PulsanteReginaVecchio);      
    PulsanteCavalloVecchio.parentNode.replaceChild(PulsanteCavalloNuovo, PulsanteCavalloVecchio);
    
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
    });
}

