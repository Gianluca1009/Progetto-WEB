let timeLeft = 30;
let timerId = null;
let isWhiteTurn = true; // true = turno bianco, false = turno nero

function updateTimer() {
    const timerDisplay = document.querySelector('.timer-container .condition-title');
    const turnIndicator = document.getElementById('turnIndicator');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    turnIndicator.textContent = isWhiteTurn ? "Turno Bianco" : "Turno Nero";
    
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
    timeLeft = 30;
    isWhiteTurn = !isWhiteTurn; // Cambia il turno
    updateTimer();
}

function isPieceWhite(pieceId) {
    return pieceId === pieceId.toLowerCase(); // Se l'ID è minuscolo, è una pedina bianca
}

function canMovePiece(pieceId) {
    return isWhiteTurn === isPieceWhite(pieceId);
}

// Inizializza il timer quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
    startTimer();
}); 