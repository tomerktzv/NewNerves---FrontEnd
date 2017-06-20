/**
 * Created by Nir Mekin on 6/20/2017.
 */

$("document").ready(function() {
    $('form').submit(function(e){
        e.preventDefault();
        if($("#userId").val()=="" || $('#userName').val()==""){
            alert("please enter id and name");
        }
        else {
            console.log($('#userId').val());
            var name = $('#userName').val();
            var id = $('#userId').val();
            $.post("https://new-nerves.herokuapp.com/addNewUser", { id: id, name:name })
                 .done(function (response) {
                     window.location.href = "index.html?user_id=" + id;
            })
                .fail(function (jqxhr, textStatus, error) {
                    console.log("problem with login");
                });

        }

        })
    });
