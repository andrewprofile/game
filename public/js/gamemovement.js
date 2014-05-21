
var player_speed = 2;
var player_div = $('.trigger_byt');
var map_div     = $('#map');
var player_width = 32, player_height = 50;
var animation_speed = 5;
var anim_frame = [];
    anim_frame[1]=1;
    anim_frame[2]=1;
    anim_frame[3]=1;
    anim_frame[4]=1;
var anim_step  = [];
    anim_step[1]=1;
    anim_step[2]=1;
    anim_step[3]=1;
    anim_step[4]=1;
var map_step = [];
    map_step[1]=1;
    map_step[2]=1;
    map_step[3]=1;
    map_step[4]=1;

var map_steps = 2;
function gameMovement()
{
    if(keys[KEY_UP] && !(keys[KEY_UP] && keys[KEY_LEFT]) && !(keys[KEY_UP] && keys[KEY_RIGHT]))
    {
        if(getCollision({
                            X: parseInt(player_div.css('left')),
                            Y: parseInt(player_div.css('top'))-player_speed,
                            Width: player_width,
                            Height: player_height
                        }) != 'top')
        {
            player_div.css('top', (parseInt(player_div.css('top'))-player_speed) + 'px');
            playerMovementHandler(1);
            PlayerMove(1);
        }
    }

    if(keys[KEY_DOWN] && !(keys[KEY_DOWN] && keys[KEY_LEFT]) && !(keys[KEY_DOWN] && keys[KEY_RIGHT]))
    {
        if(getCollision({
            X: parseInt(player_div.css('left')),
            Y: parseInt(player_div.css('top'))+player_speed,
            Width: player_width,
            Height: player_height
        }) != 'bottom')
        {
            player_div.css('top', (parseInt(player_div.css('top'))+player_speed) + 'px');
            playerMovementHandler(4);
            PlayerMove(3);
        }
    }
    if(keys[KEY_LEFT] && !(keys[KEY_LEFT] && keys[KEY_UP]) && !(keys[KEY_LEFT] && keys[KEY_DOWN]))
    {
        if(getCollision({
            X: parseInt(player_div.css('left'))-player_speed,
            Y: parseInt(player_div.css('top')),
            Width: player_width,
            Height: player_height
        }) != 'left')
        {
            player_div.css('left', (parseInt(player_div.css('left'))-player_speed) + 'px');
            playerMovementHandler(3);
            PlayerMove(4);
        }
    }
    if(keys[KEY_RIGHT] && !(keys[KEY_RIGHT] && keys[KEY_UP]) && !(keys[KEY_RIGHT] && keys[KEY_DOWN]))
    {
        if(getCollision({
            X: parseInt(player_div.css('left'))+player_speed,
            Y: parseInt(player_div.css('top')),
            Width: player_width,
            Height: player_height
        }) != 'right')
        {
            player_div.css('left', (parseInt(player_div.css('left'))+player_speed) + 'px');
            playerMovementHandler(2);
            PlayerMove(2);
        }
    }
}

function playerMovementHandler(event)
{
    if(anim_frame[event] == animation_speed)
    {
        if(anim_step[event] == 0)anim_step[event]=1;
        animation(anim_step[event],event);
        anim_step[event]++;
        if(anim_step[event] > 4)anim_step[event]=1;
        anim_frame[event]=0;
    }
    anim_frame[event]++;
    playerMapMove(event);
}

function animation(x, y)
{
    player_div.css("background-position",(x*32)+"px "+(y*48)+"px");
}

function playerMapMove(event)
{
        switch(event)
        {
            case 1: map_div.css('margin-top', (parseInt(map_div.css('margin-top'))+map_steps) + 'px');
                break;
            case 2: map_div.css('margin-left', (parseInt(map_div.css('margin-left'))-map_steps) + 'px');
                break;
            case 3: map_div.css('margin-left', (parseInt(map_div.css('margin-left'))+map_steps) + 'px');
                break;
            case 4: map_div.css('margin-top', (parseInt(map_div.css('margin-top'))-map_steps) + 'px');
                break;

    }
    map_step[event]++;
}

















