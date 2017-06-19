/**
 * Created by tomerktzv on 19/06/2017.
 */
$("document").ready(function() {
    // alert('HEY');

    $.getJSON('http://localhost:3000/getSongsByTitle/Gotta Get Away', function (data) {
        // var navbar = $('#navBar');
        // var headerbar = $('header');
        $.each(data, function (key, value) {
            console.log(value.id);
            if (value.id === 100) {
                $('#test').html(value.title);
            }
        });
    });

});