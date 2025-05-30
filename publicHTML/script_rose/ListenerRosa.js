//----- GESTIONE DELLA LOGICA DELLA PAGINA ROSA ------//

document.addEventListener('DOMContentLoaded', () => {

    

    // Inizializzo le variabili di finestra
    window.bacheca = document.getElementById("bacheca-rosa");
    window.register_button = document.getElementById("register-button");
    window.login_button = document.getElementById("login-button");
    window.logout_button = document.getElementById("logout-button");
    window.sezione_profilo = document.querySelector(".sezione-profilo");
    window.player_username = document.getElementById("player-username");
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