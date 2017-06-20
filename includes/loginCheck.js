/**
 * Created by Nir Mekin on 6/20/2017.
 */
(function () {
    var data = window.location.search.substring(1);
    data.split('=');
    console.log(data);
    if(!data[0].isEqual("user_id")){
        window.location.href = "login.html?";
    }
})();