<?php

class user_index_game {

    private $kernel;

    public function __construct(Kernel $kernel)
    {
        $this->kernel = $kernel;
        if($this->kernel->modules('User')->checkGroup() == 'guest') header("Location: ?section=login");
        $this->index();
    }
    public function index()
    {
        $user_code = sha1(uniqid(rand(), true));
        $stmt = $this->kernel->modules('database')->select("sessions", '`session_id` = \''.$_COOKIE['user'].'\'');
        foreach($stmt as $row)
        {
            $user_id = $row['session_user'];
        }
        $this->kernel->modules('database')->update("users",array(
                "user_code" => $user_code
            ), '`user_id` = \''.$user_id.'\'');


        $this->kernel->modules('template')->getTemp('header');


        echo <<<END

<div id="top">
<li>Ekwipunek</li>
<li>Statystyki</li>
<li>Przyjaciele</li>
<li>Wrogowie</li>
<li>Klan</li>
<li>Questy</li>
<li>Ustawienia</li>
<li>Profil</li>
<li>Statystyki</li>
</div>





  <div id="global">



        <div id="console"></div>
<div class="window">
<div id="chat"></div>
    <div style="background:url(public/maps/{$this->kernel->libs('settings')->getMap()}.png); background-repeat:no-repeat; margin-left:{$this->kernel->libs('settings')->getMapCord2('x')}px; margin-top:{$this->kernel->libs('settings')->getMapCord2('y')}px" id="map" class="map">
        <div class="player trigger_byt" style="background-image:url(public/outfits/{$this->kernel->libs('settings')->getSkin()}); left: {$this->kernel->libs('settings')->getMapCord('x')}px; top: {$this->kernel->libs('settings')->getMapCord('y')}px;"></div>
   {$this->kernel->libs('settings')->getDoors()}
    {$this->kernel->libs('settings')->getMonsters()}
      {$this->kernel->libs('settings')->getNpcs()}
    </div>
</div>
 <div id="fight" style="width:600px; height:600px; background-image:url(public/maps/fight.png); display:none; position: absolute;">
 <div id="close-fight" style="display:none; float:right; margin:10px;"><img style="cursor:pointer;" src="public/default/images/close.png"/></div>

<div id="fight-users">

</div>

<div id="fight-skills">
{$this->kernel->libs('settings')->getSkills()}
</div>
 <div id="fight-log""></div>

 </div>












<div id="right">
  <h1 class="userinfo">{$this->kernel->modules('User')->checkLogin()} [{$this->kernel->modules('User')->checkLevel()}]</h1>

  <div class="eq" id="eq-top">
  <li style="opacity:0;"></li>
   <li class="itemHelm">{$this->kernel->libs('settings')->getItem('Helm')}</li>
    <li style="opacity:0;"></li>
	 <li class="itemRekawice">{$this->kernel->libs('settings')->getItem('Rekawice')}</li>
	  <li class="itemNaszyjnik">{$this->kernel->libs('settings')->getItem('Naszyjnik')}</li>
	   <li class="itemPierscien">{$this->kernel->libs('settings')->getItem('Pierscien')}</li>
	    <li class="itemJednoreczna">{$this->kernel->libs('settings')->getItem('Jednoreczna')}</li>
		 <li class="itemZbroja">{$this->kernel->libs('settings')->getItem('Zbroja')}</li>
		  <li class="itemDwureczna">{$this->kernel->libs('settings')->getItem('Dwureczna')}</li>
		  <li style="opacity:0;"></li>
		  <li class="itemButy">{$this->kernel->libs('settings')->getItem('Buty')}</li>
		  <li style="opacity:0;"></li>
  </div>


  <div id="stats">
<div class="progress-bar hp stripes">
    <span class="stathp" style="width: {$this->kernel->libs('settings')->getStat('hp')}%"></span>
</div>
<div class="clr"></div>
<div class="progress-bar energy stripes">
    <span class="statenergy" style="width: {$this->kernel->libs('settings')->getStat('energy')}%"></span>
</div>
<div class="clr"></div>
<div class="progress-bar exp stripes">
    <span class="statexp" style="width: {$this->kernel->libs('settings')->getStat('exp')}%"></span>
</div>

<div class="clr"></div>

  <div id="gold"><img src="public/default/images/gold.png"/>{$this->kernel->modules('User')->checkGold()}</div>



</div>

  <div class="clr"></div>
  <div class="eq" id="eq">
{$this->kernel->libs('settings')->getItems()}
  </div>

  </div>






 

<script>
var user_code = '$user_code'


$(document).keypress(function(e){
     if(navigator.appName == "Netscape")
    Key = e.charCode;
else
    Key = e.keyCode;

 });

</script>

 
<div id="chatbox">
 <input id="chat_message" type="text" name="chat_message">
<script>
$('#chat_message').keyup(function(e){
if(Key == 13)
{
sendToServer({Type: "ChatMessage", Message: $(this).val() });
chat_message.value = '';
}
});
</script>
  <button class="button-chat"chat">Ogólny</button>
  <button class="button-chat">Klan</button>
  <button class="button-chat">Grupa</button>
</div>
 
<script src="public/js/npc.js"></script>
<script src="public/js/battle.js"></script>
<script src="public/js/items.js"></script>
<script src="public/js/client.js"></script>
<script src="public/js/gameinit.js"></script>
<script src="public/js/gameinput.js"></script>
<script src="public/js/collisions/{$this->kernel->libs('settings')->getMap()}Collision.js"></script>
<script src="public/js/gamecollision.js"></script>
<script src="public/js/gamemovement.js"></script>
<script src="public/js/game.js"></script>


<div class="popup"></div>
END;




    }





}




?>