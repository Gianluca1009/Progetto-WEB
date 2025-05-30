document.addEventListener('DOMContentLoaded', () => {

    // Inizializzo le variabili di finestra
    window.bacheca = document.getElementById("finestramercato");
    window.user_points = document.querySelector('.user-points');
    window.sezione_profilo = document.querySelector('.sezione-profilo');
    window.logout_button = document.getElementById("logout-button");
    window.login_button = document.getElementById("login-button");
    window.register_button = document.getElementById("register-button");
    window.player_username = document.getElementById("playerusername");

    window.sezione_profilo.classList.add("hidden");
    window.logout_button.classList.add("hidden");

    //se non sei loggato
    ifNotLoggedIn();

    //se la sessione è ancora aperta
    ifSessioneAperta();

    //RICERCA PER NOME
    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        if(LS_getUserMercatoData().id != null) {
            const inputNome = document.querySelector("input[name='nome']").value;
            const inputRuolo = document.querySelector("select[name='tendina']").value;
            BuildMercato(inputNome, inputRuolo);
        }
    });


    //RICERCA PER RUOLO
    document.getElementById("tendina-ruolo").addEventListener("change", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;
        ifNotLoggedIn();
        BuildMercato(inputNome, inputRuolo);
    });
    

    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('mercato');
    });

    window.addEventListener('resize', function() {
        setListeFontSize();
        setFontSizeAcquistaBtn();
    });

});

