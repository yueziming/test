webpackJsonp([5],{

/***/ 29:
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
var dataStack = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };

var registerLogin = function () {
    function registerLogin() {
        _classCallCheck(this, registerLogin);
    }

    _createClass(registerLogin, [{
        key: 'init',
        value: function init() {
            var isLogin = window.location.pathname;
            var shareCode = location.search.split("?recommend=")[1] || '';
            $("#tjcode").val(shareCode);
            if (shareCode != '') {
                $("#tjcode").attr("disabled", true);
            }
            var _this = this;
            if (isLogin == '/login') {
                // 登录
                _this.oninputColor(0);
                $('#phone,#pswd').bind('input propertychange', function () {
                    _this.oninputColor(0);
                });
            } else {
                // 忘记密码
                $('#forget').off('click').on('click', function () {
                    history.go(-1);
                });
            }
            var fRead = false;
            $('.read-hk').on('click', function () {
                fRead = !fRead;
                if (fRead) {
                    $('.reading').addClass('live');
                } else {
                    $('.reading').removeClass('live');
                }
            });
            var sss = new RegExp("(/register|/forgetpwd)");
            if (sss.test(isLogin)) {
                var caculTims = function caculTims() {
                    i = 60;
                    $('.clicksYZ').off('click');
                    var tell = $('#phone').val();
                    var flag = isLogin == '/register' ? false : true;
                    _this.reqVerify(flag, true, tell, function (res) {
                        if (res.ResultCode == 3800) {
                            __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                            _ckyz();
                        } else {
                            timesOut = setInterval(function () {
                                if (i > 0) {
                                    i--;
                                    $('.clicksYZ').html(i + 'S后获取');
                                } else {
                                    clearInterval(timesOut);
                                    $('.clicksYZ').html('获取验证码');
                                    _ckyz();
                                }
                            }, 1000);
                        }
                    });
                };

                var _ckyz = function _ckyz() {
                    $('.clicksYZ').off('click').on('click', function () {
                        var mobile = $('#phone').val();
                        if (mobile > 0 && /^1(3|4|5|7|8)\d{9}$/.test(mobile)) {
                            caculTims();
                        } else {
                            __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('请输入正确的手机号');
                        }
                    });
                };

                var i = 60,
                    timesOut = void 0;
                var that = this;

                ;

                _ckyz();

                if (/(\/forgetpwd)/.test(isLogin)) {
                    // 忘记密码
                    _this.oninputColor(1);
                    $('#phone,#yziptcode,#pswd').bind('input propertychange', function () {
                        _this.oninputColor(1);
                    });
                } else {
                    // 注册
                    $('#phone,#yziptcode,#pswd').bind('input properTychange', function () {
                        //注册颜色
                        if ($('#phone').val().length > 0 && $('#yziptcode').val().length > 0 && $('#pswd').val().length > 0) {

                            $('.btnClick span').attr('class', 'actives').off('click').on('click', function () {
                                var phone = $('#phone').val();
                                var yziptcode = $('#yziptcode').val();
                                var pswd = $('#pswd').val();
                                var tjcode = $('#tjcode').val();
                                var pack = { phone: phone, pswd: pswd, yziptcode: yziptcode, tjcode: tjcode };
                                if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('手机号不正确');
                                } else {
                                    if ($('.reading').hasClass('live')) {
                                        _this.registerIn(pack);
                                    } else {
                                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('请阅读并同意申明');
                                    }
                                };
                            });
                        } else {
                            $('.btnClick span').removeAttr('class', 'actives').off('click');
                        }
                    });
                }
            }
        }
    }, {
        key: 'reqVerify',


        /**
         * 请求验证码
         * @param(是忘记否注册||是否请求验证码||带参||回调)
         */
        value: function reqVerify(isForget, isVerify, tel, callback) {
            if (!isForget) {
                if (isVerify) {
                    //请求验证码
                    dataStack.url = '/api/h5/RequestMessage';
                    dataStack.list = {
                        signature: "", //签名（可为空）
                        userID: "", //用户ID （可为空）
                        timestamp: "", //时间戳, （可为空）
                        nonce: "", //随机数（可为空）
                        condition: {
                            Mobile: tel, //手机号 
                            MessageType: 1 //1注册
                        }
                    };
                } else {
                    //立即注册
                    dataStack.url = '/api/h5/Register';
                    dataStack.list = {
                        signature: "", //签名（可为空）
                        userID: "", //用户ID （可为空）
                        timestamp: "", //时间戳, （可为空）
                        nonce: "", //随机数（可为空）
                        condition: {
                            Mobile: tel.phone, //手机号  
                            Password: tel.pswd, //密码
                            CAPTCHA: tel.yziptcode, //验证码
                            FromMobile: tel.tjcode //推荐码
                        }
                    };
                }
                $.ajax({
                    url: dataUrls + dataStack.url,
                    type: dataStack.type,
                    dataType: dataStack.dataType,
                    ContentType: "application/json",
                    data: dataStack.list,
                    success: function success(res) {
                        callback && callback(res);
                    }
                });
            } else {
                if (isVerify) {
                    //请求验证码
                    dataStack.url = '/api/h5/RequestMessage';
                    dataStack.list = {
                        signature: "", //签名（可为空）
                        userID: "", //用户ID （可为空）
                        timestamp: "", //时间戳, （可为空）
                        nonce: "", //随机数（可为空）
                        condition: {
                            Mobile: tel, //手机号 
                            MessageType: 2 //2找回密码
                        }
                    };
                } else {
                    //重置密码
                    dataStack.url = '/api/h5/MobileResetPassword';
                    dataStack.list = {
                        signature: "", //签名（可为空）
                        userID: "", //用户ID （可为空）
                        timestamp: "", //时间戳, （可为空）
                        nonce: "", //随机数（可为空）
                        condition: {
                            Mobile: tel.phone, //手机号  
                            NewPassword: tel.pswd, //密码
                            CAPTCHA: tel.yziptcode //验证码
                        }
                    };
                }
                $.ajax({
                    url: dataUrls + dataStack.url,
                    type: dataStack.type,
                    dataType: dataStack.dataType,
                    ContentType: "application/json",
                    data: dataStack.list,
                    success: function success(res) {
                        callback && callback(res);
                    }
                });
            }
        }
    }, {
        key: 'oninputColor',


        /**
         * 登录||重置验证
         * 检测两个是否都输入
         */
        value: function oninputColor(mun) {
            var _this2 = this;

            var phone = $('#phone').val();
            var pswd = $('#pswd').val();
            if (phone.length > 0 && pswd.length > 0) {

                $('.btnClick span').attr('class', 'actives').off('click').on('click', function () {
                    if (mun == 0) {
                        _this2.loginIn(phone, pswd);
                    } else {
                        var yziptcode = $('#yziptcode').val();
                        var pack = { phone: phone, pswd: pswd, yziptcode: yziptcode };
                        _this2.resetenvo(pack);
                    }
                });
            } else {
                $('.btnClick span').removeAttr('class', 'actives').off('click').on('click', function () {
                    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('手机号不正确');
                    } else if (mun == 1 && $('#yziptcode').val().length <= 0) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('验证码不能为空');
                    } else if (pswd.length <= 0) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('密码不能为空');
                    }
                });
            }
        }
    }, {
        key: 'loginIn',


        /**
         * 登录接口判断
         * @param {*} phone descption 手机号
         * @param {*} pswd descption 密码
         */
        value: function loginIn(phone, pswd) {
            dataParam.url = '/h5login';
            dataParam.UserName = phone; //电话
            dataParam.Password = pswd; //密码
            __WEBPACK_IMPORTED_MODULE_3__baseAjax__["a" /* reqAjax */].sig(false, dataParam, function (res) {
                if (res.ResultCode == 6666) {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                    localStorage.setItem('userID', res.Data.ObjDetail.MemberID);
                    localStorage.setItem('token', res.Data.ObjDetail.Token);
                    var search = location.search;
                    var str = "?orderStatus=";
                    if (search.indexOf(str) != -1) {
                        setTimeout(function () {
                            window.location.href = '/fillInOrder' + search;
                        }, 2000);
                    } else if (search.indexOf('?my') != -1) {
                        setTimeout(function () {
                            window.location.href = '/myword' + search;
                        }, 2000);
                    } else {
                        setTimeout(function () {
                            window.location.href = '/';
                        }, 2000);
                    }
                } else {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                }
            }, 'logins');
        }
    }, {
        key: 'registerIn',


        /**
         *注册
         */
        value: function registerIn(info) {
            var thin = this;
            if ($('.reading').hasClass('live')) {
                thin.reqVerify(false, false, info, function (res) {
                    if (res.ResultCode == 6666) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('注册成功');
                        setTimeout(function () {
                            location.href = '/login';
                        }, 2000);
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                    }
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('请先同意申明');
            }
        }
    }, {
        key: 'resetenvo',

        /**
         * 重置
         */
        value: function resetenvo(info) {
            var thin = this;
            thin.reqVerify(true, false, info, function (res) {
                if (res.ResultCode == 6666) {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('重置成功');
                    setTimeout(function () {
                        location.href = '/login';
                    }, 2000);
                } else {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                }
            });
        }
    }]);

    return registerLogin;
}();

new registerLogin().init();

/***/ })

},[29]);