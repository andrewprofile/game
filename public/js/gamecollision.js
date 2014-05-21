



var  col_l = colarray.length;




function De(OBJ, OBJ2)
{
    if((OBJ2.X <= OBJ.X+OBJ.Width) && (OBJ.Y < OBJ2.Y+OBJ2.Height) && (OBJ2.Y < OBJ.Y+OBJ.Height) && (OBJ2.X > OBJ.X+ OBJ.Width-3))
    {
        return 'left'; // U gracza
    } else if((OBJ2.Y <= OBJ.Y+OBJ.Height) && (OBJ2.Y > OBJ.Y+OBJ.Height-3) && (OBJ2.X <= OBJ.X+OBJ.Width) && (OBJ2.X >= OBJ.X-OBJ2.Width))
    {
        return 'top'; // U GRACZA
    } else if((OBJ2.X+OBJ2.Width >= OBJ.X) && (OBJ2.X+OBJ2.Width < OBJ.X+3) && (OBJ.Y < OBJ2.Y+OBJ2.Height) && (OBJ2.Y < OBJ.Y+OBJ.Height))
    {
        return 'right';
    } else if((OBJ2.X <= OBJ.X+OBJ.Width) && (OBJ2.X >= OBJ.X-OBJ2.Width) && (OBJ2.Y+OBJ2.Height >= OBJ.Y) && (OBJ2.Y+OBJ2.Height < OBJ.Y+3))
    {
        return 'bottom';
    } else { return false; }
}

function getCollision(OBJ2)
{
    var iftrue = false;
    for(i = 0; i < col_l; i++)
    {
        iftrue = De(colarray[i],OBJ2);
       // $('#div2').css('border', 'none'); // DO USUNIĘCIA
       // $('#div2').css('border-'+iftrue, '5px solid rgb(200,60,80)');// DO USUNIĘCIA
        if(iftrue !== false)
            return iftrue;
    }
}
