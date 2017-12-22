var tid;

function refreshSize() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 640) { deviceWidth = 640 }
    document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
};
window.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshSize, 200);
}, false);
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshSize, 200);
    }
}, false);
refreshSize();
document.write('<style type="text/css">*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:rgba(255,255,255,0)}html{height:100%;font-size:90px;font-size:26.66667vw;font-family:STHeiti,Microsoft YaHei,SimHei,arial,verdana}title{display:block}a,i{text-decoration:none;font-style:normal}h1,h2,h3,h4,h5,h6{font-weight:100}ul{-webkit-margin-before:0!important;-webkit-margin-after:0!important;-webkit-padding-start:0!important}input{outline:0!important}.ios_cursor{cursor:pointer}</style>');