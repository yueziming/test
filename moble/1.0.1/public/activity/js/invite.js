$(function () {
    var PageIndex = 1;
    var PageTotal = 1;
    //没有登录直接跳回填写信息页面
    var mobile = localStorage.getItem("mobile") || false;
    if (!mobile) {
        location.href = "/activity/inputinfo.html?invited=0";
    }
    //请求二维码
    $(".share-qrcode img").attr("src",Common.baseUrl+""+API.GETQRCODE+"?FromPage=小贷&Phone="+mobile+"&ToUrl="+encodeURIComponent(location.origin+"/activity/index.html"));
    // var param ={
    //     url:API.GETQRCODE,
    //     data:{
    //         FromPage:"小贷",//来源页
    //         Phone:mobile, //手机号
    //         ToUrl:location.host, //转跳页面
    //     }
    // }
    // Common.ajax(param,function(res){
    //     console.log(res);
    // });
    //请求邀请数据
    function requestVisited(flag){
        var param = {
            url: API.GETCLIENTVISITED,
            data: {
                FromPage: "小贷",//来源页
                PageSize: 10,
                PageIndex: PageIndex,
                Phone: mobile, //手机号
            }
        }
        Common.ajax(param, function (res) {
            if (res.ResultCode == "6666") {
                var invitedTotal = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.InvitedNum || 0;
                PageTotal = Math.ceil(invitedTotal/10);
                var invitedSuc = 0;
                if(invitedTotal){
                    invitedSuc = res.Data.ObjDetail.SuccAppoNum;
                    $(".invite-fr").text(invitedTotal);
                    $(".invite-suc").text(invitedSuc);
                    var data = res.Data.ObjDetail.InvitedUserList || null;
                    if(data){
                        var htmlstr = "";
                        for(var i=0;i<data.length;i++){
                            htmlstr += '<tr><td>'+data[i].Name+'</td>'+
                                '<td>'+data[i].PhoneNumber+'</td>'+
                                '<td>'+(data[i].IsSuccAppointment?'是':'否')+'</td>'+
                                '<td>'+data[i].JoinTime+'</td></tr>';
                        }
                        if(flag == 1){
                            $("tbody").html(htmlstr);
                        }else{
                            $("tbody").append(htmlstr);
                        }
                    }
                }
            } else {
                Common.tips(res.Message, 1500);
            }
        })
    };
    requestVisited(1);
    //点击加载更多
    $("#more").off("click").on("click",function(){
        if(PageIndex<PageTotal){
            PageIndex++;
            requestVisited(2);
        }
    })
    //判断是否有滚动条
    // function isScroll(){
    //     $("#tableContent").scrollTop(10);//控制滚动条下移10px
    //     if( $("#tableContent").scrollTop()>0 ){
    //       console.log("有滚动条");
    //     }else{
    //       console.log("没有滚动条");
    //     }
    //     $("#tableContent").scrollTop(0);
    // }
    // $("#tableContent").scroll(function () {
    //     var scrollTop = $("#tableContent").scrollTop();
    //     var scrollHeight = $("table").height();
    //     var windowHeight = $("#tableContent").height();
    //     if (scrollTop + windowHeight == scrollHeight) {
            
    //     }
    // });
    $(".share-btn").off("click").on("click",function(){
        $("body").append('<div class="share"><img src="./img/share.png"/></div>"');
        //第一种方式：使用appId,signature
        // var shareData = {
        //     appId: 'wx26cdac6b679b32e9',
        //     appSecret: 'bba57000821ac67cbcee3a573db85498',
        //     title: '小额贷款',
        //     desc: '小额贷款',
        //     link: 'http://tm.itenbo.com/activity/index.html?invited='+inviteCode,
        //     imgUrl: '../img/icon.jpg'
        // };
        // $.wechatShare(shareData);
        $(".share").off("click").on("click",function(){
            $(".share").remove();
        })
    })
})