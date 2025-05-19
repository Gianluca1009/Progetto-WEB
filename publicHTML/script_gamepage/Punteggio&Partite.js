async function aggiornaPunti(userid, new_punti) {
  try {
    const response = await fetch('/update_punti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userid, new_punti})
    });
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
        partite_aggiornate = await response.json();
        LS_updatePartite(userid, partite_aggiornate);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento delle partite:', error);
    }
}

function update_LS_winner(id, name, pti){
    if (window.turno_bianco)
            LS_login1Game(id,name,pti);

    else LS_login2Game(id,name,pti);
  
}