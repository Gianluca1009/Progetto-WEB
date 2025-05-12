document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");
    BuildMercato();

    //se la sessione è ancora aperta, non serve fare login o registrazioni, mostro pulsante logout e username
    if(LS_getUserMercatoData()[1] != null){
        fillUsernameMercato();
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.getElementById("playerusername"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
    }
})
