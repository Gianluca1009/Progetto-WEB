
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logoutbutton").classList.add("hidden");
    document.getElementById("playerusername").classList.add("hidden");


    if(LS_get_idPlayerRose()){
        fillUsernameRosa();
        document.getElementById("logoutbutton").classList.remove("hidden");
        makeVisible(document.getElementById("playerusername"));
        document.getElementById("registerbutton").classList.add("hidden");
        document.getElementById("loginbutton").classList.add("hidden");
        BuildRosa();
    } 
})