var Common = {
    baseUrl:'',
    init:function(){
        var self = this;
        if(location.hostname == 'localhost'){
            self.baseUrl = "http://testapi.itenbo.com";
        }else if (location.hostname == "tm.itenbo.com") {
            self.baseUrl = "http://testapi.itenbo.com"
        } else {
            self.baseUrl = "http://testapi.itenbo.com"
            // self.baseUrl = "http://api.itenbo.com";
            // self.baseUrl = "http://172.16.194.103/TbWebApi"
        }
    },
    ajax:function(param,callback){
        var self = this;
        self.ajaxLoading();
        $.ajax({
            url:self.baseUrl+param.url,
            data:param.data,
            type:param.type || "post",
            dataType:"json",
            success:function(res){
                if(res){
                    callback(res);
                    self.ajaxLoadingStop();
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                // console.log("网络异常");
                self.tips("网络异常",1000);
                self.ajaxLoadingStop();
            }
        })
    },
    //ajax的loading样式
    ajaxLoading: function () {
        var loadingHtml = '<div id="loading" class="mask-loading"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>加载中</div></div>';
        $("body").append(loadingHtml);
    },
    //ajax的loading停止
    ajaxLoadingStop: function () {
        $("#loading").remove();
    },
    //设置本地sessionStorage
    setLocalstorage:function(key,value){
        if(typeof value == 'object'){
            localStorage.setItem(key,JSON.stringify(value));
        }
        else{
            localStorage.setItem(key,value);
        }
    },
    //获取本地session数据
    getLocalstorage:function(key){
        try{
            var data = JSON.parse(localStorage.getItem(key));
        }catch(e){
            var data = localStorage.getItem(key);
        }
        return data;
    },
    //销毁本地sessionStorage
    destoryLocalstorage:function(key){
        localStorage.removeItem(key);
    },
    //提示框
    tips:function(message,times){
        var tipsHtml = '<p class="tips"><span>'+message+'</span></p>';
        $("body").append(tipsHtml);
        setTimeout(function(){
            $(".tips").remove();
        },times);
    },
    //是否手机号码
    isMobile:function (str) {
        var patrn = /^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/;
        return patrn.test(str);
    },
    //分享到朋友圈
    share:function(){
        // wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: 'wx26cdac6b679b32e9', // 必填，公众号的唯一标识
        //     timestamp: '00', // 必填，生成签名的时间戳
        //     nonceStr: '${nonceStr!}', // 必填，生成签名的随机串
        //     signature: '${signature!}',// 必填，签名，见附录1
        //     jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });
        // wx.ready(function() {

        // }
        // wx.onMenuShareTimeline({
        //     title: '', // 分享标题
        //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: '', // 分享图标
        //     success: function () { 
        //         // 用户确认分享后执行的回调函数
        //     },
        //     cancel: function () { 
        //         // 用户取消分享后执行的回调函数
        //     }
        // });
    }
}
Common.init();