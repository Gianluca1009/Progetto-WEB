let timeLeft = 30;
let timerId = null;
const TOTAL_TIME = 30; // Costante per il tempo totale

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
        timeLeft = 30;
        
        // Riempimento istantaneo della barra
        progressBar.classList.add('instant');    //praticamente la barra è fluida quindi allo scadere 
        progressBar.style.width = '100%';        //non si riempiva istantaneamente e mi dava fastidio
        
        if (window.selectedCell) {
            window.selectedCell.classList.remove("highlighted");
            window.selectedElement = null;
            window.selectedCell = null;
            window.selectedImage = null;
        }
        
        window.turnoBianco = !window.turnoBianco;
        window.aggiornaStatoPedine();
        
        startTimer();
        return;
    }
    
    timeLeft--;

    if (timeLeft < 10) timerDisplay.style.color = 'red';    //timer di colore rosso quando sta per scadere
    else timerDisplay.style.color = 'white';                //colore normale
}

function startTimer() {
    if (timerId === null) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.classList.add('instant');
        progressBar.style.width = '100%';
        
        // Rimuoviamo la classe instant nel prossimo frame per permettere la transizione fluida
        requestAnimationFrame(() => {
            progressBar.classList.remove('instant');        //gestione del riempimento della barra istantaneo
            updateTimer();
        });
        
        timerId = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);     // Ferma il timer corrente
    timerId = null;
    timeLeft = 30;
    
    // Riempimento istantaneo della barra
    const progressBar = document.querySelector('.progress-bar');
    progressBar.classList.add('instant');
    progressBar.style.width = '100%';
    
    // Avvia il timer nel prossimo frame
    requestAnimationFrame(() => {
        startTimer();
    });
}

// Inizializza il timer quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
}); 