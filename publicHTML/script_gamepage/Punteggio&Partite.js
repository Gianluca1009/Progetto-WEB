// Funzione per aggiornare i punti di un giocatore
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

// Funzione per aggiornare le partite di un giocatore
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

// Funzione per aggiornare le vittorie di un giocatore
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

// Funzione per aggiornare i dati dei player a fine partita
function aggiornaStatistiche(){
    let numero_vincitore = window.turno_bianco ? 1 : 2;
    let vincitore = window.turno_bianco ? localStorage.getItem('game_username1') : localStorage.getItem('game_username2');
    let id_vincitore = window.turno_bianco ?  LS_getUser1Game().id : LS_getUser2Game().id;
    let id_perdente = window.turno_bianco ? LS_getUser2Game().id : LS_getUser1Game().id;
    let punti_vincitore = window.turno_bianco ? LS_getUser1Game().punti : LS_getUser2Game().punti;
    let new_punti = parseInt(punti_vincitore) + 20;
    aggiornaPunti(id_vincitore, new_punti);
    aggiornaVittorie(id_vincitore);
    aggiornaPartite(id_vincitore);
    aggiornaPartite(id_perdente);
}