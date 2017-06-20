/**
 * Created by tomerktzv on 19/06/2017.
 */
$("document").ready(function() {
    var audioElement = document.createElement('audio');
    var tempUserId = window.location.search.substring(1);
    var userId = tempUserId.substring(tempUserId.indexOf('=') + 1, tempUserId.length);
    console.log(userId);
    // tempUserId.split('=');
    // userId = tempUserId[1];
    // var songsArr = [];

    function createNewAudio(songUrl) {
        audioElement.setAttribute('src', songUrl);
        $("#status").text("Status: Ready to play").css("color","green");

        audioElement.addEventListener('ended', function() {
            this.play();
        }, false);

        audioElement.addEventListener("canplay",function() {
            $("#length").text("Duration:" + audioElement.duration + " seconds");
            $("#source").text("Source:" + audioElement.src);
            // $("#status").text("Status: Ready to play").css("color","green");
        });

        audioElement.addEventListener("timeupdate", function() {
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
        // var start = str.indexOf('songs/');
        // var end = str.indexOf('.mp3');
        var newStr = str.substring(str.indexOf('songs/') + 6, str.indexOf('.mp3'));
        // return newStr;
        return (str.substring(str.indexOf('songs/') + 6, str.indexOf('.mp3')));
    }

    function getSongs(arr) {
        // console.log(arr);
        // console.log(userId);
        for (i = 0; i < arr.length; i++) {
            // console.log(arr[i]);
            $.getJSON('https://new-nerves.herokuapp.com/getSongByID/' + arr[i], function (data) {
                $.each(data, function (key, value) {
                    $('#list').append('<option value="data/songs/' + value.id + '.' + value.title + '.mp3">' + value.artist + ' - ' + value.title + '</option>');
                });
            });
        }
    }

    $.getJSON('https://new-nerves.herokuapp.com/getMixesByUserId/' + userId, function (data) {
        $.each(data, function (key, value) {
            getSongs(value.songs);
            // console.log(songsArr);
            // songsArr.push(value.songs.val());
            // for (i = 0; i < songsArr.length; i++)
            //     console.log(songsArr[i]);
        });
    });

    // $.getJSON('https://new-nerves.herokuapp.com/getAllSongs', function (data) {
    //     $.each(data, function (key, value) {
    //         $('#list').append('<option value="data/songs/' + value.id + '.' + value.title + '.mp3">' + value.artist + ' - ' + value.title + '</option>');
    //     });
    // });

    $('#list').on('change', function () {
        $('#coverPic').attr('src', 'data/pictures/' + getSongCover($('#list').val()) + '.jpg');
        createNewAudio($('#list').val());
    })
});
