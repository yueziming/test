"use strict";

import base from './base';

$(function(){
    //查看更多 跳转到行业资讯详情
    $(".to-newsdt").off("click").on("click",function(){
        let id = $(this).closest(".list").attr("data-id");
        location.href = `/newsdetail.html?id=${id}`;
    })
    //跳转到案例详情
    $(".topro-detail").off("click").on("click",function(){
        let id = $(this).attr("data-id");
        location.href = `/casesdetail.html?id=${id}`;
    })
    //公司查看详情点击
    $(".btn-detail").off("click").on("click",function(){
        location.href = '/about.html';
    })
    //主要行业资讯新闻跳转
    $(".mnews").off("click").on("click",function(){
        let id = $(this).attr("data-id");
        location.href = `/newsdetail.html?id=${id}`;
    })
    let c,n,m;
    let cflag,nflag,mflag;
    cflag=nflag=mflag=false;
    // 集团动态如果超过3条则滚动
    function rollCompany(){
        let newsLen;
        if(cflag){
            newsLen = $(".company-news .list").length/2;
        }else{
            newsLen = $(".company-news .list").length;
        }
        if(newsLen>3){
            if(!cflag){
                $(".company-news").append($(".company-news .list").clone());
                cflag = true;
            }
            let top = 0;
            let count = newsLen;
            clearInterval(c);
            c = setInterval(_=>{
                count --;
                top = top -142;
                if(count < 0){
                    top = 0;
                    count = newsLen;
                }else{
                    $(".company-news").css("top",`${top}px`);
                }
            },2000);
            clearInterval(n);
            clearInterval(m);
        }
    }
    // 行业动态如果超过3条则滚动
    function rollIndustry(){
        let newsLen;
        if(nflag){
            newsLen = $(".news .list").length/2;
        }else{
            newsLen = $(".news .list").length;
        }
        if(newsLen>3){
            if(!nflag){
                $(".news").append($(".news .list").clone());
                nflag = true;
            }
            let top = 0;
            let count = newsLen;
            clearInterval(n);
            n = setInterval(_=>{
                count --;
                top = top -142;
                if(count < 0){
                    top = 0;
                    count = newsLen;
                }else{
                    $(".news").css("top",`${top}px`);
                }
            },2000);
            clearInterval(c);
            clearInterval(m);
        }
    }
    
    // 媒体动态如果超过3条则滚动
    function rollMedia(){
        let newsLen;
        if(mflag){
            newsLen = $(".media-news .list").length/2;
        }else{
            newsLen = $(".media-news .list").length;
        }
        if(newsLen>3){
            if(!mflag){
                $(".media-news").append($(".media-news .list").clone());
                mflag = true;
            }
            let top = 0;
            let count = newsLen;
            clearInterval(m);
            m = setInterval(_=>{
                count --;
                top = top -142;
                if(count < 0){
                    top = 0;
                    count = newsLen;
                }else{
                    $(".media-news").css("top",`${top}px`);
                }
            },2000);
            clearInterval(c);
            clearInterval(n);
        }
    }
    rollCompany();
    //集团新闻tab激活
    $(".ctab").off("click").on("click",function(){
        $(".newslist").addClass("newsdsn");
        $(".company-news").removeClass("newsdsn");
        $(".newstab").removeClass("active");
        $(".ctab").addClass("active");
        rollCompany();
    })
    //行业资讯tab激活
    $(".ntab").off("click").on("click",function(){
        $(".newslist").addClass("newsdsn");
        $(".news").removeClass("newsdsn");
        $(".newstab").removeClass("active");
        $(".ntab").addClass("active");
        rollIndustry();
    })
    //媒体新闻tab激活
    $(".mtab").off("click").on("click",function(){
        $(".newslist").addClass("newsdsn");
        $(".media-news").removeClass("newsdsn");
        $(".newstab").removeClass("active");
        $(".mtab").addClass("active");
        rollMedia();
    })
})