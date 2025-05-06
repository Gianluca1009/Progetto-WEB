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