//
// ---- FUNZIONI AUSILIARIE PER LA GRAFICA ---- //
//

// Funzione per evidenziare le caselle disponibili
function SuggerisciMosse() {
    // Rimuovi eventuali evidenziazioni precedenti
    let startCell = window.selectedElement.parentElement;  //cella di partenza

    // Controlla tutte le caselle della scacchiera 6x6
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 6; y++) {

            let targetCell = document.getElementById(x + "" + y);
            let pedinaBersaglio = targetCell.querySelector('.pedina');
            if (targetCell && targetCell !== startCell) {
                // Verifica se la mossa è valida
                if (validationMove(window.selectedImage, targetCell)) {
                    if(targetCell.hasChildNodes() && pedinaBersaglio){
                        targetCell.classList.add('eating-move');
                    }
                    else{
                        targetCell.classList.add('available-move');
                    }
                    targetCell.classList.add('available-move');
                }
            }
        }
    }
}

// Funzione per resettare i suggerimenti
function resetSuggerimenti(){
    document.querySelectorAll('.available-move').forEach(cell => {
        cell.classList.remove('available-move');
    });
    document.querySelectorAll('.eating-move').forEach(cell => {
        cell.classList.remove('eating-move');
    });
}

// Funzione per evidenziare la cella selezionata
function addHighlighted(){
    window.selectedCell.classList.add("highlighted");
}

// Funzione per resettare l'evidenziazione della cella selezionata
function resetHighlighted(){
    window.selectedCell.classList.remove("highlighted");
}

// Funzione per resettare la selezione degli elementi image,element,cell
function resetSelezione(){
    window.selectedElement = null;
    window.selectedCell = null;
    window.selectedImage = null;
}

//abilita movimento e hover pedine
function abilitaPedine(){
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.remove('no-hover');
        pedina.classList.add('pedina-active');
    });
}

//disabilita movimento e hover pedine
function disabilitaPedine(){
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('no-hover');  // Aggiungo la classe no-hover per disabilitare l'hover
    });
}

// Funzione per scrollare la pagina verso il game container
function scrollToGameContainer(){
    const gameContainer = document.querySelector('.game-container');
    setTimeout(() => {
        const startPosition = window.pageYOffset;
        const endPosition = gameContainer.offsetTop - (window.innerHeight - gameContainer.offsetHeight) / 2;
        const distance = endPosition - startPosition;
        const duration = 1000; // 1 secondo
        let startTime = null;

        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Funzione di easing per un movimento più naturale
            const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const currentPosition = startPosition + (distance * easeInOutCubic(percentage));

            window.scrollTo(0, currentPosition);

            if (progress < duration) {
                window.requestAnimationFrame(scrollStep);
            }
        }

        window.requestAnimationFrame(scrollStep);
    }, 10); // Piccolo ritardo prima di iniziare lo scroll
}

//Funzione per cambiare il rapporto delle pedine in base allo stile
function ratioPedine(stile) {
    if (stile == 'CLASSIC') {
        document.querySelectorAll('.pedone, .cavallo, .torre, .alfiere').forEach(pedina => {
            pedina.style.width = '58%'; // Imposta la larghezza al 100%
            pedina.style.aspectRatio = '1/1'; // Imposta l'aspect ratio al 1:1
        })
        document.querySelectorAll('.cavallo, .alfiere').forEach(pedina => {
            pedina.style.width = '65%'; // Imposta la larghezza al 100%
            pedina.style.aspectRatio = '1/1'; // Imposta l'aspect ratio al 1:1
        })
        document.querySelectorAll('.torre').forEach(pedina => {
            pedina.style.width = '61%'; // Imposta la larghezza al 100%
            pedina.style.aspectRatio = '1/1'; // Imposta l'aspect ratio al 1:1
        });
    }
    if (stile == 'MODERN') {
        document.querySelectorAll('.pedone, .cavallo, .torre, .alfiere').forEach(pedina => {
            pedina.style.width = '70%'; // Ripristina la larghezza originale
            pedina.style.aspectRatio = '1/1'; // Ripristina l'aspect ratio originale
        })
    }

}

//Funzione per cambiare lo stile delle pedine
function changeStyle(stile) {
    const pedine = document.querySelectorAll('.pedina');
    pedine.forEach(pedina => {
        pedina.classList.add('hidden'); // Nascondo l'immagine corrente
        immaginevecchia = pedina.firstChild.src; //immagine vecchia
        if (stile == 'CLASSIC') {
            pedina.firstChild.src = immaginevecchia.replace('.png', '_prova.png'); //imposto stile MODERN
            ratioPedine(stile); //cambio il rapporto delle pedine
        }
        if (stile == 'MODERN') {
            pedina.firstChild.src = immaginevecchia.replace('_prova.png', '.png'); //ripristina l'immagine per lo stile CLASSIC
            ratioPedine(stile); //ripristino il rapporto delle pedine
        }
        makeVisible(pedina); //rendo visibile l'immagine
    });
}

// Funzione per restituire lo stile delle pedine
function getStyle(){
    const pedine = document.querySelectorAll('.pedina');
    let stile = 'CLASSIC'; // Valore di default
    pedine.forEach(pedina => {
        if (pedina.firstChild.src.includes('_prova.png')) {
            stile = 'CLASSIC';
        } else {
            stile = 'MODERN';
        }
    });
    return stile;
}