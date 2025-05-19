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
            LS_updatePartite(userid, partite_aggiornate);
        }
        else{
            console.error('Errore durante l\'aggiornamento delle partite:', response.statusText);
        }
    } catch (error) {
        console.error('Errore durante l\'aggiornamento delle partite:', error);
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
    let vincitore = window.turno_bianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
    let id_vincitore = window.turno_bianco ? localStorage.getItem('game_userId1') : localStorage.getItem('game_userId2');
    let id_perdente = window.turno_bianco ? localStorage.getItem('game_userId2') : localStorage.getItem('game_userId1');
    let punti_vincitore = window.turno_bianco ? localStorage.getItem('game_user_point1') : localStorage.getItem('game_user_point2');
    let new_punti = parseInt(punti_vincitore) + 20;

    aggiornaPunti(id_vincitore, new_punti);
    aggiornaVittorie(id_vincitore);
    LS_updateWinner(id_vincitore, vincitore, new_punti);
    aggiornaPartite(id_vincitore);
    aggiornaPartite(id_perdente);
}