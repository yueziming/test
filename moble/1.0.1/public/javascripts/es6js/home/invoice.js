webpackJsonp([13],{

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uploadfile__ = __webpack_require__(9);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
var picturedata = {};

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            var thin = this;
            $('.goback i').on('click', function () {
                window.history.back();
            });
            $('.line2').on('click', function () {
                var path = location.search;
                location.href = '/editinvoice' + path + '#flagnum=' + $(this).data('num');
            });
            var urk = location.search;
            var id = urk.split('=')[1];
            $('.invoice').text(localStorage.getItem('invoice') || '普通发票');
            $('.invoicecontent').text(localStorage.getItem('invoicecontent') || '咨询服务费');
            $('.company').text(localStorage.getItem('company') || '');
            $('.tax').text(localStorage.getItem('tax') || '');
            $('.address').text(localStorage.getItem('address') || '');
            $('.tel').text(localStorage.getItem('tel') || '');
            $('.account').text(localStorage.getItem('account') || '');
            $('.bank').text(localStorage.getItem('bank') || '');
            if (localStorage.getItem('invoice') && localStorage.getItem('invoice') == '专用发票') {
                $('section').show();
            } else {
                $('section').hide();
            }
            // $('.updataImg').on('click', function() {
            $('#file').on('change', function () {
                thin.uploadImg(this);
                // });
            });

            dataParam.url = '/api/My/CreateInvoice';
            $('.saveSubmit').on('click', function () {
                var invoice = $('.invoice').text() == '普通发票' ? 1 : 2;
                var invoicecontent = $('.invoicecontent').text() == '财务服务费' ? 1 : 2;
                var company = $('.company').text();
                var tax = $('.tax').text();
                var address = $('.address').text();
                var tel = $('.tel').text();
                var account = $('.account').text();
                var bank = $('.bank').text();
                // let certificateC = $('.certificateC').css('background-image');
                dataParam.list = {
                    condition: {
                        OrderID: id, //订单ID
                        InvoiceType: invoice, //发票类型 1增值税收普通发票  2专用发票    
                        CompanyName: company, //公司名称 
                        TaxNo: tax, //税号 
                        TaxContent: invoicecontent, //发票内容 1财务服务费  2咨询服务费 
                        Address: address, //地址
                        Tel: tel, //电话 
                        OpenAccountBank: account, //开户行
                        BankAccount: bank, //银行账号
                        CertificatePhoto: picturedata.picture //纳税人认定书
                    }
                };

                thin.reqajax(dataParam, function (res) {
                    if (res.ResultCode == 6666) {
                        localStorage.removeItem('invoice');
                        localStorage.removeItem('invoicecontent');
                        localStorage.removeItem('company');
                        localStorage.removeItem('tax');
                        localStorage.removeItem('address');
                        localStorage.removeItem('tel');
                        localStorage.removeItem('account');
                        localStorage.removeItem('bank');
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('保存成功');
                        setTimeout(function () {
                            location.href = '/orderdetails?id=' + id;
                        }, 2000);
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                    }
                });
            });
        }
    }, {
        key: 'reqajax',
        value: function reqajax(data, callback) {
            var times = new Date().getTime();
            var nonce = Math.random();
            var addData = {
                'signature': signature(times), // 签名 '',
                'memberID': localStorage.getItem('userID') || '', // 用户ID
                'timestamp': times, // 时间戳  
                'nonce': nonce // 随机数  
            };
            for (var key in addData) {
                data.list[key] = addData[key];
            }

            function signature(thisTimes) {
                var strins = thisTimes + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase();
                var arrayList = strins.split('');
                var sortList = arrayList.sort(function (a, b) {
                    return a.localeCompare(b);
                });
                var sortString = sortList.join('');
                var md5String = __WEBPACK_IMPORTED_MODULE_3_md5___default()(sortString).toUpperCase();
                return md5String;
            }
            $.ajax({
                url: dataUrls + data.url,
                type: 'post',
                dataType: 'json',
                ContentType: "application/json",
                data: data.list,
                success: function success(res) {
                    callback && callback(res);
                }
            });
        }
    }, {
        key: 'uploadImg',

        /**
         * 上传图片
         * @param {*DOME元素} eElem 
         */
        value: function uploadImg(eElem) {
            Object(__WEBPACK_IMPORTED_MODULE_4__uploadfile__["a" /* uploadfile */])(eElem, function (result) {
                var thisUrl = result.url || upSplitFile(result);
                $('.certificateC').css({ "background-image": " url(" + thisUrl + ")" });
                picturedata.picture = thisUrl;
            });
            /**
             * 上传重复时，切割图片寻找地址
             * @param { url } result 
             */
            function upSplitFile(result) {
                return result.res.requestUrls.join('').split('?')[0];
            }
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[21]);