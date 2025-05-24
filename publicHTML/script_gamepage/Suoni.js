// Crea un contesto audio globale
window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
window.soundBuffers = {}; // Oggetti audio pre-caricati
window.soundsInitialized = false;

// Funzione che precarica i suoni e decodifica i buffer
function preloadSounds() {
    const soundsToLoad = {
        mossa: 'sounds/Move_on_Alabaster.wav',
        selezione: 'sounds/Pedina_Selection.wav',
        mangia: 'sounds/Mangiata.wav',
        fischio: 'sounds/fischietto.wav',
        fischio_finale: 'sounds/fischietto_finale.wav'
    };

    for (let [key, url] of Object.entries(soundsToLoad)) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => window.audioCtx.decodeAudioData(buffer))
            .then(decodedData => {
                window.soundBuffers[key] = decodedData;
            })
            .catch(error => {
                console.error(`Errore caricamento suono ${key}:`, error);
            });
    }
}

// Funzione che sblocca l’audio context dopo la prima interazione
function preparaSounds() {
    if (window.soundsInitialized) return;
    if (window.audioCtx.state === 'suspended') {
        window.audioCtx.resume().then(() => {
            window.soundsInitialized = true;
        });
    } else {
        window.soundsInitialized = true;
    }
}

// Funzione da usare negli altri file per riprodurre un suono
function playSound(tipo, volume = 1.0) {
    const buffer = window.soundBuffers[tipo];
    if (!buffer) {
        console.warn(`Suono '${tipo}' non caricato.`);
        return;
    }

    const source = window.audioCtx.createBufferSource();
    source.buffer = buffer;

    const gainNode = window.audioCtx.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode).connect(window.audioCtx.destination);
    source.start(0);
}

// Funzione per riprodurre un suono vuoto per aggiornare il browser
function forzaAudio() {
    const buf = window.audioCtx.createBuffer(1, 1, 22050); // buffer silenzioso
    const src = window.audioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(window.audioCtx.destination);
    src.start();
}

