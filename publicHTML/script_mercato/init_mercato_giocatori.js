
document.addEventListener('DOMContentLoaded', () =>{
    fetch('/get_giocatori_mercato')
        .then(response => {
        if (!response.ok) {
            throw new Error('Nessun giocatore libero trovato');
        }
        return response.json();
        })
        .then(giocatori => {

        giocatori.forEach(giocatore => {
            console.log(giocatore)
            //crea la tabella nell'html con les specifiche del giolcatore e la foto
        });
        })
        .catch(error => {
        console.error('Errore:', error.message);
        });
})