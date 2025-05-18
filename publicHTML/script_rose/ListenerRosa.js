
document.addEventListener('DOMContentLoaded', () => {
    window.finestra_difensori = document.getElementById("finestra-difensori");
    window.finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
    window.finestra_attaccanti = document.getElementById("finestra-attaccanti"); 

    //se non sei loggato
    ifNotLoggedIn();
    
    //se la sessione è ancora aperta
    ifSessioneAperta();

    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('rosa');
    });
    
});