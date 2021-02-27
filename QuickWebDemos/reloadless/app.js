
$(document).ready(function () {
    //jQuery
    $(document).on('click', '.control nav a', function(event) {
        //url은 바뀌지만 실제로 페이지로는 가지 않게
        //history에 현재 url을 push
        //누른 이벤트 타겟에서 .html추출

        //server 통해서 열때만 가능
        console.log(event.target.href)
        history.pushState(null, null, event.target.href)
        //e.target.href 중에 아티클 포함 결과를 현재 아티클에 로드
        $('article').load(event.target.href+' article>.content');
        event.preventDefault();
    })
    $(window).on('popstate', function (e) {
        $('article').load(location.href + 'article>.content');
    })
    var audio = new Audio("Sergey_Gulevich_-_Relax_Lounge.mp3");
    $(document).on('click', '.control .player .play', function (event) {
        audio.play();
    });
    $(document).on('click', '.control .player .pause', function (event) {
        audio.pause();
    });
});