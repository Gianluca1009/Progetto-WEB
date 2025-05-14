//
//----- FUNZIONI UTILIZZATE IN TUTTO IL PROGETTO -----//
//

//Funzione per far vedere un elemento con animazione
function makeVisible(element) {
    if (!element) return;

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
    element.style.transition = 'opacity 1s ease';
    element.style.opacity = '1';
}

// Funzione per nascondere un elemento con animazione
function makeHidden(element) {
    if (!element) return;

    // Salva lo stile di display originale se non è già stato salvato
    if (!element.dataset.originalDisplay) {
        element.dataset.originalDisplay = window.getComputedStyle(element).display;
    }

    // Anima l'opacità
    element.style.transition = 'opacity 1s ease';
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
    return keytoReturn;
}

//Funzione per far funzionare il menu
function handleHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });
}

// Funzione per far apparire div in posizione desiderata rispetto a un altro div
function setPositionRelativeToDiv(targetElement, floatingElement, side = 'right', offsetPercent = 1) {
    console.log("targetElement", targetElement);
    const targetRect = targetElement.getBoundingClientRect();
    const parentRect = targetElement.offsetParent.getBoundingClientRect();

    // Calcolo posizione verticale centrata
    const relativeTop = ((targetRect.top - parentRect.top + targetRect.height / 2) / parentRect.height) * 100;

    // Calcolo posizione orizzontale (destra o sinistra)
    let relativeLeft;
    if (side === 'right') {
        relativeLeft = ((targetRect.right - parentRect.left) / parentRect.width) * 100 + offsetPercent;
    } else if (side === 'left') {
        relativeLeft = ((targetRect.left - parentRect.left) / parentRect.width) * 100 - offsetPercent;
    } else {
        console.warn("Parametro 'side' non valido. Usa 'left' o 'right'.");
        return;
    }

    // Applica lo stile di posizionamento
    floatingElement.style.position = 'absolute';
    floatingElement.style.left = `${relativeLeft}%`;
    floatingElement.style.top = `${relativeTop}%`;
    floatingElement.style.transform = 'translateY(-50%)';
}