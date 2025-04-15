// Variabili globali per i suoni pre-caricati
window.move_sound = null;
window.select_sound = null;
window.mangia_sound = null;
window.soundsInitialized = false;

// Funzione di pre-caricamento dei suoni
function preloadSounds() {
    // Creazione degli oggetti Audio
    window.move_sound = new Audio('sounds/Move_on_Alabaster.wav');
    window.select_sound = new Audio('sounds/Pedina_Selection.wav');
    window.mangia_sound = new Audio('sounds/Mangiata.wav');
    // Solo caricamento in memoria
    window.move_sound.load();
    window.select_sound.load();
    window.mangia_sound.load();
}

// Funzione per inizializzare l'audio dopo l'interazione con giocaButton
function preparaSounds() {
    if (window.soundsInitialized) return;
    
    console.log("Inizializzazione suoni dopo click");
    
    try {
        // Riproduzione breve per sbloccare l'audio 
        window.move_sound.volume = 0;
        window.move_sound.play().then(() => {
            window.move_sound.pause();
            window.move_sound.currentTime = 0;
        }).catch(error => {
            console.log("Errore inizializzazione audio movimento:", error);
        });
        
        window.select_sound.volume = 0;
        window.select_sound.play().then(() => {
            window.select_sound.pause();
            window.select_sound.currentTime = 0;
        }).catch(error => {
            console.log("Errore inizializzazione audio selezione:", error);
        });
        
        window.mangia_sound.volume = 0;
        window.mangia_sound.play().then(() => {
            window.mangia_sound.pause();
            window.mangia_sound.currentTime = 0;
        }).catch(error => {
            console.log("Errore inizializzazione audio mangia:", error);
        });
        window.soundsInitialized = true;
    } catch (error) {
        console.log("Errore generale inizializzazione audio:", error);
    }
}

// Funzione per riprodurre il suono di una pedina che atterra
function playSound(tipo, volume) {
    if(tipo == "mossa"){
        // Clona l'audio per permettere riproduzioni sovrapposte
        window.move_sound.volume = volume;
        window.move_sound.play().catch(error => {
            console.log("Errore durante la riproduzione del suono:", error);
        });
    }
    else if(tipo == "selezione"){
        window.select_sound.volume = volume;
        window.select_sound.play().catch(error => {
            console.log("Errore durante la riproduzione del suono:", error);
        });
    }
    else if(tipo == "mangia"){
        window.mangia_sound.volume = volume;
        window.mangia_sound.play().catch(error => {
            console.log("Errore durante la riproduzione del suono:", error);
        });
    }
}