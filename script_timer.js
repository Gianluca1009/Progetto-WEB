let timeLeft = 30;
let timerId = null;

function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft === 0) {
        clearInterval(timerId); // Ferma il timer corrente
        timerId = null;
        timeLeft = 30; // Riporta il timer a 30 secondi
        
        // Se c'è una pedina selezionata, rimuovi l'evidenziazione
        if (window.selectedCell) {
            window.selectedCell.classList.remove("highlighted");
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
        }
        
        // Cambia il turno
        window.turnoNero = !window.turnoNero;
        window.aggiornaStatoPedine();
        
        startTimer(); // Riavvia il timer
        return;
    }
    
    timeLeft--;

    if (timeLeft < 10) {
        timerDisplay.style.color = 'red';
    } else {
        timerDisplay.style.color = 'white';
    }
}

function startTimer() {
    if (timerId === null) {
        updateTimer(); // Aggiorna subito il display
        timerId = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId); // Ferma il timer corrente
    timerId = null;
    timeLeft = 30;
    startTimer(); // Riavvia il timer con il nuovo tempo
}

// Inizializza il timer quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
}); 