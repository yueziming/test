webpackJsonp([4],{

/***/ 30:
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
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });
            $('.submit').on('click', function () {

                var password = $('.password').val(),
                    newpassword = $('.newpassword').val(),
                    newpassword1 = $('.newpassword1').val();
                dataParam.id = localStorage.getItem('userID');
                dataParam.token = localStorage.getItem('token');
                // var regex = /^+{6-20}/;
                var regex = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/;
                if (password.length > 0 && password != '') {
                    if (regex.test(newpassword)) {
                        if (newpassword == newpassword1) {
                            dataParam.url = '/UpdatePassword1';
                            dataParam.PasswordOld = password; //原密码
                            dataParam.PasswordNew = newpassword; //新密码
                            __WEBPACK_IMPORTED_MODULE_3__baseAjax__["a" /* reqAjax */].sig(true, dataParam, function (res) {
                                if (res.ResultCode == 6666) {
                                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('修改成功');
                                    setTimeout(function () {
                                        location.href = '/login';
                                    }, 2000);
                                } else {
                                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                                }
                            });
                        } else {
                            __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('新密码与确认密码不不一致');
                        }
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('新密码不能为纯数字,长度为6-20位');
                    }
                } else {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('原密码不能为空');
                }
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[30]);