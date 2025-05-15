
function get_condition (){
    const condition_text = document.getElementById('condition').textContent;
    return condition_text;
}


function logica_mangiata(div_calc_att, div_calc_dif){  //true se l'att magna 
    const cond = get_condition();

    calc_att = JSON.parse(div_calc_att.children[0].dataset.json);  //classi giocatore ottenute parsando il json di text.id
    calc_dif = JSON.parse(div_calc_dif.children[0].dataset.json);  //classi difensore ottenute parsando il json di text.id

    if (cond === "Goal segnati in carriera"){
        console.log("goal attuale: " + calc_att.goal + " goal difensore: " + calc_dif.goal);
       return calc_att.goal > calc_dif.goal;
    }
    if (cond === "Assist forniti in carriera"){
        console.log("assist attuale: " + calc_att.assist + " assist difensore: " + calc_dif.assist);
        return calc_att.assist > calc_dif.assist;
    }
    if (cond === "Presenze collezionate in carriera"){
        console.log("presenze attuale: " + calc_att.presenze + " presenze difensore: " + calc_dif.presenze);
        return calc_att.presenze > calc_dif.presenze;
    }
    if (cond === "Minor numero di cartellini gialli in carriera"){
        console.log("cartellini gialli attuale: " + calc_att.cartellini_gialli + " cartellini gialli difensore: " + calc_dif.cartellini_gialli);
        return calc_att.cartellini_gialli < calc_dif.cartellini_gialli;
    }
    if (cond === "Minor numero di cartellini rossi in carriera"){
        console.log("cartellini rossi attuale: " + calc_att.cartellini_rossi + " cartellini rossi difensore: " + calc_dif.cartellini_rossi);
        return calc_att.cartellini_rossi < calc_dif.cartellini_rossi;
    }
    if (cond === "Numero di maglia più alto"){
        console.log("numero maglia attuale: " + calc_att.numero_maglia + " numero maglia difensore: " + calc_dif.numero_maglia);
        return calc_att.numero_maglia > calc_dif.numero_maglia;
    }
    if (cond === "Numero di trofei vinti in carriera"){
        console.log("trofei attuale: " + calc_att.trofei + " trofei difensore: " + calc_dif.trofei);
        return calc_att.trofei > calc_dif.trofei;
    }
    if (cond === "Record di goal stagionale"){
        console.log("record goal attuale: " + calc_att.record_goal + " record goal difensore: " + calc_dif.record_goal);
        return calc_att.record_goal > calc_dif.record_goal;
    }
    if (cond === "Giocatore più alto"){
        console.log("altezza attuale: " + calc_att.altezza + " altezza difensore: " + calc_dif.altezza);
        return calc_att.altezza >= calc_dif.altezza;
    }
    if (cond === "Record di assist stagionale"){
        console.log("record assist attuale: " + calc_att.record_assist + " record assist difensore: " + calc_dif.record_assist);
        return calc_att.record_assist > calc_dif.record_assist;

    }else{
        console.log("condizione di confronto per mangiata inesistente");
        return false;
    }
}


//logica mangiata pedina
function mangia(pedinaBersaglio, cella_dest) {  //div -> pedinaBersaglio
    // Se la cella di destinazione contiene la pedina bersaglio
    if (pedinaBersaglio && cella_dest.contains(pedinaBersaglio)) {
        if(logica_mangiata(window.selectedElement, pedinaBersaglio)){
            pedinaBersaglio.remove();
            avanza(cella_dest); // Sposta la pedina selezionata nella cella di destinazione
            return true;
        }else{

            // messaggio di errore

            // Swal.fire({
            // title: 'Errore',
            // text: 'La pedina avversaria ha respinto l\'attacco!',
            // icon: 'error',
            // showConfirmButton: false,
            // width: '20vw',
            // timer: 1000,
            // customClass: {
            //     htmlContainer: 'swal-text',
            //     title: 'swal-title',
            // },
            // });

            const LogPopup = document.createElement('div');
            LogPopup.classList.add('log-mangiata');
            LogPopup.classList.add('hidden');

            const logText = document.createElement('p');
            nomeDifensore = pedinaBersaglio.children[1].textContent;
            logText.innerHTML = `${nomeDifensore}<br>ha respinto l'attacco!`;
            logText.style.display = 'flex';
            logText.style.justifyContent = 'center';
            logText.style.fontSize = 'calc(0.8vw + 0.5vh)';
            LogPopup.appendChild(logText);

            document.querySelector('.grid-container').appendChild(LogPopup);
             
            //gestisco visibilita elemento
            makeVisible(LogPopup,0.3);
            setTimeout(() => {
                makeHidden(LogPopup,0.6);
                setTimeout(() => {
                    LogPopup.remove();
                }, 500);
            }, 1200);
            return false;
        }
    }    
}