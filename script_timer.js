let timeLeft = 30;
let timerId = null;

function updateTimer() {
    const timerDisplay = document.querySelector('.timer-container .condition-title');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft === 0) {
        timeLeft = 30; // Riporta il timer a 30 secondi
        return;
    }
    
    timeLeft--;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 30;
    updateTimer();
}

// Inizializza il timer quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
    startTimer();
}); 