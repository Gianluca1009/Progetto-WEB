//promuove il pedone se arriva in fondo 
function upgrade_pedone(img_pedina, cella_dest){
    let cur_row = parseInt(cella_dest.id[0]);
    let div_pedina = img_pedina.parentElement;
    //bianco arriva al top scacchiera
    if(div_pedina.id == "p" ){
        if(cur_row == 0){
            document.getElementById("div_ped_promotion").classList.remove('hidden');
<<<<<<< Updated upstream
            list_pedPromotion(div_pedina, img_pedina, window.turnoBianco);
=======
            list_pedPromotion(div_pedina, img_pedina);
>>>>>>> Stashed changes
        }
    }
    //nero arriva al fondo scacchiera
    if(div_pedina.id == "P" ){
        if(cur_row == 5){
            document.getElementById("div_ped_promotion").classList.remove('hidden');
<<<<<<< Updated upstream
            list_pedPromotion(div_pedina, img_pedina, window.turnoBianco);
        } 
    }
}

function list_pedPromotion(pedina_d, img_pedina, turnoBianco){

    document.getElementById('pedonepromotion_regina').addEventListener('click', () =>{
        tipo = 'regina';
        //modifica il div con un nuovo pezzo
        if(turnoBianco){
            pedina_d.id = pezzi[tipo].id.bianco ;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            pedina_d.id = pezzi[tipo].id.nero ;
            img_pedina.src = pezzi[tipo].img.nero;
        }
        document.getElementById("div_ped_promotion").classList.add('hidden');
    });

    document.getElementById('pedonepromotion_cavallo').addEventListener('click', () =>{
        tipo = 'cavallo';
        //modifica il div con un nuovo pezzo
        if(turnoBianco){
            pedina_d.id = pezzi[tipo].id.bianco ;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            pedina_d.id = pezzi[tipo].id.nero ;
=======
            list_pedPromotion(div_pedina, img_pedina);
        } 
    }
}
function func_list_regina (div_pedina, img_pedina){
        tipo = 'regina';
        //modifica il div con un nuovo pezzo
        if(window.turnoBianco){
            div_pedina.id = pezzi[tipo].id.bianco ;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            div_pedina.id = pezzi[tipo].id.nero ;
            img_pedina.src = pezzi[tipo].img.nero;
        }
        document.getElementById("div_ped_promotion").classList.add('hidden');
}
function list_pedPromotion(div_pedina, img_pedina){

    //document.getElementById('pedonepromotion_regina').addEventListener('click', func_list_regina(div_pedina,img_pedina));

    document.getElementById('pedonepromotion_cavallo').addEventListener('click', () =>{
        let div_pedina = window.selectedElement;
        let img_pedina = window.selectedImage;
        console.log(div_pedina);
        console.log(img_pedina)
        tipo = 'cavallo';
        //modifica il div con un nuovo pezzo
        if(window.turnoBianco){
            div_pedina.id = pezzi[tipo].id.bianco ;
            img_pedina.src = pezzi[tipo].img.bianco;
        }else{
            div_pedina.id = pezzi[tipo].id.nero ;
>>>>>>> Stashed changes
            img_pedina.src = pezzi[tipo].img.nero;
        }
        document.getElementById("div_ped_promotion").classList.add('hidden');
    });
<<<<<<< Updated upstream
}

=======
}
>>>>>>> Stashed changes
