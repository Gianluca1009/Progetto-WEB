document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");

    BuildMercato("");
    // console.log("STO buildando il mercato");


    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        //Ottengo l'input del form
        const inputRicerca = document.querySelector("input[name='nome']").value;
        BuildMercato(inputRicerca);
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

