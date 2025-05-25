window.gamecontainer_centered = false;
window.animation_id = null;

//
//------ FUNZIONI AUSILIARIE PER LA GRAFICA ------//
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

// Funzione che abilita movimento e hover pedine
function abilitaPedine(){
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.remove('no-hover');
        pedina.classList.add('pedina-active');
    });
}

// Funzione che disabilita movimento e hover pedine
function disabilitaPedine(){
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('no-hover');  // Aggiungo la classe no-hover per disabilitare l'hover
    });
}

// Funzione per scrollare la pagina verso il game container
function scrollToGameContainer(){
    const gameContainer = document.querySelector('.game-container');
    
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
        } else {
            // Imposta la variabile a true solo quando l'animazione è completata
            window.gamecontainer_centered = true;
        }
    }

    window.requestAnimationFrame(scrollStep);
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
function appendLog(elemento) {
    const content = window.turno_bianco ? document.querySelector('.tunnel-content-sx'): document.querySelector('.tunnel-content-dx');

    // Aggiungi l'elemento al contenitore
    elemento.style.opacity = '1';
    content.appendChild(elemento);

    // Implementa uno scroll animato
    const startPosition = content.scrollTop;
    const targetPosition = content.scrollHeight;
    const distance = targetPosition - startPosition;
    const duration = 500; // 500ms per l'animazione
    let startTime = null;

    function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Funzione di easing per un movimento più naturale
        const easeOutQuad = t => t * (2 - t);
        const currentPosition = startPosition + (distance * easeOutQuad(progress));

        content.scrollTop = currentPosition;

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

// Funzione per far fluttuare un elemento verso l'alto e rimuoverlo dopo un certo tempo
function fluttuaElemento(elemento) {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(-200px)';
    elemento.style.transition = 'opacity 3s ease, transform 3s ease';

    setTimeout(() => {
        elemento.remove();
    }, 3000); // Tempo di attesa per la rimozione
}

// Funzione che anima con scale il tutorial del draft
function animateDraftTutorial() {
    const santino1 = document.getElementById('s00').firstChild;
    const santino2 = document.getElementById('s10').firstChild;
    const santino3 = document.getElementById('s20').firstChild;
    const infodestra = document.getElementById('d21').firstChild;
    const dadosinistro = document.getElementById('random1');

    let scale = 1;
    let growing = true;

    window.animation_id = setInterval(() => {
        if (growing) {
            scale += 0.004;
            if (scale >= 1.08) growing = false;
        } else {
            scale -= 0.004;
            if (scale <= 1) growing = true;
        }
        santino1.style.transform = `scale(${scale})`;
        santino2.style.transform = `scale(${scale})`;
        santino3.style.transform = `scale(${scale})`;
        dadosinistro.style.transform = `scale(${scale})`;
        infodestra.style.transform = `scale(${scale})`;
    }, 50);
}

// Funzione che stoppa l'animazione del draft
function stopAnimationDraft() {
    clearInterval(window.animation_id);
    const santino1 = document.getElementById('s00').firstChild;
    const santino2 = document.getElementById('s10').firstChild;
    const santino3 = document.getElementById('s20').firstChild;
    const dadosinistro = document.getElementById('random1');
    const infodestra = document.getElementById('d21').firstChild;

    // Reset scale
    santino1.style.transform = 'scale(1)';
    santino2.style.transform = 'scale(1)';
    santino3.style.transform = 'scale(1)';
    dadosinistro.style.transform = 'scale(1)';
    infodestra.style.transform = 'scale(1)';
}

// Funzione che abilita o disabilita il tutorial
function handleTutorial() {
    let tutorial = document.querySelector('.tutorial');
    if(tutorial.dataset.aperto === "false"){
        tutorial.dataset.aperto = "true";
        makeVisible(tutorial);

        // metto in rilievo le foto dei calciatori
        document.getElementById('s00').style.zIndex = "12";
        document.getElementById('s10').style.zIndex = "12";
        document.getElementById('s20').style.zIndex = "12";

        // metto in rilievo il dado sinistro
        document.getElementById('random1').style.zIndex = "12";

        // metto in rilievo info draftcell destra
        document.getElementById('d21').style.zIndex = "12";

        // metto in background tutto il resto
        document.getElementById('dx0').style.zIndex = "4";
        document.getElementById('dx1').style.zIndex = "4";
        document.getElementById('d20').style.zIndex = "4";
        document.getElementById('s01').style.zIndex = "4";
        document.getElementById('s11').style.zIndex = "4";
        document.getElementById('s21').style.zIndex = "4";
        document.getElementById('random2').style.zIndex = "5";
        animateDraftTutorial(); // Avvio l'animazione del tutorial
    }
    else if(tutorial.dataset.aperto === "true"){
        tutorial.dataset.aperto = "false";
        makeHidden(tutorial);
        stopAnimationDraft(); // Ferma l'animazione del tutorial
    }
}


