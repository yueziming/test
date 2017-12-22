function wxShareInit(shareConfig, callBack, errorCallBack) {
    wx.config({
        debug: false,
        appId: 'wx26cdac6b679b32e9',
        timestamp: '00',
        nonceStr: '${nonceStr!}',
        signature: '${signature!}',
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ]
    });

    var shareConfig = {
        shareTitle: "腾博智慧云商",
        shareDesc: "「腾博智慧云商」,一站式高端商业服务平台，提供注册公司、代理记账、资质办理、公司买卖、金融牌照等系列高端商业服务。全国统一热线：4006-788-989。",
        shareLink: '//m.itenbo.com',
        shareImgUrl: "//m.itenbo.com/images/shareImg.jpg",
        shareGid: ""
    };

    var image = '';
    wx.ready(function() {
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: shareConfig.shareTitle, // 分享标题
            desc: shareConfig.shareDesc, // 分享描述
            link: shareConfig.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareConfig.shareImgUrl || image, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                callBack && callBack();
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                errorCallBack && errorCallBack();
            }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareConfig.shareTitle,
            desc: shareConfig.shareDesc,
            link: shareConfig.shareLink,
            imgUrl: shareConfig.shareImgUrl || image,
            success: function() {
                // 用户确认分享后执行的回调函数
                callBack && callBack();
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                errorCallBack && errorCallBack();
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: shareConfig.shareTitle,
            desc: shareConfig.shareDesc,
            link: shareConfig.shareLink,
            imgUrl: shareConfig.shareImgUrl || image,
            success: function() {
                // 用户确认分享后执行的回调函数
                callBack && callBack();
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                errorCallBack && errorCallBack();
            }
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: shareConfig.shareTitle,
            desc: shareConfig.shareDesc,
            link: shareConfig.shareLink,
            imgUrl: shareConfig.shareImgUrl || image,
            success: function() {
                // 用户确认分享后执行的回调函数
                callBack && callBack();
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                errorCallBack && errorCallBack();
            }
        });
        //分享到QZone
        wx.onMenuShareQZone({
            title: shareConfig.shareTitle,
            desc: shareConfig.shareDesc,
            link: shareConfig.shareLink,
            imgUrl: shareConfig.shareImgUrl || image,
            success: function() {
                // 用户确认分享后执行的回调函数
                callBack && callBack();
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                errorCallBack && errorCallBack();
            }
        });
    });
}