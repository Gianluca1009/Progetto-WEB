document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");

    BuildMercato("", "qualsiasi");

    //se non sei loggato
    ifNotLoggedIn();

    //se la sessione è ancora aperta
    ifSessioneAperta();

    //RICERCA PER NOME
    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;

        BuildMercato(inputNome, inputRuolo);
    })


    //RICERCA PER RUOLO
    document.getElementById("tendinaRuolo").addEventListener("change", function(event) {
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