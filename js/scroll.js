/**
 * Created by Administrator on 2016/8/23.
 */
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowWidth = $(this).width();
    var windowHeight = $(this).height();
    console.log(windowWidth);
    if (scrollTop + windowHeight == scrollHeight) {
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        console.log(scrollTop + "/" + windowHeight + "/" + scrollHeight);
        //alert("bottom reached !");
    }
});