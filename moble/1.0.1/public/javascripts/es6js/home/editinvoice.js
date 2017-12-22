webpackJsonp([18],{

/***/ 16:
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
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            var thin = this;
            $('.goback').remove();
            var path = location.search;
            var sear = location.hash;
            var num = sear.split('=')[1];
            var id = localStorage.getItem('userID');
            var html = '<div class="goback" style="height:.5rem;line-height:.5rem;;width:100%;border-bottom:.01rem solid #E3E3E3;color:#424242;background:#fff;text-align:center;font-size:.18rem;position:fixed;top:0;left:0;z-index:8"><i style="display:inline-block;height:100%;width:.4rem;position:absolute;left:0;background:url(../../images/goback.png) no-repeat center;background-size:.2rem .2rem;"></i>{{name}}<a style="display:inline-block;height:100%;width:.4rem;position:absolute;right:0;text-decoration: none;font-size: .14rem;">{{submit}}</a></div>';
            var html2 = '';
            // if (num == '0') html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
            // if (num == '1') html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
            if (num == '2') html2 = html.replace('{{name}}', '修改公司名称').replace('{{submit}}', '提交');
            if (num == '3') html2 = html.replace('{{name}}', '修改税号').replace('{{submit}}', '提交');
            if (num == '4') html2 = html.replace('{{name}}', '修改地址').replace('{{submit}}', '提交');
            if (num == '5') html2 = html.replace('{{name}}', '修改电话').replace('{{submit}}', '提交');
            if (num == '6') html2 = html.replace('{{name}}', '修改开户行').replace('{{submit}}', '提交');
            if (num == '7') html2 = html.replace('{{name}}', '修改银行账号').replace('{{submit}}', '提交');
            var content = '<div class="line2">{{invoice}}<em class="niname"></em><i class="unselect"></i></div>\n            <div class="line2">{{invoice1}}<em class="niname"></em><i class="unselect"></i></div>';
            if (num == '0') {
                var content1 = content.replace('{{invoice}}', '专用发票').replace('{{invoice1}}', '普通发票');
                html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
                $('.setting-content').html(content1);
                cli();
            };
            if (num == '1') {
                var _content = content.replace('{{invoice}}', '咨询服务费').replace('{{invoice1}}', '财务服务费');
                html2 = html.replace('{{name}}', '修改发票内容').replace('{{submit}}', '提交');
                $('.setting-content').html(_content);
                cli();
            }

            function cli() {
                $('.line2 i').on('click', function () {
                    $('.line2 i').removeClass('select');
                    $(this).addClass('select');
                });
            }
            $('body').append(html2);
            $('.goback i').on('click', function () {
                window.history.back();
            });
            $('.delVal').on('click', function () {
                $('input').val('');
            });
            $('.goback a').on('click', function () {
                if ($('.line2').length != 1) {
                    if ($('.line2 i').hasClass('select')) {
                        num == '0' ? localStorage.setItem('invoice', $('i.select').parent().text()) : localStorage.setItem('invoicecontent', $('i.select').parent().text());
                        location.href = '/invoice' + path;
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('请先选择');
                    }
                } else {
                    var subVal = $('.line2 input').val();
                    if (subVal.length > 0) {
                        num == '2' ? localStorage.setItem('company', subVal) : num == '3' ? localStorage.setItem('tax', subVal) : num == '4' ? localStorage.setItem('address', subVal) : num == '5' ? localStorage.setItem('tel', subVal) : num == '6' ? localStorage.setItem('account', subVal) : localStorage.setItem('bank', subVal);
                        location.href = '/invoice' + path;
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('请先填内容');
                    }
                }
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[16]);