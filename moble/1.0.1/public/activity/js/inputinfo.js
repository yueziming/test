$(function(){
    console.log("加载了1");
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
    //公司多选按钮点击
    $(".my-company").on("ontouched",function(){
        Common.tips("点击了公司选择按钮",1500);
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    });
    //资产点击
    $(".radio-price").off("click").on("click",function(){
        $(".radio-price").removeClass("active");
        $(this).addClass("active");
    });
    //获取验证码
    $("#get-qrcode").off("click").on("click",function(){
        // alert("点击了验证码按钮");
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
    //点击抢票
    $("#getpage-btn").off("click").on("click",function(){
        var flag = isOther();
        // if(flag){
            // Common.tips("对不起你没有资质",1500);
        // }else{
            var companyName = $.trim($("#compannyName").val());
            var mobile = $.trim($("#mobile").val());
            var validateCode = $.trim($("#validateCode").val());
            var invitedCode = $.trim($("#invitedCode").val());
            if(companyName == ''){
                Common.tips("公司名称不能为空",1500);
                return false;
            }
            if($(".company.active").length == 0){
                Common.tips("请至少选择一个企业类型",1500);
                return false;
            }
            if($(".radio-price.active").length == 0){
                Common.tips("请选择企业净资产",1500);
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
                    PageTitle:"小贷活动页_抢牌",//
                    ReferralCode: invitedCode || "", //推荐码
                    EnterpriseNetAssets:$.trim($(".radio-price.active").text()), //净资本(string)
                    CompanyName:companyName, //企业名称,
                    SmsCode:validateCode, //手机验证码
                    JoinActiveType:0,
                    IsConformToRule:(flag==1?true:false)
                }
            }
            param.data.CompanyTypeList = [];
            var $con = $(".company.active");
            for(var i=0;i<$con.length;i++){
                param.data.CompanyTypeList.push($.trim($con.eq(i).text()));
                // Common.tips(param.data.IsConformToRule,1500);
            }
            Common.ajax(param,function(res){
                if(res.ResultCode=="6666"){
                    location.href = "./through.html?mobile="+mobile;
                }else if(res.ResultCode=="3100"){
                    location.href = "./unthrough.html?mobile="+mobile;
                }else if(res.ResultCode=="1100"){
                    Common.tips(res.Data.Result,1500);
                }else{
                    Common.tips(res.Message,1500);
                }
            });
        // }
    })
    //判断是否只选了其他公司//判断总资产是否小于6亿
    function isOther(){
        var flag = 1;
        if($(".company.active").length == 1){
            var company = $.trim($(".company.active").text());
            if(company == "其它"){
                flag = 0;
            }
        }
        if($(".radio-price").eq(0).hasClass("active")){
            flag = 0;
        }
        return flag;
    }
});