webpackJsonp([0],{

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var wxdata = {};

var wxalpay = function () {
    function wxalpay() {
        _classCallCheck(this, wxalpay);
    }

    _createClass(wxalpay, [{
        key: 'init',
        value: function init() {
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

            $('.pay div').on('click', function () {
                $('.pay div').off();
                var thisSel = $(this).data('sel');
                if (thisSel == 0) {
                    _this.wxpay(wxcodes); // 微信支付
                }
            });
        }
    }, {
        key: 'astokenOpid',


        /**
         * code获取oppenid
         */
        value: function astokenOpid(wxcodes) {
            $.ajax({
                url: '/astokenOpid',
                dataType: 'json',
                type: 'post',
                ContentType: "application/json",
                data: {
                    CODES: wxcodes
                },
                success: function success(data) {
                    localStorage.setItem('times', new Date().getTime());
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('oppid', data.openid);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('scope', data.scope);
                    localStorage.setItem('expires_in', data.expires_in);
                }
            });
        }
    }, {
        key: 'astokenUrl',


        /**
         * 获取code
         * token_url
         */
        value: function astokenUrl() {
            var localUrl = window.location.href;
            var codeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx66b6d0c67bbffb67&redirect_uri=' + encodeURIComponent(localUrl) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            location.href = codeUrl;
        }
    }, {
        key: 'wxpay',


        /**
         * 微信支付
         */
        value: function wxpay(wxcodes) {
            var _this = this;
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
                success: function success(data) {
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
                    } else {
                        _this.onBridgeReady(data.orderNum);
                    }
                }
            });
        }
    }, {
        key: 'onBridgeReady',


        /**
         * 调取原生支付
         */
        value: function onBridgeReady(oderNumber) {
            var _this = this;
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId": wxdata.appId,
                "timeStamp": wxdata.timeStamp,
                "nonceStr": wxdata.nonceStr,
                "package": wxdata.package,
                "signType": wxdata.signType,
                "paySign": wxdata.paySign
            }, function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('支付成功');
                    var orderNo = localStorage.getItem('orderNo');
                    var Totlafees = localStorage.getItem('Totlafees');
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
                        success: function success(data) {
                            localStorage.setItem('oderNumber', oderNumber);
                            $('.pay div').on('click', function () {
                                $('.pay div').off();
                                var thisSel = $(this).data('sel');
                                if (thisSel == 0) {
                                    _this.wxpay(wxcodes); // 微信支付
                                }
                            });
                            window.location.href = '/wxsuccess';
                        }
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('支付已取消');
                    setTimeout(function () {
                        window.location.href = '/wxerror';
                    }, 2000);
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('支付失败:网络错误,稍后重试');
                    setTimeout(function () {
                        window.location.href = '/wxerror';
                    }, 2000);
                }
            });
        }
    }]);

    return wxalpay;
}();

new wxalpay().init();

/***/ })

},[34]);