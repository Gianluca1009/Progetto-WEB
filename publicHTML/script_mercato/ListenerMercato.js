document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");

    BuildMercato("", "qualsiasi");

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;

        BuildMercato(inputNome, inputRuolo);
    })

    document.getElementById("tendinaRuolo").addEventListener("change", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputNome = document.querySelector("input[name='nome']").value;
        const inputRuolo = document.querySelector("select[name='tendina']").value;

        BuildMercato(inputNome, inputRuolo);
    })

    //se la sessione è ancora aperta, non serve fare login o registrazioni, mostro pulsante logout e username
    if(LS_getUserMercatoData()[1] != null){
        fillUsernameMercato();
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.getElementById("playerusername"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
    }
})

