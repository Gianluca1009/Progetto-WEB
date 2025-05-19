
document.addEventListener('DOMContentLoaded', () => {

    // Inizializzo le variabili di finestra
    window.bacheca = document.getElementById("bacheca-rosa");
    window.register_button = document.getElementById("registerbutton");
    window.login_button = document.getElementById("loginbutton");
    window.logout_button = document.getElementById("logoutbutton");
    window.sezione_profilo = document.querySelector(".sezione-profilo");
    window.difensori = [];
    window.centrocampisti = [];
    window.attaccanti = [];

    //se non sei loggato
    ifNotLoggedIn();
    
    //se la sessione è ancora aperta (o se viene fatto il login)
    ifSessioneAperta();

    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('rosa');
    });
    
});