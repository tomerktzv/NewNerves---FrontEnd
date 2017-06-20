/**
 * Created by tomerktzv on 19/06/2017.
 */
$("document").ready(function() {
    var audioElement = document.createElement('audio');

    function createNewAudio(songUrl) {
        audioElement.setAttribute('src', songUrl);
        $("#status").text("Status: Ready to play").css("color","green");

        audioElement.addEventListener('ended', function() {
            this.play();
        }, false);

        audioElement.addEventListener("canplay",function(){
            $("#length").text("Duration:" + audioElement.duration + " seconds");
            $("#source").text("Source:" + audioElement.src);
            // $("#status").text("Status: Ready to play").css("color","green");
        });

        audioElement.addEventListener("timeupdate",function(){
            $("#currentTime").text("Current second:" + audioElement.currentTime);
        });

        $('#play').click(function() {
            audioElement.play();
            $("#status").text("Status: Playing");
        });

        $('#pause').click(function() {
            audioElement.pause();
            $("#status").text("Status: Paused");
        });

            $('#stop').click(function() {
            audioElement.pause();
            audioElement.currentTime = 0;
            $("#status").text("Status: Stopped");
        });

        $('#restart').click(function() {
            audioElement.currentTime = 0;
        });
    }

    function getSongCover(str) {
        // console.log(str);
        var start = str.indexOf('songs/');
        var end = str.indexOf('.mp3');
        var newStr = str.substring(start+6, end);
        console.log(newStr);
        return newStr
        // console.log(test);
    }

    // $('#song1').attr('src', '../data/songs/100.Gotta Get Away.mp3');
    // $('#song1').load();
    // console.log($('#song1').attr('src'));
    $.getJSON('https://new-nerves.herokuapp.com/getAllSongs', function (data) {
        $.each(data, function (key, value) {
            $('#list').append('<option value="../data/songs/' + value.id + '.' + value.title + '.mp3">' + value.artist + ' - ' + value.title + '</option>');
            // createNewAudio('../data/songs/' + value.id + '.' + value.title + '.mp3');
        });
    });

    // $('button').on('click', function () {
    //     console.log($('#list').val());
    //     createNewAudio($('#list').val());
    // })

    $('#list').on('change', function () {
        // console.log($('#list').val());
        // getSongDetails($('#list').val());
        $('#coverPic').attr('src', '../data/pictures/' + getSongCover($('#list').val()) + '.jpg');
        // $('#coverPic').attr('src', '../data/pictures/100.The Black Keys.jpg');
        createNewAudio($('#list').val());
    })
});






// if (value.id === 100) {
//     $('#test').append('<li>' + value.title + '</li>');
//     $('#test').append('<li>' + value.artist + '</li>');
//     $('#test').append('<li>' + value.id + '</li>');
//     $('#test').append('<li>' + value.duration + '</li>');
//     $('#test').append('<li>' + value.cover + '</li>');
//     $('#test').append('<li>' + value.genre + '</li>');
//     createNewAudio('../data/songs/' + value.id + '.' + value.title + '.mp3');
//     // $('#song1').attr('src', '../data/songs/' + value.id + '.' + value.title + '.mp3');
//     console.log('success');
// }
// else if (value.id == 101) {
//     $('#test').append('<li>' + value.title + '</li>');
//     $('#test').append('<li>' + value.artist + '</li>');
//     $('#test').append('<li>' + value.id + '</li>');
//     $('#test').append('<li>' + value.duration + '</li>');
//     $('#test').append('<li>' + value.cover + '</li>');
//     $('#test').append('<li>' + value.genre + '</li>');
//     createNewAudio('../data/songs/' + value.id + '.' + value.title + '.mp3');
// }