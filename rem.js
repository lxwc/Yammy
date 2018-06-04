(function rem(size) {
    var html = document.documentElement;
    var w = html.clientWidth;
    html.setAttribute('style', 'font-size: '+ w / size +'px !important');
    window.onresize = function () {
        rem(size);
    }
})(7.5);