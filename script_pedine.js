function posizion_iniziali(){

    let draggedElement = null;
    // Posizionamento torri

    let cell00 = document.getElementById("00");
    let cell05 = document.getElementById("05");
    let cell50 = document.getElementById("50");
    let cell55 = document.getElementById("55");

    let torre_nera = document.createElement("div");
    let torre_bianca = document.createElement("div");
    torre_bianca.className = "pedina";
    torre_nera.className = "pedina";
    torre_bianca.id = "t";
    torre_nera.id = "T";
    
    let torre_bianca_img = document.createElement("img");
    let torre_nera_img = document.createElement("img");
    
    torre_bianca_img.className = "torre";
    torre_bianca_img.src = "images/pedine/torre_bianca.png";
    torre_bianca_img.alt = "Torre nera";
    torre_bianca.appendChild(torre_bianca_img);

    torre_nera_img.className = "torre";
    torre_nera_img.src = "images/pedine/torre_nera.png";
    torre_nera_img.alt = "Torre bianca";
    torre_nera.appendChild(torre_nera_img);

    cell00.appendChild(torre_nera);
    cell05.appendChild(torre_nera.cloneNode(true));
    cell50.appendChild(torre_bianca);
    cell55.appendChild(torre_bianca.cloneNode(true));

    //posizionamento alfieri

    let cell01 = document.getElementById("01");
    let cell54 = document.getElementById("54");

    let alfiere_nero = document.createElement("div");
    let alfiere_bianco = document.createElement("div");
    alfiere_bianco.id = "a";
    alfiere_nero.id = "A";

    let alfiere_nero_img = document.createElement("img");
    let alfiere_bianco_img = document.createElement("img");

    alfiere_bianco_img.className = "pedina alfiere";
    alfiere_bianco_img.src = "images/pedine/alfiere_bianco.png";
    alfiere_bianco_img.alt = "Alfiere bianco";
    alfiere_bianco.appendChild(alfiere_bianco_img);
    
    alfiere_nero_img.className = "pedina alfiere";
    alfiere_nero_img.src = "images/pedine/alfiere_nero.png";
    alfiere_nero_img.alt = "Alfiere nero";
    alfiere_nero.appendChild(alfiere_nero_img);

    cell01.appendChild(alfiere_nero);
    cell54.appendChild(alfiere_bianco);

    //posizionamento regine

    let cell02 = document.getElementById("02");
    let cell52 = document.getElementById("52");
    let regina_nera = document.createElement("img");
    let regina_bianca = document.createElement("img");
    
    regina_bianca.className = "pedina regina";
    regina_bianca.id = "q";
    regina_bianca.src = "images/pedine/regina_bianca.png";
    regina_bianca.alt = "Regina bianca";
    regina_bianca.draggable = true;

        
    regina_nera.className = "pedina regina";
    regina_nera.id = "Q";
    regina_nera.src = "images/pedine/regina_nera.png";
    regina_nera.alt = "Regina nera";
    regina_nera.draggable = true;


    cell02.appendChild(regina_nera);
    cell52.appendChild(regina_bianca);

    //posizionamento re

    let cell03 = document.getElementById("03");
    let cell53 = document.getElementById("53");
    let re_nero = document.createElement("img");
    let re_bianco = document.createElement("img");
   
    re_bianco.className = "pedina re";
    re_bianco.id = "r";
    re_bianco.src = "images/pedine/re_bianco.png";
    re_bianco.alt = "Re bianco";
    re_bianco.draggable = true;

    re_nero.className = "pedina re";
    re_nero.id = "R";
    re_nero.src = "images/pedine/re_nero.png";
    re_nero.alt = "Re nero";
    re_nero.draggable = true;

    cell03.appendChild(re_nero);
    cell53.appendChild(re_bianco);

    //posizionamento cavalli

    let cell04 = document.getElementById("04");
    let cell51 = document.getElementById("51");
    let cavallo_nero = document.createElement("img");
    let cavallo_bianco = document.createElement("img");
    
    cavallo_bianco.className = "pedina cavallo";
    cavallo_bianco.id = "c";
    cavallo_bianco.src = "images/pedine/cavallo_bianco.png";
    cavallo_bianco.alt = "Cavallo bianco";
    cavallo_bianco.draggable = true;

    cavallo_nero.className = "pedina cavallo";
    cavallo_nero.id = "C";
    cavallo_nero.src = "images/pedine/cavallo_nero.png";
    cavallo_nero.alt = "Cavallo nero";
    cavallo_nero.draggable = true;

    cell04.appendChild(cavallo_nero);
    cell51.appendChild(cavallo_bianco);

    //posizionamento pedoni
    
    for (let i = 0; i < 6; i++) {
        let cell1 = document.getElementById("1"+i);
        let cell4 = document.getElementById("4"+i);
        let pedone_nero = document.createElement("img");
        let pedone_bianco = document.createElement("img");
        
        pedone_bianco.className = "pedina pedone";
        pedone_bianco.id = "p"; 
        pedone_bianco.src = "images/pedine/pedone_bianco.png";
        pedone_bianco.alt = "Pedone bianco";
        pedone_bianco.draggable = true;

        pedone_nero.className = "pedina pedone";
        pedone_nero.id = "P";
        pedone_nero.src = "images/pedine/pedone_nero.png";
        pedone_nero.alt = "Pedone nero";
        pedone_nero.draggable = true;
        
        cell1.appendChild(pedone_nero);
        cell4.appendChild(pedone_bianco);
    }

}

window.onload = posizion_iniziali();