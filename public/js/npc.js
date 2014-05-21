function Npc()
{
    $(".npc").click(function(e){

        var npc = $('.npc');
        var npc_id = $(this).attr('id');
        var npc_name = $(this).data("name");
        var user = $('.trigger_byt');


        if(npc.hasClass(npc_name))
        {
            var npc = $('.'+npc_name);
            if(ProxDetector(50, Array(parseInt(user.css('left')), parseInt(user.css('top'))), Array(parseInt(npc.css('left')), parseInt(npc.css('top')))))
            {
                alert("Nie tak mocno!");
            } else {
                popup('Jesteś za daleko!')
            }

        }
    });
}