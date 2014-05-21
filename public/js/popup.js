function popup(message) {

    setTimeout(function(){
        $( ".popup" ).slideDown("slow")
        $(".popup").html(message);

        setTimeout(function(){

            $( ".popup" ).slideUp("slow")

        }, 3000 );

    }, 1 );


}
