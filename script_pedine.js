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
    alfiere_bianco.className = "pedina";
    alfiere_nero.className = "pedina";
    alfiere_bianco.id = "a";
    alfiere_nero.id = "A";

    let alfiere_nero_img = document.createElement("img");
    let alfiere_bianco_img = document.createElement("img");

    alfiere_bianco_img.className = "alfiere";
    alfiere_bianco_img.src = "images/pedine/alfiere_bianco.png";
    alfiere_bianco_img.alt = "Alfiere bianco";
    alfiere_bianco.appendChild(alfiere_bianco_img);
    
    alfiere_nero_img.className = "alfiere";
    alfiere_nero_img.src = "images/pedine/alfiere_nero.png";
    alfiere_nero_img.alt = "Alfiere nero";
    alfiere_nero.appendChild(alfiere_nero_img);

    cell01.appendChild(alfiere_nero);
    cell54.appendChild(alfiere_bianco);

    //posizionamento regine

    let cell02 = document.getElementById("02");
    let cell52 = document.getElementById("52");

    let regina_nera = document.createElement("div");
    let regina_bianca = document.createElement("div");
    regina_bianca.className = "pedina";
    regina_nera.className = "pedina";
    regina_bianca.id = "q"; 
    regina_nera.id = "Q";

    let regina_bianca_img = document.createElement("img");
    let regina_nera_img = document.createElement("img");

    regina_bianca_img.className = "regina";
    regina_bianca_img.src = "images/pedine/regina_bianca.png";
    regina_bianca_img.alt = "Regina bianca";
    regina_bianca.appendChild(regina_bianca_img);
        
    regina_nera_img.className = "regina";
    regina_nera_img.src = "images/pedine/regina_nera.png";
    regina_nera_img.alt = "Regina nera";
    regina_nera.appendChild(regina_nera_img);

    cell02.appendChild(regina_nera);
    cell52.appendChild(regina_bianca);

    //posizionamento re

    let cell03 = document.getElementById("03");
    let cell53 = document.getElementById("53");

    let re_nero = document.createElement("div");
    let re_bianco = document.createElement("div");
    re_bianco.className = "pedina";
    re_nero.className = "pedina";
    re_bianco.id = "r"; 
    re_nero.id = "R";

    let re_bianco_img = document.createElement("img");
    let re_nero_img = document.createElement("img");

    re_bianco_img.className = "re";
    re_bianco_img.src = "images/pedine/re_bianco.png";
    re_bianco_img.alt = "Re bianco";
    re_bianco.appendChild(re_bianco_img);

    re_nero_img.className = "re";
    re_nero_img.src = "images/pedine/re_nero.png";
    re_nero_img.alt = "Re nero";
    re_nero.appendChild(re_nero_img);

    cell03.appendChild(re_nero);
    cell53.appendChild(re_bianco);

    //posizionamento cavalli

    let cell04 = document.getElementById("04");
    let cell51 = document.getElementById("51");

    let cavallo_nero = document.createElement("div");
    let cavallo_bianco = document.createElement("div");
    cavallo_bianco.className = "pedina";
    cavallo_nero.className = "pedina";
    cavallo_bianco.id = "c";
    cavallo_nero.id = "C";

    let cavallo_bianco_img = document.createElement("img");
    let cavallo_nero_img = document.createElement("img");

    cavallo_bianco_img.className = "cavallo";
    cavallo_bianco_img.src = "images/pedine/cavallo_bianco.png";
    cavallo_bianco_img.alt = "Cavallo bianco";
    cavallo_bianco.appendChild(cavallo_bianco_img);

    cavallo_nero_img.className = "cavallo";
    cavallo_nero_img.src = "images/pedine/cavallo_nero.png";
    cavallo_nero_img.alt = "Cavallo nero";
    cavallo_nero.appendChild(cavallo_nero_img);

    cell04.appendChild(cavallo_nero);
    cell51.appendChild(cavallo_bianco);

    //posizionamento pedoni
    
    for (let i = 0; i < 6; i++) {
        let cell1 = document.getElementById("1"+i);
        let cell4 = document.getElementById("4"+i);
        let pedone_nero = document.createElement("div");
        let pedone_bianco = document.createElement("div");
        pedone_nero.className = "pedina";
        pedone_bianco.className = "pedina";
        pedone_bianco.id = "p";
        pedone_nero.id = "P";

        let pedone_bianco_img = document.createElement("img");
        let pedone_nero_img = document.createElement("img");

        pedone_bianco_img.className = "pedone";
        pedone_bianco_img.src = "images/pedine/pedone_bianco.png";
        pedone_bianco_img.alt = "Pedone bianco";
        pedone_bianco.appendChild(pedone_bianco_img);

        pedone_nero_img.className = "pedone";
        pedone_nero_img.src = "images/pedine/pedone_nero.png";
        pedone_nero_img.alt = "Pedone nero";
        pedone_nero.appendChild(pedone_nero_img);
        
        cell1.appendChild(pedone_nero);
        cell4.appendChild(pedone_bianco);
    }

}

window.onload = posizion_iniziali();