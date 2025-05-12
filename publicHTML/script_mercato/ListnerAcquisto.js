function ListAcquista(){
    //se non sei loggato disabilita il bottone
    if (! LS_getUserMercatoData) {
        bottone.disable();
        Swal.fire("Loggati per poter acquistare il giocatore!");
    }
    //se sei loggato al click:
    //let id = 
        //se hai abbastanza punti permette l'acquisto:
            //query al db che agg id_player al giocatore
            //scala i crediti e update db
            // disabilita il pulsanete acquista perchè è già comprato
            //pop up acquisto effettuato
        
        //else
            //pop up nonha i abbastanzza crediti 
}