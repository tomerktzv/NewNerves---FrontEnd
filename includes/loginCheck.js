/**
 * Created by Nir Mekin on 6/20/2017.
 */
(function () {
    var data = window.location.search.substring(1);
    data = data.split("=");
    if(data[0]!=="user_id"){
        window.location.href = "login.html?";
    }
})();