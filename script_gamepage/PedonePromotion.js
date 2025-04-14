//promuove il pedone se arriva in fondo 
function upgrade_pedone(img_pedina, cella_dest){
    let current_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(current_row == 0){
            makeVisible(document.getElementById("div_ped_promotion"));
            list_pedPromotion(div_pedina, img_pedina, window.turnoBianco);
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(current_row == 5){
            makeVisible(document.getElementById("div_ped_promotion"));
            list_pedPromotion(div_pedina, img_pedina, window.turnoBianco);
        } 
    }
}

function list_pedPromotion(pedina_d, img_pedina, turnoBianco){
    // Rimuovo event listener esistenti prima di aggiungerne di nuovi
    const PulsanteReginaVecchio = document.getElementById('pedonepromotion_regina');  //prende le celle della tabella di promozione
    const PulsanteCavalloVecchio = document.getElementById('pedonepromotion_cavallo');
    
    // Rimuovo vecchi listener usando cloni della tabella perche sui vecchi rimane il listener precedente
    const PulsanteReginaNuovo = PulsanteReginaVecchio.cloneNode(true);  //sostituisce con nuove celle nella tabella di promozione
    const PulsanteCavalloNuovo = PulsanteCavalloVecchio.cloneNode(true);

    //scambia le celle vecchie con quelle nuove per eliminare i vecchi listener

    PulsanteReginaVecchio.parentNode.replaceChild(PulsanteReginaNuovo, PulsanteReginaVecchio);      
    PulsanteCavalloVecchio.parentNode.replaceChild(PulsanteCavalloNuovo, PulsanteCavalloVecchio);
    
    // Aggiungo nuovi listener che agiscono solo sul pedone attuale
    document.getElementById('pedonepromotion_regina').addEventListener('click', () =>{
        tipo = 'regina';
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
        tipo = 'cavallo';
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

