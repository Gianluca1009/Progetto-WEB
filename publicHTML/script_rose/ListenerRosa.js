
document.addEventListener('DOMContentLoaded', () => {

    window.bacheca = document.getElementById("bacheca-rosa")

    //se non sei loggato
    ifNotLoggedIn();
    
    //se la sessione è ancora aperta
    ifSessioneAperta();

    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('rosa');
    });
    
});