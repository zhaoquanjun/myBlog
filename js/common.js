/**
 * Created by Administrator on 2016/8/25.
 */

function getUriParam(){
    var url = window.location.href;
    var params = url.split('?')[1];

    var paramRow = new Array();
    paramRow['cid'] = 698;
    paramRow['page'] = 1;
    paramRow['q'] = "";
    if(params){
        var Row = params.split('&');
        for(var i=0;i<Row.length;i++){
            var info = Row[i].split('=');
            paramRow[info[0]] = info[1];
        }
    }
    return paramRow;
}
function down(){
    var h = $('#down').offset().top;
    console.log(h);
    $('html,body').stop().animate({'scrollTop':h},500);
}
function toTop(){
    $('html,body').stop().animate({'scrollTop':0},500);
}

$(function(){

    console.log($(window).height());
    $(".loading").css({"height": $(window).height() + "px",paddingTop:$(window).height()/2 + "px"});


    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowWidth = $(this).width();
        var windowHeight = $(this).height();

       if(scrollTop > 200){
           $('.goback').fadeIn(1000);
       }else{
           $('.goback').fadeOut(1000);
       }

    });
})
