var TIME_STEP = 50; // jeśli będzie wolno to trzeba podnieść tą wartość
var FRAME_SCALE = 1000/60;
var lastUpdate;
var FPS_COUNT=0;

$(function(){

    lastUpdate = new Date().getTime();
    setTimeout(gameLoop, FRAME_SCALE);
    setInterval(function(){
        $('.logs').text('FPS: '+ FPS_COUNT +'kl./s');
        FPS_COUNT=0;
    }, 1000);

});

function gameLoop()
{

    var now = new Date().getTime();
    var delta = now - lastUpdate;
    lastUpdate = now;
    for(var t = 0; t < delta; t += TIME_STEP)
    {
        gameUpdate(TIME_STEP);
        FPS_COUNT++;
    }
    delta = (new Date().getTime()) - now;

    setTimeout(gameLoop /*- delta*/, FRAME_SCALE);
}

