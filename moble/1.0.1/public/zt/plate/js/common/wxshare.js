
var shareConfig={
    title:'豪牌限时抢∣五人成团钜惠来袭！最高直降11万！',  // 分享标题
    msg:'珠港澳两地车牌团购直降10万，支付99元定金可额外再抵1万元，邀请好友一起参团吧！',// 分享描述
    url:location.origin+'/zt/plate/index.html?referralCode='+localStorage.getItem("referralCode"),// 分享链接
    imgUrl:'http://tb-images.oss-cn-shenzhen.aliyuncs.com/upload-file/tb_20171208162407.jpg', // 分享图标
}

//分享到朋友圈
$.ajax({
    url: '/wxshaer',
    dataType: 'json',
    type: 'post',
    ContentType: "application/json",
    data: {
        url:location.href
    },
    success: function(data) {
        // alert(data);
        // console.log(123);
        // console.log(data);
        if(data && data.ResultCode && data.ResultCode == "0"){
            alert(data.Message);
        }else{
            wxInit(data);
        }
    },
});

function wxInit(wxData) {
    //图片
    var image = 'http://tb-images.oss-cn-shenzhen.aliyuncs.com/upload-file/tb_20171208162407.jpg';
    var wxData = JSON.parse(wxData);
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx66b6d0c67bbffb67", // 必填，公众号的唯一标识
        timestamp: wxData.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
        signature: wxData.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: shareConfig.title, // 分享标题
            desc: shareConfig.msg, // 分享描述
            link: shareConfig.url, // 分享链接
            imgUrl: shareConfig.imgUrl || image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
				wxsuccess();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
				if(typeof(wxData.cancel)=="function")wxcancel();
            }
        });

        wx.onMenuShareAppMessage({
            title: shareConfig.title, // 分享标题
            desc: shareConfig.msg, // 分享描述
            link: shareConfig.url, // 分享链接
            imgUrl: shareConfig.imgUrl || image, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
				wxsuccess();
            },
            cancel: function (error) {
				if(typeof(wxData.cancel)=="function")wxcancel();
                console.log(error);
                // 用户取消分享后执行的回调函数
            }
        });
		wx.onMenuShareQQ({
            title: shareConfig.title, // 分享标题
            desc: shareConfig.msg, // 分享描述
            link: shareConfig.url, // 分享链接
            imgUrl: shareConfig.imgUrl || image, // 分享图标
			success: function () { 
			   wxsuccess();
			},
			cancel: function () { 
			   // 用户取消分享后执行的回调函数
				if(typeof(wxData.cancel)=="function")wxcancel();
			}
		});
		wx.onMenuShareWeibo({
            title: shareConfig.title, // 分享标题
            desc: shareConfig.msg, // 分享描述
            link: shareConfig.url, // 分享链接
            imgUrl: shareConfig.imgUrl || image, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
			   wxsuccess();
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
				if(typeof(wxData.cancel)=="function")wxcancel();
			}
		});
		wx.onMenuShareQZone({
            title: shareConfig.title, // 分享标题
            desc: shareConfig.msg, // 分享描述
            link: shareConfig.url, // 分享链接
            imgUrl: shareConfig.imgUrl || image, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
			   wxsuccess();
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
				if(typeof(wxData.cancel)=="function")wxcancel();
			}
        });
        
    });
}
function wxsuccess(){// 用户确认分享
    
}
function wxcancel(){ // 用户取消分享

}