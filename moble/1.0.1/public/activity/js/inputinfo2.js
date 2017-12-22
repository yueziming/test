$(function(){
    //判断是否有推荐码
    function hasInvited(){
        if(location.search.indexOf("?invited=")>-1){
            let search = location.search.split("invited=")[1];
            if(search != 0){
                $("#invitedCode").val(search);
                $("#invitedCode").attr("disabled",true);
            }
        }
    }
    hasInvited();
    //获取验证码
    $(".get-qrcode").off("click").on("click",function(){
        // alert("点击了获取验证码");
        var mobile = $.trim($("#mobile").val());
        if(Common.isMobile(mobile)){
            $("#getYzmBtn").parent("button").attr("disabled",true);
            $("#getYzmBtn").parent("button").css("background-color","#b1b0af");
            var count = 60;
            var i = setInterval(function(){
                count--;
                $("#getYzmBtn").text(count+"秒后重新获取");
                if(count < 1){
                    $("#getYzmBtn").parent("button").css("background-color","#ffd700");
                    $("#getYzmBtn").text("获取验证码");
                    $("#getYzmBtn").parent("button").attr("disabled",null);
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
    });
    //获取iphone-X
    $("#getIphone").off("click").on("click",function(){
        alert("点击了获取iphone-X");
        var name = $.trim($("#name").val());
        var mobile = $.trim($("#mobile").val());
        var validateCode = $.trim($("#validateCode").val());
        var invitedCode = $.trim($("#invitedCode").val());
        if(name == ''){
            Common.tips("姓名不能为空",1500);
            return false;
        }
        if(!Common.isMobile(mobile)){
            Common.tips("手机号码不合法,请填写正确的手机号码",1500);
            return false;
        }else{
            localStorage.setItem("mobile",mobile);
        }
        if(validateCode == ''){
            Common.tips("验证码不能为空",1500);
            return false;
        }
        var param={
            url:API.GETTICKET,
            data:{
                Phone:mobile,//
                FromPage:"小贷",//来源页
                PageTitle:"小贷活动页_抢iPhonex",//
                ReferralCode: invitedCode || "", //推荐码
                SmsCode:validateCode, //手机验证码
                IsConformToRule:true,
                Name:name,//客户名
                JoinActiveType:1 //参与活动类型
            }
        }
        Common.ajax(param,function(res){
            if(res.ResultCode=="6666"){
                location.href = "./getinfoSuc.html";
            }else if(res.ResultCode=="3100"){
                location.href = "./getinfoSuc.html";
            }else if(res.ResultCode=="1100"){
                Common.tips(res.Data.Result,1500);
            }else{
                Common.tips(res.Message,1500);
            }
        });
    })
});