//----- GESTIONE DELLA LOGICA DI CATTURA ------//

// Funzione che calcola variabili di cattura e le passa alla funzione cattura
function helperCattura(div_calc_att, div_calc_dif){  //true se l'att magna 
    const cond = getCondition();

    calc_att = JSON.parse(div_calc_att.children[0].dataset.json);  //classi giocatore ottenute parsando il json di text.id
    calc_dif = JSON.parse(div_calc_dif.children[0].dataset.json);  //classi difensore ottenute parsando il json di text.id

    if (cond === "Goal segnati in carriera"){
       return {"valid": calc_att.goal >= calc_dif.goal,
                "val_att": calc_att.goal,
                "val_dif": calc_dif.goal,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco? "images/loghi_condizioni/goal_nero.png" : "images/loghi_condizioni/goal_bianco.png",
                "cond":  "Goal"};
    }
    if (cond === "Assist forniti in carriera"){
        return {"valid": calc_att.assist >= calc_dif.assist,
                "val_att": calc_att.assist,
                "val_dif": calc_dif.assist,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/assist_nero.png" : "images/loghi_condizioni/assist_bianco.png",
                "cond":  "Assist"};
    }
    if (cond === "Presenze collezionate in carriera"){
        return {"valid": calc_att.presenze >= calc_dif.presenze,
                "val_att": calc_att.presenze,
                "val_dif": calc_dif.presenze,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/presenze_nero.png" : "images/loghi_condizioni/presenze_bianco.png",
                "cond":  "Presenza"};
    }
    if (cond === "Minor numero di cartellini gialli in carriera"){
        return {"valid": calc_att.cartellini_gialli <= calc_dif.cartellini_gialli,
                "val_att": calc_att.cartellini_gialli,
                "val_dif": calc_dif.cartellini_gialli,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/cartellino_giallo_nero.png" : "images/loghi_condizioni/cartellino_giallo_bianco.png",
                "cond":  "Cartellini Gialli"};
    }
    if (cond === "Minor numero di cartellini rossi in carriera"){
        return {"valid": calc_att.cartellini_rossi <= calc_dif.cartellini_rossi,
                "val_att": calc_att.cartellini_rossi,
                "val_dif": calc_dif.cartellini_rossi,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/cartellino_rosso_nero.png" : "images/loghi_condizioni/cartellino_rosso_bianco.png",
                "cond":  "Cartellini Rossi"};
    }
    if (cond === "Numero di maglia più alto"){
        return {"valid": calc_att.numero_maglia >= calc_dif.numero_maglia,
                "val_att": calc_att.numero_maglia,
                "val_dif": calc_dif.numero_maglia,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/numero_maglia_nero.png" : "images/loghi_condizioni/numero_maglia_bianco.png",
                "cond":  "Numero Maglia"};
    }
    if (cond === "Numero di trofei vinti in carriera"){
        return {"valid": calc_att.trofei >= calc_dif.trofei,
                "val_att": calc_att.trofei,
                "val_dif": calc_dif.trofei,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/trofei_nero.png" : "images/loghi_condizioni/trofei_bianco.png",
                "cond":  "Trofei"};
    }
    if (cond === "Record di goal stagionale"){
        return {"valid": calc_att.record_goal >= calc_dif.record_goal,
                "val_att": calc_att.record_goal,
                "val_dif": calc_dif.record_goal,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/record_goal_nero.png" : "images/loghi_condizioni/record_goal_bianco.png",
                "cond":  "Record Goal"};
    }
    if (cond === "Giocatore più alto"){
        return {"valid": calc_att.altezza >= calc_dif.altezza,
                "val_att": calc_att.altezza,
                "val_dif": calc_dif.altezza,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ? "images/loghi_condizioni/altezza_nero.png" : "images/loghi_condizioni/altezza_bianco.png",
                "cond":  "Altezza"};
    }
    if (cond === "Record di assist stagionale"){
        return {"valid": calc_att.record_assist >= calc_dif.record_assist,
                "val_att": calc_att.record_assist,
                "val_dif": calc_dif.record_assist,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": window.turno_bianco ?  "images/loghi_condizioni/record_assist_nero.png" : "images/loghi_condizioni/record_assist_bianco.png",
                "cond":  "Record Assist"};

    }else{
        return dict;
    }
}

// Funzione per far comparire un elemento nei tunnel laterali
function setTunnelElement(dizionario_mangiata){
    const divFluttuante = document.createElement('div');
    divFluttuante.classList.add("div-log");
    divFluttuante.style.color = window.turno_bianco ? "black" : "white";
    divFluttuante.style.background = window.turno_bianco ? "rgb(255 255 255)" : "rgb(83 82 82)";

    divFluttuante.style.border = dizionario_mangiata.valid? "calc(0.1vh + 0.1vw) solid rgb(19, 234, 19)" : "calc(0.1vh + 0.1vw) solid red";

    const top = document.createElement('div');
    top.classList.add("log-top");
    top.style.background = window.turno_bianco ? "rgb(165 165 165)" : "rgb(39 38 38)";
    divFluttuante.appendChild(top);

        const condizione = document.createElement('p');
        condizione.textContent = dizionario_mangiata.cond;
        top.appendChild(condizione);

        const immagine = document.createElement('img');
        immagine.src = dizionario_mangiata.src;
        top.appendChild(immagine);

    const section1 = document.createElement('div');
    section1.classList.add("log-section");
    divFluttuante.appendChild(section1);

        const calciatore1 = document.createElement('p');
        calciatore1.textContent = dizionario_mangiata.att_cognome;
        section1.appendChild(calciatore1);

        const stat1 = document.createElement('p');
        stat1.textContent = dizionario_mangiata.val_att;
        stat1.style.color = dizionario_mangiata.valid ? "#13ea13" : "red";
        section1.appendChild(stat1);
    
    const section2 = document.createElement('div');
    section2.classList.add("log-section");
    divFluttuante.appendChild(section2);

        const calciatore2 = document.createElement('p');
        calciatore2.textContent = dizionario_mangiata.dif_cognome;
        section2.appendChild(calciatore2);

        const stat2 = document.createElement('p');
        stat2.textContent = dizionario_mangiata.val_dif;
        stat2.style.color = dizionario_mangiata.valid ? "red" : "#13ea13";
        section2.appendChild(stat2);

    const content = window.turno_bianco ? document.querySelector('.tunnel-content-sx') : document.querySelector('.tunnel-content-dx');
    content.appendChild(divFluttuante);
    
    appendLog(divFluttuante);
}

// Funzione che imposta degli elementi di condizione volatili
function setFlyingElement(dizionario_mangiata, image_attaccante){
    const img = document.createElement('img');
    img.src = dizionario_mangiata.src;
    img.classList.add("flying");
    image_attaccante.parentElement.appendChild(img);

    setPositionRelativeToDiv(image_attaccante, img, "top", 35);
    img.style.left = "auto";
    fluttuaElemento(img);
}

// Funzione che gestisce la cattura di una pedina
function cattura(pedinaBersaglio, cella_dest) {  //div -> pedinaBersaglio
    // Se la cella di destinazione contiene la pedina bersaglio
    let image_attaccante = window.selected_image;
    if (pedinaBersaglio && cella_dest.contains(pedinaBersaglio)) {
        let dizionario_mangiata = helperCattura(window.selected_element, pedinaBersaglio);
        if(dizionario_mangiata.valid){
            pedinaBersaglio.remove();
            setTunnelElement(dizionario_mangiata); //compone la grafica nei tunnel laterali
            setFlyingElement(dizionario_mangiata, image_attaccante); //compone la grafica della cattura
            avanza(cella_dest); // Sposta la pedina selezionata nella cella di destinazione
            return true;
        }else{
            playSound('fischio', 0.2);
            setTunnelElement(dizionario_mangiata); //compone la grafica nei tunnel laterali
            setFlyingElement(dizionario_mangiata, image_attaccante); //compone la grafica della cattura
            return false;
        }
    }    
}