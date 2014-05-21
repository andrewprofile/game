function BattleBackground()
{
    $(".monster").click(function(e){

        //Przygotowywanie walki
        var user = $('.trigger_byt');
        var monster_id = $(this).attr('id');


        var monster_name = $(this).data("name");
        var monster= $(".monster");

        if(monster.hasClass(monster_name))
        {
            var m = $('.'+monster_name);
            if(ProxDetector(50, Array(parseInt(user.css('left')), parseInt(user.css('top'))), Array(parseInt(m.css('left')), parseInt(m.css('top')))))
            {
                $( "#fight" ).slideDown("slow")


                var createobj = {
                    Monster_ID:monster_id,
                    Type: 'BattleBackground'
                };
                var jstophp = JSON.stringify(createobj);

                socket.send(jstophp);

                //Logika walki
                $(".skill").click(function(e){
                    var skill_name = $(this).attr('id');

                    var createobj = {
                        Monster_ID:monster_id,
                        Skill_Name:skill_name,
                        Type: 'BattleCore'
                    };
                    var jstophp = JSON.stringify(createobj);

                    socket.send(jstophp);
                });
            } else {
                popup('Jesteś za daleko!')
            }
        }



    });
}
function addLogBattle(data)
{
    $('#fight-log').append(data.UserName + ' ' + data.MessageString + '<br />');
    setTimeout(function(){
        var pos =$('#fight-log').scrollTop();
        $('#fight-log').scrollTop(pos + 30);
    }, 20);
    //Pokazanie nad graczem zadanych obrażeń
    setTimeout(function(){
        $('.damageDIV').addClass('damage');
        setTimeout(function(){$('.damageDIV').removeClass('damage').text(' ');}, 5000);
    }, 1);

    data.Skill_Regenerate = data.Skill_Regenerate + '000';


    setTimeout(function(){
        $(".skill").css('opacity', '0.5');

        setTimeout(function(){
            $(".skill").css('opacity', '1');

        }, data.Skill_Regenerate );


    }, 1 );
}
function addToBattleUsers(data)
{
    $('#fight-users').append('<div class="tip"><div style="position:absolute; left:50px; top:300px; width:32px; height:46px; background-position: 64px 96px; background-image:url(public/outfits/'+ data.Skin +');"><span class="tool"><p>'+ data.UserName + '<br />HP: ' + data.HP +'</p></span></div>');
    $('#fight-users').append('<div class="tip"><div style="position:absolute; left:500px; top:300px; width:'+ data.MonsterWidth +'px; height:'+ data.MonsterHeight +'px; background-image:url(public/outfits/'+ data.MonsterSkin +');"><span class="tool"><p>'+ data.MonsterName + '<br />HP: ' + data.MonsterHP +'</p></span></div>');
}
function updateToBattleUsers(data)
{
    $('#fight-users').empty();
    $('#fight-users').append('<div class="tip"><div style="position:absolute; left:50px; top:300px; width:32px; height:46px; background-position: 64px 96px; background-image:url(public/outfits/'+ data.Skin +');"><span class="tool"><p>'+ data.UserName + '<br />HP: ' + data.HP +'</p></span></div><div style="position: absolute; left:50px; top:270px;" class="damageDIV"><span style="color:red; font-weight:bold; text-shadow: 1px 1px #ff7224;">'+ data.MonsterAttack +'</span></div>');
    $('#fight-users').append('<div class="tip"><div style="position:absolute; left:500px; top:300px; width:'+ data.MonsterWidth +'px; height:'+ data.MonsterHeight +'px; background-image:url(public/outfits/'+ data.MonsterSkin +');"><span class="tool"><p>'+ data.MonsterName + '<br />HP: ' + data.MonsterHP +'</p></span></div><div style="position:absolute; left:500px; top:270px;" class="damageDIV"><span style="color:green; font-weight:bold; text-shadow: 1px 1px #1e931e;">'+ data.Attack +'</span></div>');
}
function closeBattle(data)
{
    $("#close-fight").css('display', 'block');
    $("#close-fight").click(function(e){

        $( "#fight" ).slideUp("slow")

        //Czyścimy diva z walki
        $('#fight-log').text('')
        $('#fight-users').text('')
        $("#close-fight").css('display', 'none');
    });
}
function winBattle(data)
{
alert("Zarobiłeś expa");
}
function deadBattle(data)
{
alert("Przegrałeś cieniasie!");
}
function updateStat(data)
{
    if(data.Stat == 'exp')
    {
        var stat = data.Exp / data.ToLevel * 100;
        $('.stat' + data.Stat).css("width", stat + '%');
    }
    if(data.Stat = 'hp')
    {
        var stat = data.Hp / data.FullHp * 100;
        $('.stat' + data.Stat).css("width", stat + '%');
    }
    if(data.Stat = 'energy')
    {
        var stat = data.Energy / data.FullEnergy * 100;
        $('.stat' + data.Stat).css("width", stat + '%');
    }
}
function emptyEnergy(data)
{
    popup("Nie masz tyle energii!");
}
function updateLevel(data)
{
    $('.userinfo').empty();
    var Level = data.Level;
    $('.userinfo').html('<h1 class="userinfo">'+ data.UserName + ' [' + Level + ']</h1>')
}