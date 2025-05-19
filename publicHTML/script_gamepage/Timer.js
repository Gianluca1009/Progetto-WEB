// Definizione delle variabili per i timer
window.timer_bianco = 5 * 60; // 5 minuti in secondi per il bianco
window.timer_nero = 5 * 60; // 5 minuti in secondi per il nero
let timerId = null;

// ---- FUNZIONI PER LA GESTIONE DEI TIMER ---- //

// Funzione per aggiornare il timer corrente
function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const progressBar = document.querySelector('.progress-bar');
    
    // Determina quale timer aggiornare in base al turno
    let currentTimer = window.turno_bianco ? window.timer_bianco : window.timer_nero;
    
    // Converte i secondi in formato minuti:secondi
    const minutes = Math.floor(currentTimer / 60);
    const seconds = currentTimer % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Aggiorna la barra di progresso (percentuale rispetto a 5 minuti)
    const progressPercentage = (currentTimer / (5 * 60)) * 100;
    progressBar.classList.remove('instant');
    progressBar.style.width = `${progressPercentage}%`;
    
    // Imposta il colore della barra in base al turno
    if(window.turno_bianco) {
        progressBar.style.backgroundColor = 'white';
        timerDisplay.style.color = 'black';
    } else {
        progressBar.style.backgroundColor = 'black';
        timerDisplay.style.color = 'white';
    }
    
    // Decrementa il timer attivo
    if(window.turno_bianco) {
        window.timer_bianco--;
    } else {
        window.timer_nero--;
    }
    
    // Cambia il colore del timer quando rimane meno di un minuto
    if(currentTimer < 30) {
        timerDisplay.style.color = 'red';
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
    
    // Gestione della fine del tempo
    if(currentTimer <= 0) {
        clearInterval(timerId);
        timerId = null;
        
        // Imposta vincitore in base a quale timer è scaduto
        if(window.turno_bianco) {
            // Il timer del bianco è scaduto, vince il nero
            endGame();
        } else {
            // Il timer del nero è scaduto, vince il bianco
            endGame();
        }
        
        return;
    }
}

// Funzione per avviare il timer
function startTimer() {
    if (timerId === null && window.game_started) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.classList.add('instant');
        progressBar.style.width = '100%';
        
        // Aggiorna subito l'interfaccia
        updateTimerDisplay();
        
        // Avvia l'intervallo per aggiornare il timer ogni secondo
        timerId = setInterval(updateTimer, 1000);
    }
}

// Funzione per aggiornare solo il display senza decrementare
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    
    // Determina quale timer visualizzare in base al turno
    let currentTimer = window.turno_bianco ? window.timer_bianco : window.timer_nero;
    
    // Converte i secondi in formato minuti:secondi
    const minutes = Math.floor(currentTimer / 60);
    const seconds = currentTimer % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Imposta il colore in base al turno e al tempo rimasto
    if(currentTimer < 30) {
        timerDisplay.style.color = 'red';
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
        if(window.turno_bianco) {
            timerDisplay.style.color = 'black';
        } else {
            timerDisplay.style.color = 'white';
        }
    }
    
    // Aggiorna anche la barra di progresso
    const progressBar = document.querySelector('.progress-bar');
    const progressPercentage = (currentTimer / (5 * 60)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    if(window.turno_bianco) {
        progressBar.style.backgroundColor = 'white';
    } else {
        progressBar.style.backgroundColor = 'black';
    }
}

// Funzione per freezare il timer (ad esempio a fine partita)
function freezeTimer() {
    clearInterval(timerId);
    timerId = null;
}

// Funzione per resettare i timer (per una nuova partita)
function resetTimers() {
    window.timer_bianco = 5 * 60;
    window.timer_nero = 5 * 60;
    updateTimerDisplay();
}


