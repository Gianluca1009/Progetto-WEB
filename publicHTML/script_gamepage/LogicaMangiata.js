
function get_condition (){
    const condition_text = document.getElementById('condition').textContent;
}


function logica_mangiata(div_calc_att, div_calc_dif){  //true se l'att magna 
    const cond = get_condition();

    if (cond === "Goal segnati in carriera"){
       return calc_att.goal >= calc_dif.goal;
    }
    if (cond === "Assist forniti in carriera"){
        return calc_att.assist >= calc_dif.assist;
    }
    if (cond === "Presenze collezionate in carriera"){
        return calc_att.presenza >= calc_dif.presenza;
    }
    if (cond === "Minor numero di cartellini gialli in carriera"){
        return calc_att.cartellini_gialli <= calc_dif.cartellini_gialli;
    }
    if (cond === "Minor numero di cartellini rossi in carriera"){
        return calc_att.cartellini_rossi <= calc_dif.cartellini_rossi;
    }
    if (cond === "Numero di maglia attuale più alto"){
        return calc_att.numero_maglia >= calc_dif.numero_maglia;
    }
    if (cond === "Numeri di trofei vinti in carriera"){
        return calc_att.trofei >= calc_dif.trofei;
    }
    if (cond === "Record di goal stagionale"){
        return calc_att.record_goal >= calc_dif.record_goal;
    }
    if (cond === "Giocatore più alto"){
        return calc_att.altezza >= calc_dif.altezza;
    }
    if (cond === "Record di assist stagionale"){
        return calc_att.record_assist>= calc_dif.record_assist;

    }else{
        return false;
        console.log("condizione di confronto per mangiata inesistente");
    }
}


//logica mangiata pedina
function mangia(pedinaBersaglio, cella_dest) {  //div -> pedinaBersaglio

    let td
    // Se la cella di destinazione contiene la pedina bersaglio
    if (pedinaBersaglio && cella_dest.contains(pedinaBersaglio)) {
        //prendo ogg calciatore di ped bersagli
        //div - img.id = json oggetto
        //prendo ogg calciatore di ped attacco
        //prendo la condizione e confronto
        pedinaBersaglio.remove();
    }

    // Sposto la pedina selezionata nella cella di destinazione
    avanza(cella_dest);
}