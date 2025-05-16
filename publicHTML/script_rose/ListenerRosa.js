
document.addEventListener('DOMContentLoaded', () => {

    const finestra_difensori = document.getElementById("finestra-difensori");
    const finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
    const finestra_attaccanti = document.getElementById("finestra-attaccanti");

    if(LS_get_idPlayerRose() === null) {

        buildRowNoLogin(finestra_difensori, "difensori");
        buildRowNoLogin(finestra_centrocampisti, "centrocampisti");
        buildRowNoLogin(finestra_attaccanti, "attaccanti");

    }
    
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");

    //se la sessione è ancora aperta, non serve fare login o registrazioni, mostro pulsante logout e username
    if(LS_get_idPlayerRose()){
        fillUsernameRosa();
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.getElementById("playerusername"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");

        BuildRosa();
    }

    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('rosa');
    });
    
});