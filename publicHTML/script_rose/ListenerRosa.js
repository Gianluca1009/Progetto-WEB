
document.addEventListener('DOMContentLoaded', () => {
    if(LS_get_idPlayerRose()) BuildRosa();
})


// function populate_rosa(){
//         if (LS_get_idPlayerRose()){
//             const id_player = LS_get_idPlayerRose();
//             fetch(`/get_giocatori_rose?id=${id_player}`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Nessun giocatore libero trovato');
//                     }
//                     return response.json();
//                 })
//                 .then(giocatori => {
//                     giocatori.forEach(giocatore => {
//                         console.log(giocatore)
//                         //crea la tabella nell'html con les specifiche del giolcatore e la foto e bottone compra
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Errore:', error.message);
//                 });
//         }
//         else{
//             console.log("utente non loggato");
//         }
// }