"use strict";

import base from './base';

$(function(){
    //点击跳向资讯详情
    // $(".item").off("click").on("click",function(){
    //     let id = $(this).attr("data-id");
    //     location.href = `/newsdetail.html?id=${id}`;
    // })
    //设置全局变量页数pagecurrent和导航id
    let pageCurrent = $(".page-num.active").text();
    let id = $(".navlist .nav.active").attr("data-id");
    //点击了解详情
    $(".todetail").off("click").on("click",function(){
        let id = $(this).closest(".item").attr("data-id");
        location.href = `/newsdetail.html?id=${id}`;
    });
    //点击页数跳页
    $(".page-num").off("click").on("click",function(){
        pageCurrent = $(this).text();
        location.href = `/news.html?page=${pageCurrent}&id=${id}`;
    });
    //点击tab导航
    $(".navlist .nav").off("click").on("click",function(){
        $(".navlist .nav").removeClass("active");
        $(this).addClass("active");
        id = $(this).attr("data-id");
        location.href = `/news.html?page=${pageCurrent}&id=${id}`;
    })
})