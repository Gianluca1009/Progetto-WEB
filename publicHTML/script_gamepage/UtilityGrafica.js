//
// ---- FUNZIONI AUSILIARIE PER LA GRAFICA ---- //
//

// Funzione per evidenziare le caselle disponibili
function SuggerisciMosse() {
    // Rimuovi eventuali evidenziazioni precedenti
    let startCell = window.selected_element.parentElement;  //cella di partenza

    // Controlla tutte le caselle della scacchiera 6x6
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 6; y++) {

            let targetCell = document.getElementById(x + "" + y);
            let pedinaBersaglio = targetCell.querySelector('.pedina');
            if (targetCell && targetCell !== startCell) {
                // Verifica se la mossa è valida
                if (validationMove(window.selected_image, targetCell)) {
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
    window.selected_cell.classList.add("highlighted");
}

// Funzione per resettare l'evidenziazione della cella selezionata
function resetHighlighted(){
    window.selected_cell.classList.remove("highlighted");
}

// Funzione per resettare la selezione degli elementi image,element,cell
function resetSelezione(){
    window.selected_element = null;
    window.selected_cell = null;
    window.selected_image = null;
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

//Funzione per cambiare lo stile delle pedine
function changeStyle(stile) {
    const pedine = document.querySelectorAll('.pedina');
    pedine.forEach(pedina => {
        const img = pedina.firstChild;
        const tipo = img.className; // es. 'regina', 'torre', ecc.
        const colore = pedina.id === pezzi[tipo]?.id.bianco ? 'bianco' : 'nero';

        // Verifica che il tipo esista in pezzi
        if (pezzi[tipo]) {
            // Aggiorna la src in base allo stile e al colore
            img.src = pezzi[tipo].img[stile][colore];
        }

        makeVisible(pedina); // Rendi visibile la pedina
    });
}

// Funzione per restituire lo stile delle pedine
function getStyle(){
    const pedine = document.querySelectorAll('.pedina');
    let stile = 'CLASSIC'; // Valore di default
    pedine.forEach(pedina => {
        if (pedina.firstChild.src.includes('_classic.png')) {
            stile = 'CLASSIC';
        } else {
            stile = 'MODERN';
        }
    });
    return stile;
}

// Funzione per far fluttuare verso l'alto l'elemento log
function FluttuaElemento(elemento, velocita = 10){
    let distanza = document.querySelector('.game-container').offsetHeight - elemento.offsetHeight; // Posizione iniziale sotto il game container
    let posizione = 0;

    const intervalId = setInterval(() => {
        posizione -= 1; // muovi verso l'alto di 1px
        elemento.style.transform = `translateY(${posizione}px)`;

        if (Math.abs(posizione) >= distanza) {
            makeHidden(elemento); // Nascondi l'elemento quando ha raggiunto la distanza
            clearInterval(intervalId); // Ferma l'intervallo
        }
    }, velocita);

    // Restituisco l'ID dell'intervallo così puoi fermarlo se vuoi
    return intervalId;
}
