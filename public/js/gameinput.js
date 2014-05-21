var keys = [];

$(document).keydown(function(e){
    if(navigator.appName != "Netscape")
        keys[e.charCode] = true;
    else
        keys[e.keyCode] = true;

    //console.log(e.keyCode + navigator.appName + e.charCode);
});

$(document).keyup(function(e){
    if(navigator.appName != "Netscape")
        keys[e.charCode] = false;
    else
        keys[e.keyCode] = false;


});
// Definicje klawiszy

var KEY_UP      = 38,
    KEY_DOWN    = 40,
    KEY_RIGHT   = 39,
    KEY_LEFT    = 37,
    KEY_W       = 119,
    KEY_D       = 97,
    KEY_GRAWIS  = 96,
    KEY_S       = 115,
    KEY_A       = 100;
