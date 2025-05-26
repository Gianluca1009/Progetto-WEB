//
//----- FUNZIONI UTILIZZATE IN TUTTO IL PROGETTO -----//
//

//Funzione per far vedere un elemento con animazione
function makeVisible(element, velocita = 1) {
    if (!element){
        console.warn("Elemento non trovato");
        return;
    }
    if(window.getComputedStyle(element).display !== "none"){
        return;
    }
    // Rimuovi la classe hidden se presente
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
    // Salva lo stile di display originale se non è già stato salvato
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }

    // Imposta l'opacità a 0 e il display al valore originale
    element.style.opacity = '0';
    element.style.display = element.dataset.originalDisplay;

    // Forza un reflow per avviare l'animazione
    element.offsetHeight;

    // Anima l'opacità
    element.style.transition = `opacity ${velocita}s ease`;
    element.style.opacity = '1';
}

// Funzione per nascondere un elemento con animazione
function makeHidden(element, velocita = 1) {
    if (!element){
        console.warn("Elemento non trovato");
        return;
    }
    if(window.getComputedStyle(element).display === "none"){
        return;
    } 

    // Salva lo stile di display originale se non è già stato salvato
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }

    // Anima l'opacità
    element.style.transition = `opacity ${velocita}s ease`;
    element.style.opacity = '0';

    // Dopo l'animazione, imposta display a none
    setTimeout(() => {
        element.style.display = 'none';
    }, 800);
}

// Funzione per convertire la data in formato italiano
function convertDate(stringa){
    const mesi = {"01": "Gennaio", "02": "Febbraio", "03": "Marzo", "04": "Aprile", "05": "Maggio", "06": "Giugno",
     "07": "Luglio", "08": "Agosto", "09": "Settembre", "10": "Ottobre", "11": "Novembre", "12": "Dicembre"};
    const anno = stringa.substring(0,4);
    const mese = mesi[stringa.substring(5,7)];
    const giorno = stringa.substring(8);
    
    return `${giorno} ${mese} ${anno}`;

}

//Funzione per convertire le chiavi in un formato più leggibile
function KeyConverter(key){
    keytoReturn = key.replace(/_/g, ' ');
    keytoReturn = keytoReturn.charAt(0).toUpperCase() + keytoReturn.slice(1);
    if(key === "nazionalita") keytoReturn = "Nazionalità";
    return keytoReturn;
}

// Funzione per far apparire div in posizione desiderata rispetto a un altro div
function setPositionRelativeToDiv(targetElement, floatingElement, side = 'right', offsetPercent = 1) {
    const targetRect = targetElement.getBoundingClientRect();
    const parentRect = targetElement.offsetParent.getBoundingClientRect();

    let relativeLeft, relativeTop;

    switch (side) {
        case 'right':
            // Verticale centrato, destra del target
            relativeTop = ((targetRect.top - parentRect.top + targetRect.height / 2) / parentRect.height) * 100;
            relativeLeft = ((targetRect.right - parentRect.left) / parentRect.width) * 100 + offsetPercent;
            floatingElement.style.transform = 'translateY(-50%)';
            break;

        case 'left':
            // Verticale centrato, sinistra del target
            relativeTop = ((targetRect.top - parentRect.top + targetRect.height / 2) / parentRect.height) * 100;
            relativeLeft = ((targetRect.left - parentRect.left) / parentRect.width) * 100 - offsetPercent;
            floatingElement.style.transform = 'translateY(-50%)';
            break;

        case 'top':
            // Orizzontale centrato, sopra il target
            relativeLeft = ((targetRect.left - parentRect.left + targetRect.width / 2) / parentRect.width) * 100;
            relativeTop = ((targetRect.top - parentRect.top) / parentRect.height) * 100 - offsetPercent;
            floatingElement.style.transform = 'translateX(-50%)';
            break;

        case 'bottom':
            // Orizzontale centrato, sotto il target
            relativeLeft = ((targetRect.left - parentRect.left + targetRect.width / 2) / parentRect.width) * 100;
            relativeTop = ((targetRect.bottom - parentRect.top) / parentRect.height) * 100 + offsetPercent;
            floatingElement.style.transform = 'translateX(-50%)';
            break;

        default:
            console.warn("Parametro 'side' non valido. Usa 'left', 'right', 'top' o 'bottom'.");
            return;
    }

    // Applica lo stile di posizionamento
    floatingElement.style.position = 'absolute';
    floatingElement.style.left = `${relativeLeft}%`;
    floatingElement.style.top = `${relativeTop}%`;
}




//------ FUNZIONI PER LA NAVIGAZIONE TRA LE PAGINE -------//

// Funzione per andare al gioco
function goToGame(source) {
    if(source === "gamepage"){
        window.location.reload();
    }
    window.location.href = "gamepage.html";
    handleHamburgerMenu(source);
}

// Funzione per andare alla rosa
function goToRosa(source) {
    if(source === "gamepage"){
        window.location.reload();
    }
    window.location.href = "rosa.html";
    handleHamburgerMenu(source);
}

// Funzione per andare al mercato
function goToMercato(source) {
    if(source === "gamepage"){
        window.location.reload();
    }
    window.location.href = "mercato.html";
    handleHamburgerMenu(source);
}

// Funzione per andare alla home
function goToHome(source) {
    if(source === "gamepage"){
        window.location.reload();
    }
    window.location.href = "index.html";
    handleHamburgerMenu(source);
}

// Funzione per andare alle regole
function goToRegole(source) {
    if(source === "gamepage"){
        window.location.reload();
    }
    window.location.href = "regole.html";
    handleHamburgerMenu(source);
}

//Funzione per far funzionare il menu
function handleHamburgerMenu(pagina) {
    let hamburger;
    if (pagina === 'mercato') {
        hamburger = document.getElementById("menu-mercato");
    }
    else if (pagina === 'rosa') {
        hamburger = document.getElementById("menu-rosa");
    }
    else if (pagina === 'gamepage') {
        hamburger = document.getElementById("menu-gamepage");
    }
    else if(pagina === 'regole') {
        hamburger = document.getElementById("menu-regole");
    }
    else console.log("pagina non valida");

    if(hamburger.dataset.aperto === "true"){ //se il menu è aperto, chiudilo -20vw
        console.log("menu aperto --- chiudo");
        hamburger.style.left = "-20vw";
        hamburger.style.transition = "left 0.4s ease-in-out";
        hamburger.dataset.aperto = "false";
    }
    else{
        console.log("menu chiuso --- apro");
        hamburger.style.left = "0px";
        hamburger.style.transition = "left 0.4s ease-in-out";
        hamburger.dataset.aperto = "true";
    }
    
    
}

//------ FETCH COMUNI -------//

async function forgotPassword(email) {
    try {
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Errore durante il recupero della password');
        }

        const data = await response.json();
        return data.message; // Messaggio di successo
    } catch (error) {
        throw new Error(error.message);
    }
}

