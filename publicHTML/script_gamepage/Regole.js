let infoIcon = document.getElementById("infoIcon");
let tooltip = document.getElementById("tooltip");
let timer;

infoIcon.addEventListener("mouseenter", function() {
    timer = setTimeout(() => {
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    }, 500); // Mostra dopo 1 secondo
});

infoIcon.addEventListener("mouseleave", function() {
    clearTimeout(timer);
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
});

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
  text.textContent = checked ? 'CLASSIC' : 'MODERN';
  return text.textContent;
}