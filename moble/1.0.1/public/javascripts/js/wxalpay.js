import fastclick from '../fastclick';
import '../fontSize';
import prompt from '../msgBox';
fastclick.attach(document.body);
var wxdata = {};

class wxalpay {
    init() {
        let _this = this;
        let locaCode = location.search && location.search.replace('&state=STATE', '').replace('?code=', '');
        localStorage.setItem('wxcode', locaCode);
        let wxcodes = localStorage.getItem('wxcode') || false;
        let times = localStorage.getItem('times') || false;
        if (typeof WeixinJSBridge == "undefined") {
            $('.header').hide();
            if (locaCode.length <= 0) {
                localStorage.setItem('times', '');
                localStorage.setItem('wxcode', '');
                _this.astokenUrl();
            }
            _this.astokenOpid(wxcodes); // 获取oppenid
        }

        $('.pay div').on('click', function() {
            $('.pay div').off();
            let thisSel = $(this).data('sel');
            if (thisSel == 0) {
                _this.wxpay(wxcodes); // 微信支付
            }
        });
    };

    /**
     * code获取oppenid
     */
    astokenOpid(wxcodes) {
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
    };

    /**
     * 获取code
     * token_url
     */
    astokenUrl() {
        let localUrl = window.location.href;
        let codeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx66b6d0c67bbffb67&redirect_uri=' + encodeURIComponent(localUrl) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        location.href = codeUrl;
    };

    /**
     * 微信支付
     */
    wxpay(wxcodes) {
        let _this = this;
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
                bodyDetail: localStorage.getItem('bodyDetail'),
                bodyTitle: localStorage.getItem('bodyTitle'),
                Totla_fees: localStorage.getItem('Totlafees')
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
            },
        });
    };

    /**
     * 调取原生支付
     */
    onBridgeReady(oderNumber) {
        let _this = this;
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
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    prompt.tipMsgBox('支付成功');
                    let orderNo = localStorage.getItem('orderNo');
                    let Totlafees = localStorage.getItem('Totlafees');
                    // 支付成功后回调
                    $.ajax({
                        url: '/payCallback',
                        dataType: 'json',
                        type: 'post',
                        ContentType: "application/json",
                        data: {
                            OrderNO: orderNo, //订单编码
                            TotalFee: Totlafees, //支付费用 total_fee参数
                            TransactionID: oderNumber, //交易号 transaction_id 参数
                            PaymentType: '微信', //支付方式：微信 支付宝 网上银行 其他  
                            BankType: '' //bank_type参数，可空
                        },
                        success: function(data) {
                            localStorage.setItem('oderNumber', oderNumber);
                            $('.pay div').on('click', function() {
                                $('.pay div').off();
                                let thisSel = $(this).data('sel');
                                if (thisSel == 0) {
                                    _this.wxpay(wxcodes); // 微信支付
                                }
                            });
                            window.location.href = '/wxsuccess';
                        },
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    prompt.tipMsgBox('支付已取消');
                    setTimeout(() => { window.location.href = '/wxerror' }, 2000);
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    prompt.tipMsgBox('支付失败:网络错误,稍后重试');
                    setTimeout(() => { window.location.href = '/wxerror' }, 2000);
                }
            }
        );
    };

}
new wxalpay().init();