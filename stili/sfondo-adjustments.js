/**
 * Script per regolare dinamicamente la larghezza degli sfondi laterali
 * in base alla larghezza del grid-container
 */

document.addEventListener('DOMContentLoaded', function() {
    // Funzione per aggiornare la larghezza degli sfondi
    function adjustBackgrounds() {
        // Ottiene il grid-container
        const gridContainer = document.getElementById('grid-container');
        
        // Ottiene gli elementi di sfondo
        const sfondoSx = document.querySelector('.sfondo_draft_sx');
        const sfondoDx = document.querySelector('.sfondo_draft_dx');
        
        // Ottiene il game-container
        const gameContainer = document.querySelector('.game-container');
        
        if (gridContainer && sfondoSx && sfondoDx && gameContainer) {
            // Calcola la larghezza del grid-container
            const gridWidth = gridContainer.offsetWidth;
            
            // Calcola la larghezza del game-container
            const gameWidth = gameContainer.offsetWidth;
            
            // Calcola la larghezza degli sfondi: (larghezza game - larghezza grid) / 2
            const sideWidth = (gameWidth - gridWidth) / 2;
            
            // Imposta le larghezze degli sfondi
            sfondoSx.style.width = sideWidth + 'px';
            sfondoDx.style.width = sideWidth + 'px';
            
            // Aggiorniamo anche la posizione per evitare sovrapposizioni
            sfondoSx.style.left = '0px';
            sfondoDx.style.right = '0px';
            
            // Debug
            console.log('Grid Width:', gridWidth);
            console.log('Game Width:', gameWidth);
            console.log('Side Width:', sideWidth);
        }
    }
    
    // Esegui l'aggiustamento quando la pagina viene caricata
    setTimeout(adjustBackgrounds, 100);
    
    // Aggiungi un listener per il ridimensionamento della finestra
    window.addEventListener('resize', adjustBackgrounds);
    
    // Controlla anche dopo che il gioco è iniziato (se c'è un bottone di inizio)
    const startButton = document.getElementById('giocaButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Attendi che le animazioni di inizio gioco siano completate
            setTimeout(adjustBackgrounds, 800);
        });
    }
}); 