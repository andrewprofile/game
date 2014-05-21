var socket;
var konsola = $('#console');
var players_id = new Array();
var anim_left = new Array(), anim_right = new Array(), anim_top = new Array(), anim_bottom = new Array();
var map = $( "#map" );
var trigger = $('.trigger_byt');
var chatbox = $('#chat');
init();

//Konfiguracja
function init() {
    var host = "ws://25.178.231.112:9000/";

    try
    {
        socket = new WebSocket(host);
        log('[Socket] Uruchamianie Socket. RS: ' + socket.readyState);

        socket.onopen = function(msg)
        {
            if(this.readyState == 1)
            {
                log("[Socket] Połączono z serwerem gry. readyState = " + this.readyState);
                sendToServer({Type: 'UserLogin',UserCode: user_code});
            }
        };

        socket.onmessage = function(msg)
        {

            var event = jQuery.parseJSON(msg.data);


            switch(event.Type)
            {
                case 'PlayerMove': ChangePlayerPos(event);
                    break;
                case 'Message': log(event.MsgString);
                    break;
                case 'ClientDisconnect': ClientDisconnect(event);
                    break;
                case 'ClientLogged': InitUser(event);
                    break;
                case 'ClientJoin': PlayerJoin(event);
                    break;
                case 'ChatOnMessage': ChatMessage(event);
                    break;
                case 'AddLogBattle': addLogBattle(event);
                    break;
                case 'addToBattleUsers': addToBattleUsers(event);
                    break;
                case 'updateToBattleUsers': updateToBattleUsers(event);
                    break;
                case 'closeBattle': closeBattle(event);
                    break;
                case 'deadBattle': deadBattle(event);
                    break;
                case 'winBattle': winBattle(event);
                    break;
                case 'updateStat': updateStat(event);
                    break;
                case 'emptyEnergy': emptyEnergy(event);
                    break;
                case 'updateLevel': updateLevel(event);
                    break;
                case 'destroyItem': destroyItem(event);
                    break;
                case 'changeNumber': changeNumber(event);
                    break;
            }
        };

        socket.onclose = function(msg)
        {
            log("[Socket] Odłączono od serwera. RS: " + this.readyState);
        };

        socket.onerror = function()
        {
            log("[ERROR] Błąd połączenia");
        }
        ItemEquip();
        Npc();
        unItemEquip();
        changeMap();
        BattleBackground();
    }

    catch(ex)
    {
    }

}
function InitUser(data){
    // Ustawianie pozycji dla triggera
    trigger.css('left', data.PosX + 'px');
    trigger.css('top', data.PosY + 'px');
    // ustawianie pozycji dla mapy ( marginesy )
    map.css('margin-left', data.MapMarginX + 'px');
    map.css('margin-top', data.MapMarginY + 'px');

    log("[GAME] Tworzenie świata..");
    // Ustawianie bg dla danej mapy.. PS: Potem możesz przesyłać całe URL w $p1
    map.css('background-image', "url('public/maps/" + data.MapName + ".png')");

}
function ClientDisconnect(userdata)
{
    $('#' + userdata.PlayerID).remove();
    log('[Gra] Gracz rozłączył się, ID: ' + userdata.PlayerID);
}
function sendToServer(object)
{
    try
    {
        socket.send(JSON.stringify(object));
    }
    catch(ex)
    {
        log(ex);
    }
}

setInterval(function(){
    sendToServer({ Type: 'PlayerMovement',
        PosX: parseInt(trigger.css('left') ),
        PosY: parseInt(trigger.css('top')),
        MapX: parseInt(map.css('margin-left')),
        MapY: parseInt(map.css('margin-top'))});
}, 1000 / 24);
//Poruszanie gracza
function PlayerMove(movetype)
{
    var createobj = {

        MoveType: movetype,
        Type: 'PlayerMovement'
    };
    sendToServer(createobj);
}
//Logi
function log(msg)
{
    konsola.append('<br />' + msg);
    console.log(msg);
}
//Dołączenie gracza
function PlayerJoin(userdata) {

    $('#map').append('<div class="tip"><div id="' + userdata.PlayerID + '" class="player" style="background-image:url(public/outfits/' + userdata.Skin + '); left: ' + userdata.PosX + 'px; top: ' + userdata.PosY + 'px;"><span class="tool"><p>' +  userdata.PlayerName  + ' [' + userdata.PlayerLevel + ']<br /> '+ userdata.PlayerClan +'</p></span></div>');
    // Unikatowe ID liczbowe
    var uniq = GetUniID();
    players_id[uniq] =  userdata.PlayerID;
    anim_left[uniq] = 0; anim_right[uniq] = 0; anim_top[uniq] = 0; anim_bottom[uniq] = 0;
}
//Pobiera ID gracza
function GetUniID() {
    var uniq=Math.floor((Math.random()*100000)+1);
    if(players_id.indexOf(uniq) == -1) return uniq;
    else return GetUniID();
}
function ProxDetector(radi, arrayObjectPos, arrayCheckPos) {
    var temppos = new Array();
    temppos[0] = (arrayObjectPos[0] - arrayCheckPos[0]); // X
    temppos[1] = (arrayObjectPos[1] - arrayCheckPos[1]); // Y
    if(((temppos[0] < radi) && (temppos[0] > -radi)) && ((temppos[1] < radi) && (temppos[1] > -radi)))
    {
        return true;
    } else {
        return false;
    }
}

//Zmiana pozycji gracza
function ChangePlayerPos(userdata)
{
    var userdiv = $('#' + userdata.PlayerID),
        userid = players_id.indexOf(userdata.PlayerID);


    if(userdata.PosY < parseInt(userdiv.css('top')))
    {
        // Z każdym przesunięciem będzie zmieniać klatka
        switch(anim_top[userid])
        {
            case 0: userdiv.css("background-position",(1*32)+"px "+(1*48)+"px");
                break;
            case 1: userdiv.css("background-position",(2*32)+"px "+(1*48)+"px");
                break;
            case 2: userdiv.css("background-position",(3*32)+"px "+(1*48)+"px");
                break;
            case 3: userdiv.css("background-position",(4*32)+"px "+(1*48)+"px");
        }

        anim_top[userid]++;
        if(anim_top[userid] > 3) anim_top[userid] = 0;

    }
    if(userdata.PosY > parseInt(userdiv.css('top')))
    {
        // Z każdym przesunięciem będzie zmieniać klatka
        switch(anim_bottom[userid])
        {
            case 0: userdiv.css("background-position",(1*32)+"px "+(4*48)+"px");
                break;
            case 1: userdiv.css("background-position",(2*32)+"px "+(4*48)+"px");
                break;
            case 2: userdiv.css("background-position",(3*32)+"px "+(4*48)+"px");
                break;
            case 3: userdiv.css("background-position",(4*32)+"px "+(4*48)+"px");
        }

        anim_bottom[userid]++;
        if(anim_bottom[userid] > 3) anim_bottom[userid] = 0;


    }
    if(userdata.PosX > parseInt(userdiv.css('left')))
    {
        // Z każdym przesunięciem będzie zmieniać klatka
        switch(anim_right[userid])
        {
            case 0: userdiv.css("background-position",(1*32)+"px "+(2*48)+"px");
                break;
            case 1: userdiv.css("background-position",(2*32)+"px "+(2*48)+"px");
                break;
            case 2: userdiv.css("background-position",(3*32)+"px "+(2*48)+"px");
                break;
            case 3: userdiv.css("background-position",(4*32)+"px "+(2*48)+"px");
        }

        anim_right[userid]++;
        if(anim_right[userid] > 3) anim_right[userid] = 0;


    }
    if(userdata.PosX < parseInt(userdiv.css('left')))
    {
        // Z każdym przesunięciem będzie zmieniać klatka
        switch(anim_left[userid])
        {
            case 0: userdiv.css("background-position",(1*32)+"px "+(3*48)+"px");
                break;
            case 1: userdiv.css("background-position",(2*32)+"px "+(3*48)+"px");
                break;
            case 2: userdiv.css("background-position",(3*32)+"px "+(3*48)+"px");
                break;
            case 3: userdiv.css("background-position",(4*32)+"px "+(3*48)+"px");
        }

        anim_left[userid]++;
        if(anim_left[userid] > 3) anim_left[userid] = 0;


    }

    userdiv.css('left', userdata.PosX+'px');
    userdiv.css('top', userdata.PosY+'px');
}
function ChatMessage(data)
{
    $('#chat').append(data.UserName + ': ' + data.MessageString + '<br />');
    setTimeout(function(){
        $('#chat').empty();
    }, 10000 );
    setTimeout(function(){
        var pos =$('#chat').scrollTop();
        $('#chat').scrollTop(pos + 30);
    }, 20);
}
function changeMap()
{
    $(".door").click(function(e){

        var door = $('.door');
        var user = $('.trigger_byt');
        var door_id = $(this).attr('id');


        if(ProxDetector(50, Array(parseInt(user.css('left')), parseInt(user.css('top'))), Array(parseInt(door.css('left')), parseInt(door.css('top')))))
        {
            var createobj = {
                Door_ID:door_id,
                Type: 'ChangeMap'
            };
            var jstophp = JSON.stringify(createobj);

            socket.send(jstophp);

            window.location.reload();
        } else {
            popup('Jesteś za daleko!')
        }




    });
}

