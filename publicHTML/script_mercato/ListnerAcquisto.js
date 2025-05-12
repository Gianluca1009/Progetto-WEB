function ListAcquista(giocatore){
    //se non sei loggato disabilita il bottone
    if (! LS_getUserMercatoData) {
        bottone.disable = true;
        Swal.fire(`Loggati per poter acquistare ${giocatore.cognome}!`);
    }
    //se sei loggato al click:
    let id = LS_getUserMercatoData()[0];
    let nome = LS_getUserMercatoData()[1];
    let miei_punti = LS_getUserMercatoData()[2];
        //se hai abbastanza punti permette l'acquisto:
        if(miei_punti >= giocatore.punti){  // da inserire
            miei_punti = miei_punti-giocatore.punti;
            //query al db che agg id_player al giocatore
             
            //query scala i crediti e update db
            // disabilita il pulsanete acquista perchè è già comprato
            bottone.disable = true;
            //pop up acquisto effettuato
            Swal.fire(`${giocatore.cognome} è stato acquistato con successo!`);
        }
        else{
            //pop up nonha i abbastanzza crediti 
            Swal.fire(`Non hai abbastanza punti per acquistare ${giocatore.cognome}!`);
        }
}
            