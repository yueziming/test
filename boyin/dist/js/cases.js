"use strict";

import base from './base';

$(function(){
    //点击案例跳向案例详情
    $(".himgcon").off("click").on("click",function(){
        let id =  $(this).closest(".item").attr("data-id");
        location.href = `/casesdetail.html?id=${id}`;
    });
    //点击页数跳页
    $(".page-num").off("click").on("click",function(){
        let pageNum = $(this).text();
        location.href = `/cases.html?page=${pageNum}`;
    });
})