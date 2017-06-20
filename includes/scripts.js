/**
 * Created by tomerktzv on 19/06/2017.
 */
$("document").ready(function() {
    var audioElement = document.createElement('audio');
    var tempUserId = window.location.search.substring(1);
    var userId = tempUserId.substring(tempUserId.indexOf('=') + 1, tempUserId.length);

    function createNewAudio(songUrl) {
        audioElement.setAttribute('src', songUrl);
        $("#status").text("Status: Ready to play").css("color","green");

        audioElement.addEventListener('ended', function() {
            this.play();
        }, false);

        audioElement.addEventListener("canplay",function() {
            $("#length").text("Duration:" + audioElement.duration + " seconds");
            var fullname = audioElement.src;
            fullname = fullname.replace(/%20/g, ' ');
            $("#source").text("Source:" + fullname);
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
        if(str.indexOf(".mp3")>=0) {
            $('img')[0].id="coverPic2";
        }
        else $('img')[0].id="coverPic";

        return (str.substring(str.indexOf('songs/') + 6, str.indexOf('.mp3')));
    }

    function getSongs(arr, _mixid) {
        for (i = 0; i < arr.length; i++) {
            $.getJSON('https://new-nerves.herokuapp.com/getSongByID/' + arr[i], function (data) {
                $.each(data, function (key, value) {
                    $('#list' + _mixid).append('<option value="data/songs/' + value.id + '.' + value.title + '.mp3">' + value.artist + ' - ' + value.title + '</option>');
                });
            });
        }
    }

    function getHashTags(arr) {
        $('#hashtags li').remove();
        for (i = 0; i < arr.length; i++) {
            $('#hashtags').append('<li> #' + arr[i] + '</li>');
        }
    }

    function getPlaylist(_mixname) {
        $("select").remove();
        var idName = ($('img')[0].id="coverPic");
        $(`#${idName}`).attr('src', 'data/pictures/nocover.png');
        $.getJSON('https://new-nerves.herokuapp.com/getMixesByUserId/' + userId, function (data) {
            $.each(data, function (key, value) {
                if (value.mixname === _mixname) {
                    $('#playlists').append('<select id=list' + value.mixid + '></select>');
                    $('#list' + value.mixid).append('<option disabled selected> --- </option>');
                    getHashTags(value.hashtags, value.mixid);
                    getSongs(value.songs, value.mixid);
                }
            });
        });
    }

    $.getJSON('https://new-nerves.herokuapp.com/getMixesByUserId/' + userId, function (data) {
        $.each(data, function (key, value) {
            $('#playlists').append('<h3>' + value.mixname + '</h3>');
        });
    });

    $('#playlists').on('click', 'h3', function () {
        console.log($(this).text());
        getPlaylist($(this).text());
    });

    $('#playlists').on('change', 'select',  function () {
        var idName = $('img')[0].id;
        $(`#${idName}`).attr('src', 'data/pictures/' + getSongCover($(this).val()) + '.jpg');
        createNewAudio($(this).val());
    })
});
