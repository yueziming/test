var wxdata = {};

$(function(){
    var wxalpay = {
        init:function(){
            Common.ajaxLoading();
            var _this = this;
            var locaCode = location.search && location.search.replace('&state=STATE', '').replace('?code=', '');
            localStorage.setItem('wxcode', locaCode);
            var wxcodes = localStorage.getItem('wxcode') || false;
            var times = localStorage.getItem('times') || false;
            if (typeof WeixinJSBridge == "undefined") {
                $('.header').hide();
                if (locaCode.length <= 0) {
                    localStorage.setItem('times', '');
                    localStorage.setItem('wxcode', '');
                    _this.astokenUrl();
                }
                _this.astokenOpid(wxcodes); // 获取oppenid
            }
    
            $('.topay-btn').on('click', function() {
                $('.topay-btn').off();
                    _this.wxpay(wxcodes); // 微信支付
            });
            setTimeout(function(){
                Common.ajaxLoadingStop();
            },500)
            // $('.pay-btn').on('click', function() {
            //     $('.pay-btn').off();
            //     _this.wxpay(wxcodes); // 微信支付
            // });
        },
        /**
         * code获取oppenid
         */
        astokenOpid:function(wxcodes) {
            $.ajax({
                url: '/astokenOpid',
                dataType: 'json',
                type: 'post',
                ContentType: "application/json",
                data: {
                    CODES: wxcodes
                },
                success: function(data) {
                    localStorage.setItem('times', new Date().getTime());
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('oppid', data.openid);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('scope', data.scope);
                    localStorage.setItem('expires_in', data.expires_in);
                },
            });
        },
        /**
         * 获取code
         * token_url
         */
        astokenUrl:function() {
            var localUrl = window.location.href;
            var codeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx66b6d0c67bbffb67&redirect_uri=' + encodeURIComponent(localUrl) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            location.href = codeUrl;
        },
        /**
         * 微信支付
         */
        wxpay:function(wxcodes) {
            var _this = this;
            // alert("aaa");
            $.ajax({
                url: '/wxpay',
                dataType: 'json',
                type: 'post',
                ContentType: "application/json",
                data: {
                    CODES: wxcodes,
                    token: localStorage.getItem('access_token'),
                    opid: localStorage.getItem('oppid'),
                    retoken: localStorage.getItem('refresh_token'),
                    scope: localStorage.getItem('scope'),
                    expin: localStorage.getItem('expires_in'),
                    bodyDetail: '抢车牌定金',
                    bodyTitle: '抢车牌定金',
                    Totla_fees: localStorage.getItem("PayAmount")
                },
                success: function(data) {
                    
                    wxdata.appId = data.appId;
                    wxdata.timeStamp = data.timeStamp;
                    wxdata.nonceStr = data.nonceStr;
                    wxdata.package = data.package;
                    wxdata.signType = data.signType;
                    wxdata.paySign = data.paySign;
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(data.orderNum), false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(data.orderNum));
                            document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(data.orderNum));
                        }
                    } else { _this.onBridgeReady(data.orderNum); }
                }
            });
        },
        /**
         * 调取原生支付
         */
        onBridgeReady:function(oderNumber) {
            var _this = this;
            console.log(wxdata);
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": wxdata.appId,
                    "timeStamp": wxdata.timeStamp,
                    "nonceStr": wxdata.nonceStr,
                    "package": wxdata.package,
                    "signType": wxdata.signType,
                    "paySign": wxdata.paySign
                },
                function(res) {
                    // alert(res.err_msg);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        Common.tips('支付成功',1000);

                        var orderNo = localStorage.getItem('orderno');
                        // var Totlafees = localStorage.getItem('Totlafees');
                        // 支付成功后回调
                        var param={
                            url:'/api/Topic/PayCallback',
                            data:{
                                OrderID: orderNo, //订单编码
                                TotalFee: localStorage.getItem("PayAmount"), //支付费用 total_fee参数
                                TransactionID: oderNumber, //交易号 transaction_id 参数
                                PaymentType: '微信', //支付方式：微信 支付宝 网上银行 其他  
                                BankType: '', //bank_type参数，可空
                                Phone:localStorage.getItem("mobilecp") || '',//手机号
                                FromPage:"两地车牌拼团活动",//活动来源
                                ServiceCode:''// 服务码（根据具体活动填写）
                            }
                        }
                        Common.ajax(param,function(data){
                            $('.topay-btn').on('click', function() {
                                $('.topay-btn').off();
                                // var thisSel = $(this).data('sel');
                                // if (thisSel == 0) {
                                    _this.wxpay(wxcodes); // 微信支付
                                // }
                            });
                            window.location.href = '/zt/plate2/paysuc.html';
                        });
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        Common.tips("支付已取消",1500);
                        // prompt.tipMsgBox('支付已取消');
                        setTimeout(function(){ window.location.href = '/activewxerror' }, 2000);
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        Common.tips("支付失败:网络错误,稍后重试",1500);
                        // prompt.tipMsgBox('支付失败:网络错误,稍后重试');
                        setTimeout(function(){ window.location.href = '/activewxerror' }, 2000);
                    }
                }
            );
        }
    }
    wxalpay.init();
})