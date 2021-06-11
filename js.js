$(document).ready(function () {

    function Main() {
        $('body').on('contextmenu', function (e) {
            //return false;
        })
    }

    //BODY COLORS
    var n = $('body').width() / 255;
    var m = $('body').height() / 255;
    var par1 = 0;
    var par2 = 0;
    var par3 = 0;
    /////////////////////////////////

    //SPRITE COLOR PARAMS
    var P1;
    var P2;
    var P3;
    ////////////////////////////////

    //ANGLE PARAMETERS
    var d = $('body').width() / 360;
    var degToEnd = 0;
    ////////////////////////////////

    //GLOBAL COORDINATES
    var gX;
    var gY;
    ////////////////////////////////

    //SPRITE POSITION
    var startPosX = 0;
    var startPosY = 0;
    var endPosX = 0;
    var endPosY = 0;

    var increementX = 0;
    var increementY = 0;

    var diagonal = 0;
    /////////////////////////////

    //SPRITE ANGLE
    var objDegree = 0;
    /////////////////////////////

    //SPRITE COUNTERS
    var i = 0;
    var reactFrom = 1;
    ////////////////////////////

    function SideBarCP(display) {
        var controlBoxWidth = $('.controlBox').width();
        $('.controlBox').css('display', display);
        $('body').css({ 'background-color': '#123' });

        $('.openClose').on('click', function () {
            if ($('.controlBox').width() == controlBoxWidth) {

                $('.controlBox').css({ 'width': '30px' });
                $('.openClose').html('»');
                $('.fullGroup').hide();
            }
            if ($('.controlBox').width() == 30) {

                $('.controlBox').css({ 'width': `${controlBoxWidth}px` });
                $('.openClose').html('«');
                $('.fullGroup').show(800);
            }
        });

        $('.openClose').hover(function () {
            if ($('.controlBox').width() == 320) {
                $(this).css({ 'margin-right': '2px' });
            }
        }, function () {
            if ($('.controlBox').width() == 320) {
                $(this).css({ 'margin-right': '-2px' });
            }
        });

        $('.openClose').hover(function () {
            if ($('.controlBox').width() == 30) {
                $(this).css({ 'margin-right': '-2px' });
            }
        }, function () {
            if ($('.controlBox').width() == 30) {
                $(this).css({ 'margin-right': '2px' });
            }
        });
    }
    function AnimateBackground() {

        $('body').on('mousemove', function (e) {

            gX = e.pageX;
            gY = e.pageY;

            par1 = Math.floor((e.pageX + 1) / n);
            par2 = Math.floor(((e.pageX + e.pageY) / (n * m)) / 2.1);
            par3 = Math.floor((e.pageY + 2) / m);

            degToEnd = Math.floor((e.pageX + 362) / (d));

            if (par1 < 20) { par1 = 20; }
            if (par3 < 50) { par3 = 50; }
            if (par3 > 200) { par3 = 200; }

            $('body').css({
                'background-color': 'rgba(0, 10, 40)'
                //'background-image': `linear-gradient(${degToEnd}deg, rgb(${par1}, ${par2}, ${par3}), rgb(${par3}, ${par2}, ${par1})`,
            });

        });
    }
    function MovableToolTip() {
        $('body').append('<div class="myTooltip"><div class="coordinateDot"></div></div>');
        $('.myTooltip').append('<span id="P1"></span></br>');
        $('.myTooltip').append('<span id="P2"></span></br>');
        $('.myTooltip').append('<span id="P3"></span></br>');

        var movX;
        var movY;

        $('body').on('mousemove', function (e) {

            $('#P1').html(`<b>BC-PAR:</b> RGB(${par1}, ${par2}, ${par3})`);
            $('#P2').html(`<b>BC-Angle:</b>  ${degToEnd}°`);
            $('#P3').html(`<b>POINTS:</b> X:${e.pageX} / Y:${e.pageY}`);

            movX = e.pageX - $('.myTooltip').width();
            movY = e.pageY - $('.myTooltip').height();

            if (e.pageX < $('.myTooltip').width()) { movX = 0; }
            if (e.pageY < $('.myTooltip').height()) { movY = 0; }

            $('.myTooltip').css({
                'left': `${movX}px`,
                'top': `${movY}px`
            });
        });


    }
    function ShowDebugLog() {
        $('body').append('<div class="DebugLog"></div>');
        $('.DebugLog').append('<h4>Debugger Log</h4>');
        $('.DebugLog').append(`<p id="OP1"></p>`);
        $('.DebugLog').append(`<p id="OP2"></p>`);
        $('.DebugLog').append(`<p id="OP3"></p>`);
        $('.DebugLog').append(`<p id="OP4"></p>`);
        $('.DebugLog').append(`<p id="OP6"></p>`);
        $('.DebugLog').append(`<p id="OP5"></p>`);
        $('.DebugLog').append(`<p id="OP7"></p>`);
        $('.DebugLog').append(`<p id="OP8"></p>`);

        setInterval(function () {
            $('#OP1').html(`<b>BODY B-COLOR:</b> RGB(${par1}, ${par2}, ${par3})`);
            $('#OP2').html(`<b>CURSOR POSITION:</b> X:${gX} / Y${gY}`);
            $('#OP3').html(`<b>- OBJ CURRENT POS -</b> </br> X:${startPosX} </br> Y:${startPosY}`);
            $('#OP4').html(`<b>OBJ END POS:</b> X:${endPosX} / Y:${endPosY}`);
            $('#OP6').html(`<b>- DISTANCE -</b> </br> X:${endPosX - startPosX} <br> Y:${endPosY - startPosY}`);
            $('#OP7').html(`<b>INCREEMENT:</b> </br> X:${incX} </br> Y:${incY}`);
            $('#OP4').on('click', function () { generateNewCoordinates(); });
            $('#OP5').html(`<b>NODES APPEND:</b> ${i}`);
            $('#OP8').html(`<b>VIEW CODES?</b> ON ${i}`);
            
            
        })

    }
    function AddPoints() {
        $('.Destination').remove();
        $('body').append('<div class="Destination"></div>');
        $('.Destination').css({ 'top': endPosY + 'px', 'left': endPosX + 'px' });

    }

    var incX = 0;
    var incY = 0;

    function generateNewCoordinates() {

        //$('.n1').remove();
        //i = 0;

        increementX = 0;
        increementY = 0;

        startPosX = endPosX;
        startPosY = endPosY;

        endPosX = 400; //Math.floor(Math.random() * $('body').width());
        endPosY = 400; //Math.floor(Math.random() * $('body').height());

        diagonal = Math.sqrt(Math.pow(endPosX, 2) + Math.pow(endPosY, 2));

        increementX = ((endPosX - startPosX) / diagonal);
        increementY = ((endPosY - startPosY) / diagonal);

        AddPoints();
    }

    function Sprite() {
        generateNewCoordinates();

        setInterval(function () {

            i++;
            objDegree += 1;
            incX = (((2 * Math.PI) * (diagonal / 2)) / 2);
            incY += 0.2875;

            startPosX += Math.sin((incY * Math.PI) / 360);
            startPosY += Math.cos((incY * Math.PI) / 360);



            // if (startPosX >= $('body').width() || startPosY >= $('body').height()) {
            //     generateNewCoordinates();
            // }
            if (startPosX >= endPosX && startPosY >= endPosY) {
                generateNewCoordinates();
            }


            $('body').append(`<div class='obj${i} n1'></div>`);
            $(`.obj${i}`).css({
                'left': `${(startPosX - 10)}px`,
                'top': `${startPosY - 10}px`,
                'width': `${20}px`,
                'height': `${20}px`,
                'background-image': `radial-gradient(rgba(${par2}, ${par3}, ${par1}, 1), rgba(${par2}, ${par1}, ${par3}, 1), rgba(0,0,0,0.7) 99%)`,
                'position': 'absolute',
                'border-radius': `30%`,
                //'border': '1px solid black',
                //'box-shadow': '0 0 1px black',
                'transform': `rotate(${objDegree}deg)`
            });


            $(`.obj${i - 250}`).remove();
            if (i == 3000) { generateNewCoordinates(); }

        }, 10);
    }

    var startOnlyOneTime = 1;
    $('body').on('click', function () {
        P1 = par1; P2 = par2; P3 = par3;
        if (startOnlyOneTime == 1) { Sprite(); startOnlyOneTime = 0; }
    });

    // MovableToolTip();
    ShowDebugLog();
    AnimateBackground();
    SideBarCP('none');
    Main();
});

