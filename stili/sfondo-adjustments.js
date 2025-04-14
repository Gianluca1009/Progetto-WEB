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
            
            // Calcola lo spazio disponibile per lato
            const availableSideSpace = (gameWidth - gridWidth) / 2;
            
            // Imposta la larghezza massima al 22% del game container
            const maxWidth = gameWidth * 0.22;
            
            // Usa il valore più piccolo tra lo spazio disponibile e la larghezza massima
            const sideWidth = Math.min(availableSideSpace, maxWidth);
            
            // Imposta le larghezze degli sfondi
            sfondoSx.style.width = sideWidth + 'px';
            sfondoDx.style.width = sideWidth + 'px';
            
            // Aggiorniamo anche la posizione per evitare sovrapposizioni
            sfondoSx.style.left = '0px';
            sfondoDx.style.right = '0px';
            
            // Adatta dimensioni delle tabelle interne
            const tableDraftSx = document.querySelector('.table_draft_sx');
            const tableDraftDx = document.querySelector('.table_draft_dx');
            
            if (tableDraftSx && tableDraftDx) {
                // Imposta la larghezza delle tabelle all'interno degli sfondi
                // Ridotta al 75% della larghezza dello sfondo, minimo 10px
                const tableWidth = Math.max(sideWidth * 0.75, 10);
                
                tableDraftSx.style.width = tableWidth + 'px';
                tableDraftDx.style.width = tableWidth + 'px';
                
                // Centra le tabelle negli sfondi
                tableDraftSx.style.left = '50%';
                tableDraftSx.style.transform = 'translateX(-50%) translateY(-50%)';
                tableDraftDx.style.right = '50%';
                tableDraftDx.style.transform = 'translateX(50%) translateY(-50%)';
                
                // Aggiorno larghezza di tabelle e bottoni
                adjustTablesAndButtons(tableDraftSx, tableWidth);
                adjustTablesAndButtons(tableDraftDx, tableWidth);
            }
            
            // Debug
            console.log('Grid Width:', gridWidth);
            console.log('Game Width:', gameWidth);
            console.log('Available Side Space:', availableSideSpace);
            console.log('Max Width (22%):', maxWidth);
            console.log('Final Side Width:', sideWidth);
        }
    }
    
    // Funzione per adattare tabelle e bottoni
    function adjustTablesAndButtons(tableElement, tableWidth) {
        // Aggiusta i bottoni
        const buttons = tableElement.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.width = (tableWidth * 0.7) + 'px'; // 70% della larghezza della tabella
            button.style.maxWidth = '100%';
        });
        
        // Aggiusta la tabella interna
        const table = tableElement.querySelector('table');
        if (table) {
            table.style.width = '95%';
            table.style.maxWidth = '95%';
            
            // Assicura che le celle non sfondino
            const cells = table.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.maxWidth = '100%';
                cell.style.overflow = 'hidden';
            });
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