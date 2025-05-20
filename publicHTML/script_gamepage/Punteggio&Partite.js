async function aggiornaPunti(userid, new_punti) {
  try {
    const response = await fetch('/update_punti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userid, new_punti})
    });
    LS_updatePunti(userid, new_punti);
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei punti:', error);
  }
}

async function aggiornaPartite(userid) {
    try {
        const response = await fetch('/update_partite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid})
        });
        if(response.ok){
            partite_aggiornate = await response.json();
            console.log("partite aggiornate", partite_aggiornate);
            LS_updatePartite(userid, partite_aggiornate);
        }
        else{
            console.error('Errore durante l\'aggiornamento delle partite interno:', response.statusText);
        }
    } catch (error) {
        console.error('Errore durante l\'aggiornamento delle partite esterno:', error);
    }
}


async function aggiornaVittorie(userid) {
    try {
        const response = await fetch('/update_vittorie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid})
        });
        if(!response.ok){
            console.error('Errore durante l\'aggiornamento delle vittorie:', response.statusText);
            return;
        }
        vittorie_aggiornate = await response.json();
        LS_updateVittorie(userid, vittorie_aggiornate);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento delle vittorie:', error);
    }
}

//------ FUNZIONE DA CHIAMARE A FINE PARTITA PER GESTIRE GLI AGGIORNAMENTI ------//

function aggiornaStatistiche(){
    let numero_vincitore = window.turno_bianco ? 1 : 2;
    let vincitore = window.turno_bianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
    let id_vincitore = window.turno_bianco ? localStorage.getItem('game_user1Id') : localStorage.getItem('game_userId2');
    let id_perdente = window.turno_bianco ? localStorage.getItem('game_user2Id') : localStorage.getItem('game_userId1');
    let punti_vincitore = window.turno_bianco ? localStorage.getItem('game_user1_punti') : localStorage.getItem('game_user2_punti');
    let new_punti = parseInt(punti_vincitore) + 20;
    console.log("newpunti" ,new_punti);
    console.log("punti vincitore", punti_vincitore);
    aggiornaPunti(id_vincitore, new_punti);
    aggiornaVittorie(id_vincitore);
    aggiornaPartite(id_vincitore);
    aggiornaPartite(id_perdente);
    // LS_updateWinner(id_vincitore, 
    //                 vincitore,
    //                 numero_vincitore = 1? LS_getUser1Game().email : LS_getUser2Game().email,
    //                 new_punti,
    //                 numero_vincitore = 1? LS_getUser1Game().partite : LS_getUser2Game().partite,
    //                 numero_vincitore = 1? LS_getUser1Game().vittorie : LS_getUser2Game().vittorie);

}