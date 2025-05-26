function acquistaCalciatore(calciatore, riga){

    let id = LS_getUserMercatoData().id;
    let nome = LS_getUserMercatoData().username;
    let miei_punti = LS_getUserMercatoData().punti;

        //se hai abbastanza punti permette l'acquisto:
        if(miei_punti >= calciatore.prezzo){ 
            miei_punti = miei_punti - calciatore.prezzo;
            //query al db che agg id_player al giocatore
            compraCalciatore(id, calciatore.id);
            //query scala i crediti e update db
            aggiornaPunti(id, miei_punti);
            //aggiorna pti display
            window.user_points.textContent = miei_punti;
            localStorage.setItem('mercato_user_point', miei_punti);
            LS_updatePunti(id, miei_punti);
            makeHidden(riga);
            riga.remove();
            //pop up acquisto effettuato
            Swal.fire(`Congratualzioni ${nome}! ${calciatore.cognome} è stato aggiunto alla tua rosa!`);
        }
        else{
            //pop up nonha i abbastanzza crediti 
            Swal.fire(`${nome}, non hai abbastanza punti per acquistare ${calciatore.cognome}!`);
        }
}


async function aggiornaPunti(userid, new_punti) {
  try {
    const response = await fetch('/update_punti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid, new_punti })
    });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei punti:', error);
  }
}


async function compraCalciatore(userid, calc_id) {
  try {
    const response = await fetch('/buy_calciatore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid, calc_id })
    });
  } catch (error) {
    console.error('Errore durante l\'acquisto del calciatore:', error);
  }
}
