window.timeLeft = 59;
let timerId = null;
const TOTAL_TIME = 59; // Costante per il tempo totale
let gameStarted = false;

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
        
        cambioTurno();
        return;
    }
    
    timeLeft--;

    if (timeLeft < 10) timerDisplay.style.color = 'red';
    else timerDisplay.style.color = 'white';
}

function startTimer() {
    if (timerId === null && gameStarted) {
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

function startGame() {
    gameStarted = true;
    document.getElementById('startButton').classList.add('hidden');
    document.querySelector('.condition-container').classList.remove('hidden');
    document.querySelector('.timer-container').classList.remove('hidden');
    document.querySelector('.progress-container').classList.remove('hidden');
    
    // Rimuove la classe che disabilita l'hover
    document.querySelector('.game-container').classList.remove('game-not-started');
    
    // Aggiunge la classe active a tutte le pedine
    document.querySelectorAll('.pedina').forEach(pedina => {
        pedina.classList.add('pedina-active');
    });
    
    // Abilita il movimento delle pedine
    window.canMovePiece = function(pieceId) {
        return gameStarted && window.turnoBianco === (pieceId.toLowerCase() === pieceId);
    };
    
    startTimer();
}

// Inizializza il gioco quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
    
    // Aggiunge la classe che disabilita l'hover all'inizio
    document.querySelector('.game-container').classList.add('game-not-started');
    
    // Disabilita inizialmente il movimento delle pedine
    window.canMovePiece = function() {
        return false;
    };
}); 