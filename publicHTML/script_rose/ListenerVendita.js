function ListVendi(calciatore, bottone){
   
    //se sei loggato al click:
    let id = LS_get_idPlayerRose();
    let nomePlayer = LS_get_usernamePlayerRose();
    let miei_punti = LS_get_puntiPlayerRose();
    let calc_id = calciatore.id;
    confermaAcquisto(id, calciatore.cognome , nomePlayer, calciatore.prezzo ,miei_punti, calc_id);
}
async function confermaAcquisto(id_player, cognome_calciatore, nomePlayer, prezzo ,miei_punti, calc_id) {
  const result = await Swal.fire({
    title: `Vuoi vendere ${cognome_calciatore} ?`,
    text: "Non potrai annullare questa operazione!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sì, confermo!',
    cancelButtonText: 'Annulla'
  });
  //UTENTE ACCETTA
  if (result.isConfirmed) {
    // Attendi vendita
    await vendiCalciatore(calc_id);

    // Aggiorna punti
    let new_pti = parseInt(miei_punti) + parseInt(prezzo);
    await aggiornaPunti(id_player, new_pti);
    LS_set_puntiRosa(new_pti);
    LSR_agg_LSMprezzo(new_pti);

    // Mostra conferma
    await Swal.fire(
      'Vendita confermata!',
      `${nomePlayer}, hai guadagnato +${prezzo} pti`,
      'success'
    );
    // Ricarica la pagina
    window.location.reload();

    //UTENTE NON ACCETTA
  } else {
    await Swal.fire(
      'Operazione annullata',
      'Nessun acquisto è stato effettuato.',
      'info'
    );
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


async function vendiCalciatore(calc_id) {
  try {
    const response = await fetch('/sale_calciatore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ calc_id })
    });
  } catch (error) {
    console.error('Errore durante l\'acquisto del calciatore:', error);
  }
}