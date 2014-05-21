function ItemEquip()
{
    $("#eq").on("dblclick", ".item", function(e){

        var item = $('.item');
        var item_id = $(this).attr('id');
        var item_src = $(this).attr('src');
        var item_click_type = $(this).data("item");
        var item_type = $(".item_eq");
        //alert(item);

        if(item_type.hasClass(item_click_type))
        {
            //Zamiana obrazka
            var src = $('.'+item_click_type).attr('src');
            $('.'+item_click_type).attr("src", $(this).attr('src'));
            $(this).attr("src", src);

            //Zamiana id
            var id = $('.'+item_click_type).attr('id');
            $('.'+item_click_type).attr("id", $(this).attr('id'));
            $(this).attr("id", id);

            var createobj = {
                Old_ID:item_id,
                New_ID:id,
                Type: 'ChangeItem'
            };
            var jstophp = JSON.stringify(createobj);

            socket.send(jstophp);
        } else {
            if(item_click_type != "Konsupcyjne")
            {
                $('#eq-top .item' + item_click_type).append('<img class="item_eq ' + item_click_type+'" id="'+item_id+'" src="'+item_src+'" data-item="'+item_click_type+'"/>');
                $('#eq .item' + item_click_type).css({"display":"none"});
                $(this,'img').remove();
                var createobj = {
                    Item_ID:item_id,
                    Type: 'ItemEquip'
                };
                var jstophp = JSON.stringify(createobj);

                socket.send(jstophp);
            }
        }



    });

    $("#eq").on("click", ".item", function(e){
        var item_click_type = $(this).data("item");
        var item_id = $(this).attr('id');
        //Itemy konsupcyjne
        if(item_click_type == "Konsupcyjne")
        {
            var createobj = {
                Item_ID:item_id,
                Type: 'ItemKo'
            };
            var jstophp = JSON.stringify(createobj);

            socket.send(jstophp);
        }

    });

}
function unItemEquip()
{
    $("#eq-top").on("dblclick", ".item_eq", function(e){
        //$(".item_eq").dblclick(function(e){


        var item = $('.item-eq');
        var item_id = $(this).attr('id');
        var item_src = $(this).attr('src');
        var item_click_type = $(this).data("item");

        $(".item" + item_click_type).empty();
        $('#eq .item' + item_click_type).css({"display":"block"}).append('<img src="'+item_src+'" data-item="'+item_click_type+'" class="item" id="'+item_id+'"/>');

        var createobj = {
            Item_ID:item_id,
            Type: 'unItemEquip'
        };
        var jstophp = JSON.stringify(createobj);

        socket.send(jstophp);
    });
}
function destroyItem(data)
{
    $("#" + data.ID).remove();
}
function changeNumber(data)
{
    $("." + data.ID).html("<b>Ilość: </b>" + data.NumberItem);
}