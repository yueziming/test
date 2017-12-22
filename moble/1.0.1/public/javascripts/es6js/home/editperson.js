webpackJsonp([17],{

/***/ 17:
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





// import dataUrls from '../httpConfig2.js';
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
            var sear = location.search;
            var num = sear.split('=')[1];
            var name = num.split(/\d/)[1];
            var hasname = location.hash;
            var hname = hasname.split('=')[1];
            var inpVal = decodeURI(hname);
            var id = localStorage.getItem('userID');
            var html = '<div class="goback" style="height:.5rem;line-height:.5rem;;width:100%;border-bottom:.01rem solid #E3E3E3;color:#424242;background:#fff;text-align:center;font-size:.18rem;position:fixed;top:0;left:0;z-index:8"><i style="display:inline-block;height:100%;width:.4rem;position:absolute;left:0;background:url(../../images/goback.png) no-repeat center;background-size:.2rem .2rem;"></i>{{name}}<a style="display:inline-block;height:100%;width:.4rem;position:absolute;right:0;text-decoration: none;font-size: .14rem;">{{submit}}</a></div>';
            var html2 = '';
            if (name == 'Name') html2 = html.replace('{{name}}', '修改姓名').replace('{{submit}}', '提交');
            if (name == 'QQ') html2 = html.replace('{{name}}', '修改QQ').replace('{{submit}}', '提交');
            if (name == 'Mobile') html2 = html.replace('{{name}}', '修改手机').replace('{{submit}}', '提交');
            if (name == 'Email') html2 = html.replace('{{name}}', '修改邮箱').replace('{{submit}}', '提交');
            if (name == 'IsMale') {
                var cli = function cli() {
                    $('.line2 i').on('click', function () {
                        $('.line2 i').removeClass('select');
                        $(this).addClass('select');
                    });
                };

                var content = '<div class="line2">\u7537<em class="niname"></em><i class="unselect"></i></div>\n            <div class="line2">\u5973<em class="niname"></em><i class="unselect"></i></div>\n            <div class="line2">\u4FDD\u5BC6<em class="niname"></em><i class="unselect"></i></div>';
                html2 = html.replace('{{name}}', '修改性别').replace('{{submit}}', '提交');
                $('.setting-content').html(content);
                cli();
                if (inpVal == '男') {
                    $('.line2').eq(0).children('i').click();
                } else if (inpVal == '女') {
                    $('.line2').eq(0).children('i').click();
                } else {
                    $('.line2').eq(0).children('i').click();
                }
            }
            $('.delVal').on('click', function () {
                $('input').val('');
            });
            $('.line2 input').val(inpVal);
            $('body').append(html2);
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });
            dataParam.url = '/api/Member/UpdateOneColumn';
            $('.goback a').on('click', function () {
                if ($('.line2').length != 1) {
                    var sex = $('i.select').parent().text();
                    var sexnum = '';
                    sex == '男' ? sexnum = 1 : sex == '女' ? sexnum = 0 : sexnum = null;
                    dataParam.list = {
                        condition: {
                            MemberID: id, //客户ID
                            ColumnName: 'Gender', //字段名称
                            ColumnValue: sexnum //字段值
                        }
                    };
                } else {
                    var subVal = $('.line2 input').val();
                    dataParam.list = {
                        condition: {
                            MemberID: id, //客户ID
                            ColumnName: name, //字段名称
                            ColumnValue: subVal //字段值
                        }
                    };
                }
                thin.reqajax(dataParam, function (res) {
                    if (res.ResultCode == 6666) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('修改成功');
                        location.href = '/personalinfo';
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
            console.log(dataUrls);
            $.ajax({
                url: dataUrls + '' + data.url,
                type: 'post',
                dataType: 'json',
                ContentType: "application/json",
                data: data.list,
                success: function success(res) {
                    callback && callback(res);
                }
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[17]);