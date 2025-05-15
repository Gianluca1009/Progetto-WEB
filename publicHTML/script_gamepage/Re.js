/*
*  INIZIO LOGICA DEL RE IN SCACCO
*/


window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
window.idCellReNero = "03"; //id della cella su cui c'è il re nero

window.cellaReBianco = document.getElementById(window.idCellReBianco);
window.cellaReNero = document.getElementById(window.idCellReNero);


//Funzione update variabili window posizione re (ovvero id cella dove è posiz)
// + pulisce la vecchia cella del re se sottoscacco
function update_re_position(img_pezzo, new_cell_re){
    //prima di cambiare posizione salvo la vecchia posiz del re
    let old_king_cell = (window.turnoBianco)? document.getElementById(window.idCellReBianco) : document.getElementById(window.idCellReNero);
    let div_pezzo = img_pezzo.parentElement;
    if (div_pezzo.id == "r"){
        window.idCellReBianco = new_cell_re.id;
        window.cellaReBianco =  document.getElementById(new_cell_re.id);
        resetSottoscacco_cella(old_king_cell); // ormai il re ha cambiato cella -> non più quella cella sotto scacco
    }
    if (div_pezzo.id == "R"){
        window.idCellReNero = new_cell_re.id;
        window.cellaReNero =  document.getElementById(new_cell_re.id);
        resetSottoscacco_cella(old_king_cell);
    }
    //il mio re non è più sottoscacco -> ripulisco la vecchia cella del re
    if(! check_mio_re_sottoscacco()){ 
         resetSottoscacco_cella(old_king_cell);
    }  
}

//Funzione che resetta la cella del re passata come parametro
function resetSottoscacco_cella(cella_re){
    cella_re.classList.remove('sottoscacco');
}

//Funzione che resetta la cella del re quando non è sottoscacco
function resetSottoscacco (){
    //se il mio re non è sottoscacco decoloro la cella
    if (window.turnoBianco){
        window.cellaReBianco.classList.remove("sottoscacco");
    }else{  
        window.cellaReNero.classList.remove("sottoscacco");
    }
}

function resetSottoscaccoAvversaro (){
    //se il re avv non è sottoscacco decoloro la cella
    if (!window.turnoBianco){
        window.cellaReBianco.classList.remove("sottoscacco");
    }else{  
        window.cellaReNero.classList.remove("sottoscacco");
    }
}

//Funzione che evidenzia il re se è sottoscacco
function highlight_re_if_sottoscacco(){ 
    //chech se metto re avversario sottoscacco quando muovo
    if(check_reAvversario_sottoscacco()){
        
        //se dal turno nero metto in scacco il re, il re è bianco
        if(window.turnoBianco){
            window.cellaReNero.classList.add('sottoscacco');
        //se dal turno bianco metto in scacco il re, il re è nero
        } 
        else{
            window.cellaReBianco.classList.add('sottoscacco');
        }  
    }
    else{
        resetSottoscaccoAvversaro();
    }
    //check se metto o tolgo il MIO re sottoscacco quando muovo
    if(check_mio_re_sottoscacco()){ //il mio re è sottoscacco con la mia mossa = ho perso
        if(!window.turnoBianco){
            window.cellaReNero.classList.add('sottoscacco');
        } 
        else{
            window.cellaReBianco.classList.add('sottoscacco');
        }
    }
    else{
        resetSottoscacco();
    }
    // NOTA:  PULIZIA DELLA CELLA SOTTOSCACCO IN UPDATE_RE_POSITION
}

//Funzione per controllare se l'ultima mossa fatta dall'avversario mette sotto scacco il proprio re
function check_reAvversario_sottoscacco(){
    //ho la cella del re AVVERSARIO
    //controllo su tutti i MIEI pezzi 
    //se qualcuno di questi ha una mossa valida sulla cella del re AVVERSARIO allora metto sono sottoscacco
    let sottoscacco = false;

    if (!window.turnoBianco){ 
       //logica inv -> dopo la mossa del nero controllo se il re bianco è messo sotto scacco
       let div_tutti_pezzi = document.querySelectorAll(".pedina");
       for (let div_pezzo of div_tutti_pezzi){
            //se è avversario controllo se può fare scacco
            if(!areSameColor(div_pezzo.id, 'r')){ //solo pezzi neri
                let img_pezzo_avversario = div_pezzo.firstChild;
                if(validationMove(img_pezzo_avversario, window.cellaReBianco)){
                    sottoscacco = true;
                    return sottoscacco;
                }
            }
       }
    }else{
        //dopo la mossa del bianco controllo se il re nero è messo sotto scacco
       let div_tutti_pezzi = document.querySelectorAll(".pedina");
       for (let div_pezzo of div_tutti_pezzi){
            //se è avversario controllo se può fare scacco
            if(!areSameColor(div_pezzo.id, 'R')){
                let img_pezzo_avversario = div_pezzo.firstChild;
                if(validationMove(img_pezzo_avversario, window.cellaReNero)){
                    sottoscacco = true;
                    return sottoscacco;
                }
            }
       }
    }
    return sottoscacco;
}

//Funzione per controllare se il mio re è in scacco
function check_mio_re_sottoscacco(){
    //ho la cella del MIO re
    //controllo su tutti i MIEI pezzi 
    //se qualcuno di questi ha una mossa valida sulla cella del re AVVERSARIO allora metto sono sottoscacco
    let sottscacco = false;
    if (window.turnoBianco){ 
       let div_tutti_pezzi = document.querySelectorAll(".pedina");
       for (let div_pezzo of div_tutti_pezzi){
            //se è avversario controllo se può fare scacco
            if(!areSameColor(div_pezzo.id, 'r')){ //solo pezzi neri
                let img_pezzo_avversario = div_pezzo.firstChild;
                if(validationMove(img_pezzo_avversario, window.cellaReBianco)){
                    sottscacco = true;
                    return sottscacco;
                }
            }
       }
    }else{
       let div_tutti_pezzi = document.querySelectorAll(".pedina");
       for (let div_pezzo of div_tutti_pezzi){
            //se è avversario controllo se può fare scacco
            if(!areSameColor(div_pezzo.id, 'R')){
                let img_pezzo_avversario = div_pezzo.firstChild;
                if(validationMove(img_pezzo_avversario, window.cellaReNero)){
                    sottscacco = true;
                    return sottscacco;
                }
            }
       }
    }
    return sottscacco;
}

//Funzione termina la partita se magio il re
function isReMangiato(pedina_mangiata){
    // Verifica se la pedina mangiata esiste ed è un re
    if (pedina_mangiata && (pedina_mangiata.id === 'r' || pedina_mangiata.id === 'R')){
        return true;
    }
    return false;
}

//Funzione per resettare il numero delle celle del re ad inizio partita
function resetNumCelleRe(){
    window.idCellReBianco = "53"; //id della cella su cui c'è il re bianco
    window.idCellReNero = "03"; //id della cella su cui c'è il re nero
}

//Funzione per resettare il colore della cella del re a prescindere dal turno
function resetColoreSottoscacco(){
    window.cellaReBianco.classList.remove("sottoscacco");
    window.cellaReNero.classList.remove("sottoscacco");
}
/*
*  FINE LOGICA DEL RE IN SCACCO
*/