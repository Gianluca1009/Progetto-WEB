
function helperCattura(div_calc_att, div_calc_dif){  //true se l'att magna 
    const cond = getCondition();

    calc_att = JSON.parse(div_calc_att.children[0].dataset.json);  //classi giocatore ottenute parsando il json di text.id
    calc_dif = JSON.parse(div_calc_dif.children[0].dataset.json);  //classi difensore ottenute parsando il json di text.id

    if (cond === "Goal segnati in carriera"){
       return {"valid": calc_att.goal > calc_dif.goal,
                "val_att": calc_att.goal,
                "val_dif": calc_dif.goal,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/goal.png",
                "cond":  "Goal"};
    }
    if (cond === "Assist forniti in carriera"){
        return {"valid": calc_att.assist > calc_dif.assist,
                "val_att": calc_att.assist,
                "val_dif": calc_dif.assist,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/assist.png",
                "cond":  "Assist"};
    }
    if (cond === "Presenze collezionate in carriera"){
        return {"valid": calc_att.presenze > calc_dif.presenze,
                "val_att": calc_att.presenze,
                "val_dif": calc_dif.presenze,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/presenze.png",
                "cond":  "Presenza"};
    }
    if (cond === "Minor numero di cartellini gialli in carriera"){
        return {"valid": calc_att.cartellini_gialli > calc_dif.cartellini_gialli,
                "val_att": calc_att.cartellini_gialli,
                "val_dif": calc_dif.cartellini_gialli,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/cartellino_giallo.png",
                "cond":  "Cartellini Gialli"};
    }
    if (cond === "Minor numero di cartellini rossi in carriera"){
        return {"valid": calc_att.cartellini_rossi > calc_dif.cartellini_rossi,
                "val_att": calc_att.cartellini_rossi,
                "val_dif": calc_dif.cartellini_rossi,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/cartellino_rosso.png",
                "cond":  "Cartellini Rossi"};
    }
    if (cond === "Numero di maglia più alto"){
        return {"valid": calc_att.numero_maglia > calc_dif.numero_maglia,
                "val_att": calc_att.numero_maglia,
                "val_dif": calc_dif.numero_maglia,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/numero_maglia.png",
                "cond":  "Numero Maglia"};
    }
    if (cond === "Numero di trofei vinti in carriera"){
        return {"valid": calc_att.trofei > calc_dif.trofei,
                "val_att": calc_att.trofei,
                "val_dif": calc_dif.trofei,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/trofei.png",
                "cond":  "Trofei"};
    }
    if (cond === "Record di goal stagionale"){
        return {"valid": calc_att.record_goal > calc_dif.record_goal,
                "val_att": calc_att.record_goal,
                "val_dif": calc_dif.record_goal,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/record_goal.png",
                "cond":  "Record Goal"};
    }
    if (cond === "Giocatore più alto"){
        return {"valid": calc_att.altezza > calc_dif.altezza,
                "val_att": calc_att.altezza,
                "val_dif": calc_dif.altezza,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/altezza.png",
                "cond":  "Altezza"};
    }
    if (cond === "Record di assist stagionale"){
        return {"valid": calc_att.record_assist > calc_dif.record_assist,
                "val_att": calc_att.record_assist,
                "val_dif": calc_dif.record_assist,
                "att_cognome": calc_att.cognome,
                "dif_cognome": calc_dif.cognome,
                "src": "images/record_assist.png",
                "cond":  "Record Assist"};

    }else{
        console.log("condizione di confronto per mangiata inesistente");
        return dict;
    }
}


//logica mangiata pedina
function cattura(pedinaBersaglio, cella_dest) {  //div -> pedinaBersaglio
    // Se la cella di destinazione contiene la pedina bersaglio
    if (pedinaBersaglio && cella_dest.contains(pedinaBersaglio)) {
        let dizionario_mangiata = helperCattura(window.selectedElement, pedinaBersaglio);
        if(dizionario_mangiata.valid){
            pedinaBersaglio.remove();
            avanza(cella_dest); // Sposta la pedina selezionata nella cella di destinazione
            return true;
        }else{

            playSound('fischio', 0.2);

            const divFluttuante = document.createElement('div');
            divFluttuante.classList.add("div-log");

            const immagine = document.createElement('img');
            immagine.src = dizionario_mangiata.src;
            divFluttuante.appendChild(immagine);

            const condizione = document.createElement('p');
            condizione.textContent = dizionario_mangiata.cond;
            divFluttuante.appendChild(condizione);

            const scontro = document.createElement('p');
            scontro.innerHTML = `${dizionario_mangiata.att_cognome} VS ${dizionario_mangiata.dif_cognome}`;
            divFluttuante.appendChild(scontro);

            const verifica = document.createElement('p');
            verifica.innerHTML = `${dizionario_mangiata.val_att} < ${dizionario_mangiata.val_dif}`;
            divFluttuante.appendChild(verifica);

            if(window.turnoBianco){
                document.querySelector('.tunnel-sx').appendChild(divFluttuante);
            }
            else{
                document.querySelector('.tunnel-dx').appendChild(divFluttuante);
                condizione.style.color = "white";
                scontro.style.color = "white";
                verifica.style.color = "white";
            }
            FluttuaElemento(divFluttuante, 10);
            return false;
        }
    }    
}