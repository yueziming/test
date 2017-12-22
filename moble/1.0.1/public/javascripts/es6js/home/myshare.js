webpackJsonp([9],{

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__baseAjax__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commonAjax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commonAjax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__commonAjax__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
var pageParam = {
    'PageIndex': 1,
    'PageSize': 10,
    'PageTotal': ''
};

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);

        //获取手机号码
        var mobile = '';
        var baseAjax = {
            url: __WEBPACK_IMPORTED_MODULE_4__api__["a" /* API */].GETUSERINFO
        };
        var condition = {};
        __WEBPACK_IMPORTED_MODULE_5__commonAjax___default.a.ajax(baseAjax, condition, function (res) {
            mobile = res && res.Data && res.Data.ObjDetail && res.Data.ObjDetail.Mobile || '';
            $("#codeNum").text(mobile);
            // console.log(mobile);
            $(".hidden").qrcode({
                width: 140,
                height: 140,
                text: location.origin + "/register?recommend=" + mobile
            });

            //获取网页中的canvas对象

            var mycanvas1 = document.getElementsByTagName('canvas')[0];

            //新Image对象，可以理解为DOM
            var image = new Image();
            // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
            // 指定格式 PNG
            image.src = mycanvas1.toDataURL("image/png");

            //将转换后的img标签插入到html中

            var img = image;

            $('.qrImg').html(img); //imagQrDiv表示你要插入的容器id
        });
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            var thin = this;
            /**
             * go back
             */
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });
            /**
             * copy scope
             */
            $('a.copyShare').on('click', function () {
                var temporary = document.createElement('input');
                var content = document.getElementById('codeNum').innerText || document.getElementById('codeNum').innerHtml;
                temporary.setAttribute('value', content);
                document.body.appendChild(temporary);
                temporary.select();
                document.execCommand('Copy');
                document.body.removeChild(temporary);
                __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('复制成功');
            });
            /**
             * request sever
             */
            dataParam.id = localStorage.getItem('userID');
            dataParam.token = localStorage.getItem('token');
            dataParam.condition = {};

            dataParam.condition.MemberID = localStorage.getItem('userID'); //客户ID
            dataParam.condition.PageIndex = pageParam.PageIndex; //当前页（分页）
            dataParam.condition.PageSize = pageParam.PageSize; //每页条数（分页）
            dataParam.url = __WEBPACK_IMPORTED_MODULE_4__api__["a" /* API */].GETMYSHARE;
            __WEBPACK_IMPORTED_MODULE_5__commonAjax___default.a.ajax(dataParam, dataParam.condition, function (res) {
                thin.setMsgDetils(res);
            });
            // reqAjax.sig(true, dataParam, (res) => {
            //     // console.log(res);
            //     thin.setMsgDetils(res);
            // });
        }
    }, {
        key: 'setMsgDetils',
        value: function setMsgDetils(res) {
            if (res && res.Data && res.Data.ObjDetail) {
                var thin = this;
                var phone = res.Data.ObjDetail.Mobile;
                var data = res.Data.ObjDetail.InvitationList;
                // $('#codeNum').text(phone);
                pageParam.PageTotal = res.Data.TotalCount;
                $('.total').text('共' + pageParam.PageTotal + '名');
                var html = '<div class="line">\n                <span class="name">{{name}}</span>\n                <span class="tel">{{tel}}</span>\n                <span class="date">{{date}}</span>\n            </div>';
                var html2 = '';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        html2 += html.replace('{{name}}', i.Name).replace('{{tel}}', i.Mobile).replace('{{date}}', i.CreateTime);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                $('.content').html(html2);
                if (pageParam.PageTotal > 10) {
                    $('.content').append('<p><span class="seemore" style="cursor:pointer">加载更多</span></p>');
                    $('.seemore').on('click', function () {
                        pageParam.PageSize += 10;
                        thin.init();
                    });
                }
            }
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[25]);