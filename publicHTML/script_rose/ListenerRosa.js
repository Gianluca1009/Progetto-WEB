
document.addEventListener('DOMContentLoaded', () => {

    window.finestra_difensori = document.getElementById("finestra-difensori");
    window.finestra_centrocampisti = document.getElementById("finestra-centrocampisti");
    window.finestra_attaccanti = document.getElementById("finestra-attaccanti");

    ifNotLoggedIn();
    
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");

    //se la sessione è ancora aperta, non serve fare login o registrazioni
    ifSessioneAperta();


    //GESTIONE DEL MENU
    document.querySelector(".menu-button").addEventListener("click", function() {
        handleHamburgerMenu('rosa');
    });
    
});