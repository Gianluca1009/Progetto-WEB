const toggle = document.getElementById('toggle');
const text = toggle.nextElementSibling.querySelector('.modetext');

// aggiorna il testo all'avvio
updateText(toggle.checked);

// aggiorna il testo ogni volta che cambia
toggle.addEventListener('change', () => {
    stile = updateText(toggle.checked);
    changeStyle(stile);
});

function updateText(checked) {
    text.textContent = checked ? 'MODERN' : 'CLASSIC';
    if(text.textContent === 'MODERN') text.style.color = 'white';
    else text.style.color = 'black';
    return text.textContent;
}