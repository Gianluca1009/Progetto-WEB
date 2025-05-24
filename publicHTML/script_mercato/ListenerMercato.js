document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("logout-button").classList.add("hidden");
    document.querySelector(".sezione-profilo").classList.add("hidden");
    window.bacheca = document.getElementById("finestramercato");

    //se non sei loggato
    ifNotLoggedIn();

    //se la sessione è ancora aperta
    ifSessioneAperta();

    //RICERCA PER NOME
    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;

        BuildMercato(inputNome, inputRuolo);
    })


    //RICERCA PER RUOLO
    document.getElementById("tendina-ruolo").addEventListener("change", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;

        BuildMercato(inputNome, inputRuolo);
    })
    

    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('mercato');
    });

});