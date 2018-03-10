window.onload = _=>{
    let activeUrl = location.pathname.slice(1);
    activeUrl = activeUrl.split(".")[0].toLocaleLowerCase();
    switch(activeUrl){
        case 'service': $(".snav").addClass("active");
                        $(".fsnav").addClass("active");
                        break;
        case 'casesdetail':
        case 'cases': $(".cnav").addClass("active");
                      $(".fcnav").addClass("active");
                        break;
        case 'newsdetail':
        case 'news': $(".nnav").addClass("active");
                     $(".fnnav").addClass("active");
                        break;
        case 'about': $(".anav").addClass("active");
                     $(".fanav").addClass("active");
                        break;
        default: $(".hnav").addClass("active");
                 $(".fhnav").addClass("active");
                 break;
    }
    //页面滚动
    window.onscroll = _=>{ 
        var t = document.documentElement.scrollTop || document.body.scrollTop; 
        if( t >0 ) { 
            $(".header").addClass("active");
        }else{
            $(".header").removeClass("active");
        }
    } 
}