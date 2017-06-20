/**
 * Created by Nir Mekin on 6/20/2017.
 */
(function () {
    var data = window.location.search.substring(1);
    console.log(data);
    if(data==""){
        window.location.href = "login.html?";
    }
})();