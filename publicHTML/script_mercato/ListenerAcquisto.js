function ListAcquista(calciatore, bottone){
    //se non sei loggato disabilita il bottone
    if (! LS_getUserMercatoData) {
        bottone.disable = true; //bottone
        Swal.fire(`Loggati per poter acquistare ${calciatore.cognome}!`);
    }
    //se sei loggato al click:
    let id = LS_getUserMercatoData()[0];
    let nome = LS_getUserMercatoData()[1];
    let miei_punti = LS_getUserMercatoData()[2];
        //se hai abbastanza punti permette l'acquisto:
        if(miei_punti >= calciatore.prezzo){  // da inserire punti nel db 
            miei_punti = miei_punti - calciatore.prezzo;
            //query al db che agg id_player al giocatore
            compraCalciatore(id, calciatore.id);
            //query scala i crediti e update db
            aggiornaPunti(id, miei_punti);
            //aggiorna pti display
            document.querySelector('.user-points').textContent = miei_punti;
            localStorage.setItem('mercato_user_point', miei_punti);
            LS_update_all_prezzo(id, miei_punti);
            // disabilita il pulsanete acquista perchè è già comprato
            bottone.hidden = true;
            //pop up acquisto effettuato
            Swal.fire(`Congratualzioni ${nome}! ${calciatore.cognome} è stato aggiunto alla tua rosa con successo!`);
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
