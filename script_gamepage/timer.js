window.timeLeft = 59;
let timerId = null;
const TOTAL_TIME = 59; // Costante per il tempo totale

// ---- FUNZIONI PER LA GESTIONE DEL TIMER ---- //

// Funzione per aggiornare il timer
function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const progressBar = document.querySelector('.progress-bar');
    const seconds = timeLeft;
    timerDisplay.textContent = `${0}:${seconds.toString().padStart(2, '0')}`;
    
    // Aggiorna la barra di progresso
    const progressPercentage = (timeLeft / TOTAL_TIME) * 100;
    progressBar.classList.remove('instant');
    progressBar.style.width = `${progressPercentage}%`;
    if(window.turnoBianco) progressBar.style.backgroundColor = 'white';
    else progressBar.style.backgroundColor = 'black';
    
    if (timeLeft === 0) {
        clearInterval(timerId);
        timerId = null;
        timeLeft = 59;
        
        // Riempimento istantaneo della barra
        progressBar.classList.add('instant');
        progressBar.style.width = '100%';
        
        if (window.selectedCell) {      //se allo scadere hai una cella selezionata, la rimuovi
            resetHighlighted();
            resetSelezione();
        }
        
        // Cambio turno
        window.turnoBianco = !window.turnoBianco;
        aggiornaStatoPedine();
        updateCondition();
        startTimer();
        
        return;
    }
    
    timeLeft--;

    if (timeLeft < 10) timerDisplay.style.color = 'red';
    else {
        if(window.turnoBianco) timerDisplay.style.color = 'black';
        else timerDisplay.style.color = 'white';
    }
}

// Funzione per avviare il timer
function startTimer() {
    if (timerId === null && gameStarted) {
        // Se il timer non è a 59 secondi, resettalo
        if (window.timeLeft !== 59) {
            window.timeLeft = 59;
            const timerDisplay = document.getElementById('timer');
            timerDisplay.textContent = '0:59';
        }

        const progressBar = document.querySelector('.progress-bar');
        progressBar.classList.add('instant');
        progressBar.style.width = '100%';
        
        requestAnimationFrame(() => {
            progressBar.classList.remove('instant');
            updateTimer();
        });
        
        timerId = setInterval(updateTimer, 1000);
    }
}

// Funzione per resettare il timer
function resetTimer() {
    if (!gameStarted) return;
    
    clearInterval(timerId);
    timerId = null;
    timeLeft = 59;
    
    const progressBar = document.querySelector('.progress-bar');
    progressBar.classList.add('instant');
    progressBar.style.width = '100%';
    
    requestAnimationFrame(() => {
        startTimer();
    });
}

// Funzione per freezare il timer
function freezeTimer() {
    clearInterval(timerId);
    timerId = null;
}


