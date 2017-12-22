$(function(){
    init();
    //初始化数据
    function init(){
        localStorage.removeItem("orderno");
        localStorage.removeItem("PayAmount");
        var referralCode = location.search;
        if(referralCode.indexOf("?referralCode=")>-1){
            referralCode = referralCode.split("?referralCode=")[1];
            localStorage.setItem("referralCode",referralCode);
        }
        var mobilecp = localStorage.getItem("mobilecp") || '';
        //获取活动初始化数据
        // if(mobilecp){
            var param={
                url:API.GETINITDATA,
                data:{
                    Phone:mobilecp,
                    FromPage:"两地车牌拼团活动",//来源页
                }
            }
            Common.ajax(param,function(res){
                if(res && res.ResultCode == '6666'){
                    //历史成团数据
                    var historyTeamList = res.Data &&　res.Data.ObjDetail && res.Data.ObjDetail.HistoryGroups || [];
                    if(historyTeamList.length>0){
                        var htmlstr='';
                        for(var i=0;i<historyTeamList.length;i++){
                            if(historyTeamList[i].IsRegiment){
                                htmlstr+='<div class="team-group"><div class="sucteam"></div><span>'+historyTeamList[i].Name+'</span></div>'
                            }else{
                                htmlstr+='<div class="team-group"><div class="unsucteam"></div><span>'+historyTeamList[i].Name+'</span></div>'
                            }
                        }
                        $(".team-list").html(htmlstr);
                    }
                    //活动状态
                    var activStatus = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.CurrentMemberStatus || 0;
                    switch(activStatus){
                        case 0:$(".join-soon").removeClass("dsn");
                                $(".topay").addClass("dsn");
                                $(".havepay").addClass("dsn");
                                break;
                        case 1:$(".topay").removeClass("dsn");
                                $(".join-soon").addClass("dsn");
                                $(".havepay").addClass("dsn");
                                break;
                        case 2:$(".havepay").removeClass("dsn");
                                $(".join-soon").addClass("dsn");
                                $(".topay").addClass("dsn");
                                break;
                    }
                    //当前参团人数
                    var groupData = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.CurrentGroup || [];
                    if(groupData.length>0){
                        for(var i=0;i<groupData.length;i++){
                            var eleName = ".join-t.jt"+(i+1);
                            $(eleName).find(".ac-name").text(groupData[i].Name);
                            $(eleName).find(".join-tw").addClass("active");;
                        }
                    }
                    //拼团成功
                    if(groupData.length>=5){
                        $(".notice-bg").addClass("suc");
                    }
                }
                console.log(res);
            });
        // }
        //获取最新参与数据
        var param2={
            url:API.GETNEWRECODE,
            data:{
                FromPage:"两地车牌拼团活动",//来源页，根据具体活动填写
                PageSize:10,
                PageIndex:1,
            }
        }
        Common.ajax(param2,function(res){
            if(res && res.ResultCode == '6666'){
                var newList = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.InvitedUserList || [{'Name':'王**','JoinTimeStr':'1分钟前'}];
                var totalCount = res.Data &&　res.Data.TotalCount || 0;
                $(".join-total").text(totalCount);
                var len = newList.length-1;
                if(len>0){
                    var start = 0;
                    var i = setInterval(function(){
                        var str = newList[start].Name+''+(newList[start].JoinTimeStr || '刚刚')+'成功参团';
                        $(".ad-info").text(str);
                        if(start<len){
                            start++;
                        }else{
                            start=0;
                        }
                    },1600);
                }
            }
            console.log(res);
        });

        if(mobilecp&& mobilecp!=''){
            createOrderno(mobilecp);
        }
    }
    //创建订单编号
    function createOrderno(mobile){
        //获取订单号
        var param3={
            url:API.CREATEORDERNO,
            data:{
                FromPage:"两地车牌拼团活动",//来源页，根据具体活动填写
                Phone:mobile, //手机号
                ServiceCode:"", //可为空，根据具体活动填写
            }
        }
        Common.ajax(param3,function(res){
            if(res && res.ResultCode == '6666'){
                var orderno = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.OrderId || '';
                var payAmount = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.PayAmount || '';
                localStorage.setItem("orderno",orderno); 
                localStorage.setItem("PayAmount",payAmount); 
            }
        });
    }

    //点击参团规则
    $(".join-rule").off("click").on("click",function(){
        $("#marsk").show();
        $("#msgDialog").show();
    })
    //点击我知道了
    $(".see-btn").off("click").on("click",function(){
        $("#marsk").hide();
        $("#msgDialog").hide();
    })
    //点击去参团按钮
    $(".goparty-btn").off("click").on("click",function(){
        if(localStorage.getItem("mobilecp")){
            Common.tips("您已经参团了，不需要重复参团",1000);
        }else{
            $("#msgDialog").hide();
            $("#inputDialog").show();
        }
    })
    //点击立即参团按钮
    $(".join-btn").off("click").on("click",function(){
        $("#marsk").show();
        $("#inputDialog").show();
    })
    //点击参团关闭按钮
    $(".close-btn").off("click").on("click",function(){
        $("#marsk").hide();
        $("#inputDialog").hide();
    })
    //分享朋友圈按钮点击
    $(".share-btn").off("click").on("click",function(){
        $("body").append('<div class="share"><img src="./img/share.png" style="width:100%;"/></div>"');
        $(".share").off("click").on("click",function(){
            $(".share").remove();
        })
    })
    //去支付按钮点击
    $(".pay-btn").off("click").on("click",function(){
        location.href="/wxaliPays/joinsuc";
        // localStorage.setItem("paystatus","1");
    })
    //发送验证码按钮点击
    $(".yzm-btn").off("click").on("click",function(){
        if($(this).hasClass("ds")){
            return false;
        }else{
            var mobile = $.trim($("#mobile").val());
            if(Common.isMobile(mobile)){
                var count = 60;
                $(".yzm-btn").addClass("ds");
                var i = setInterval(function(){
                    count--;
                    $(".yzm-btn").text(count+"秒后重新获取");
                    if(count < 1){
                        $(".yzm-btn").removeClass("ds");
                        $(".yzm-btn").text("获取验证码");
                        clearInterval(i);
                    }
                },1000);
                var param={
                    url:API.GETVALIDATE,
                    data:{
                        Phone:mobile
                    }
                }
                Common.ajax(param,function(res){
                    console.log(res);
                });
            }else{
                Common.tips("手机号码不合法,请填写正确的手机号码",1500);
            }
        }
    })
    //提交表单
    $(".submit").off("click").on("click",function(){
        var name = $.trim($("#name").val());
        var mobile = $.trim($("#mobile").val());
        var validateCode = $.trim($("#vacode").val());
        if(name == ''){
            Common.tips("姓名不能为空",1500);
            return false;
        }
        if(!Common.isMobile(mobile)){
            Common.tips("手机号码不合法,请填写正确的手机号码",1500);
            return false;
        }else{
            localStorage.setItem("mobilecp",mobile);
            createOrderno(mobile);
        }
        if(validateCode == ''){
            Common.tips("验证码不能为空",1500);
            return false;
        }
        var param={
            url:API.SUBMIT,
            data:{
                Phone:mobile,//
                FromPage:"两地车牌拼团活动",//来源页
                PageTitle:"两地车牌办理",//
                IsConformToRule: true, //是否符合要求
                Name:name, //名称,
                SmsCode:validateCode, //手机验证码
                ReferralCode:localStorage.getItem("referralCode")
            }
        }
        Common.ajax(param,function(res){
            if(res && res.ResultCode=="6666"){
                var referralCode = res.Data && res.Data.ObjDetail && res.Data.ObjDetail.ReferralCode;
                localStorage.setItem("referralCode",referralCode);
                location.href = "/wxaliPays/joinsuc";
            }else if(res.ResultCode=="3100"){
                $("#marsk").hide();
                $("#inputDialog").hide();
                Common.tips("操作失败",1500);
                // location.href = "./unthrough.html?mobile="+mobile;
            }else if(res.ResultCode=="1100"){
                var msg = res.Data&&res.Data.Result||'输入参数无效';
                Common.tips(msg,1500);
            }else{
                Common.tips(res.Message,1500);
            }
        });
    })
})