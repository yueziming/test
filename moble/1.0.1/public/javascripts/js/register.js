import fastclick from '../fastclick';
import '../fontSize';
import prompt from '../msgBox';
import { reqAjax } from '../baseAjax';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
const dataStack = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} }
class registerLogin {
    init() {
        let isLogin = window.location.pathname;
        let shareCode = location.search.split("?recommend=")[1] || '';
        $("#tjcode").val(shareCode);
        if (shareCode != '') {
            $("#tjcode").attr("disabled", true);
        }
        let _this = this;
        if (isLogin == '/login') { // 登录
            _this.oninputColor(0);
            $('#phone,#pswd').bind('input propertychange', function() {
                _this.oninputColor(0);
            });
        } else { // 忘记密码
            $('#forget').off('click').on('click', () => {
                history.go(-1);
            });
        }
        let fRead = false;
        $('.read-hk').on('click', function() {
            fRead = !fRead;
            if (fRead) {
                $('.reading').addClass('live');
            } else {
                $('.reading').removeClass('live');
            }
        });
        let sss = new RegExp("(/register|/forgetpwd)");
        if (sss.test(isLogin)) {
            let i = 60,
                timesOut;
            let that = this;

            function caculTims() {
                i = 60;
                $('.clicksYZ').off('click');
                let tell = $('#phone').val();
                let flag = isLogin == '/register' ? false : true;
                _this.reqVerify(flag, true, tell, (res) => {
                    if (res.ResultCode == 3800) {
                        prompt.tipMsgBox(res.Message);
                        ckyz();
                    } else {
                        timesOut = setInterval(() => {
                            if (i > 0) {
                                i--;
                                $('.clicksYZ').html(i + 'S后获取');
                            } else {
                                clearInterval(timesOut);
                                $('.clicksYZ').html('获取验证码');
                                ckyz();
                            }
                        }, 1000);
                    }
                });
            };

            function ckyz() {
                $('.clicksYZ').off('click').on('click', () => {
                    let mobile = $('#phone').val();
                    if (mobile > 0 && /^1(3|4|5|7|8)\d{9}$/.test(mobile)) {
                        caculTims();
                    } else {
                        prompt.tipMsgBox('请输入正确的手机号');
                    }
                });
            }
            ckyz();

            if (/(\/forgetpwd)/.test(isLogin)) { // 忘记密码
                _this.oninputColor(1);
                $('#phone,#yziptcode,#pswd').bind('input propertychange', function() {
                    _this.oninputColor(1);
                });
            } else { // 注册
                $('#phone,#yziptcode,#pswd').bind('input properTychange', function() { //注册颜色
                    if ($('#phone').val().length > 0 && $('#yziptcode').val().length > 0 && $('#pswd').val().length > 0) {

                        $('.btnClick span').attr('class', 'actives').off('click').on('click', () => {
                            let phone = $('#phone').val();
                            let yziptcode = $('#yziptcode').val();
                            let pswd = $('#pswd').val();
                            let tjcode = $('#tjcode').val();
                            let pack = { phone, pswd, yziptcode, tjcode }
                            if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                                prompt.tipMsgBox('手机号不正确');
                            } else {
                                if ($('.reading').hasClass('live')) {
                                    _this.registerIn(pack);
                                } else {
                                    prompt.tipMsgBox('请阅读并同意申明');
                                }

                            };
                        });


                    } else {
                        $('.btnClick span').removeAttr('class', 'actives').off('click');
                    }
                })
            }
        }
    };

    /**
     * 请求验证码
     * @param(是忘记否注册||是否请求验证码||带参||回调)
     */
    reqVerify(isForget, isVerify, tel, callback) {
        if (!isForget) {
            if (isVerify) { //请求验证码
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
                }
            } else { //立即注册
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
                }
            }
            $.ajax({
                url: dataUrls + dataStack.url,
                type: dataStack.type,
                dataType: dataStack.dataType,
                ContentType: "application/json",
                data: dataStack.list,
                success: function(res) {
                    callback && callback(res);
                }
            });
        } else {
            if (isVerify) { //请求验证码
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
                }
            } else { //重置密码
                dataStack.url = '/api/h5/MobileResetPassword';
                dataStack.list = {
                    signature: "", //签名（可为空）
                    userID: "", //用户ID （可为空）
                    timestamp: "", //时间戳, （可为空）
                    nonce: "", //随机数（可为空）
                    condition: {
                        Mobile: tel.phone, //手机号  
                        NewPassword: tel.pswd, //密码
                        CAPTCHA: tel.yziptcode, //验证码
                    }
                }
            }
            $.ajax({
                url: dataUrls + dataStack.url,
                type: dataStack.type,
                dataType: dataStack.dataType,
                ContentType: "application/json",
                data: dataStack.list,
                success: function(res) {
                    callback && callback(res);
                }
            });
        }
    };

    /**
     * 登录||重置验证
     * 检测两个是否都输入
     */
    oninputColor(mun) {
        let phone = $('#phone').val();
        let pswd = $('#pswd').val();
        if (phone.length > 0 && pswd.length > 0) {

            $('.btnClick span').attr('class', 'actives').off('click').on('click', () => {
                if (mun == 0) {
                    this.loginIn(phone, pswd);
                } else {
                    let yziptcode = $('#yziptcode').val();
                    let pack = { phone, pswd, yziptcode };
                    this.resetenvo(pack);
                }
            });


        } else {
            $('.btnClick span').removeAttr('class', 'actives').off('click').on('click', () => {
                if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                    prompt.tipMsgBox('手机号不正确');
                } else if (mun == 1 && ($('#yziptcode').val().length <= 0)) {
                    prompt.tipMsgBox('验证码不能为空');
                } else if (pswd.length <= 0) {
                    prompt.tipMsgBox('密码不能为空');
                }
            });
        }
    };

    /**
     * 登录接口判断
     * @param {*} phone descption 手机号
     * @param {*} pswd descption 密码
     */
    loginIn(phone, pswd) {
        dataParam.url = '/h5login';
        dataParam.UserName = phone; //电话
        dataParam.Password = pswd; //密码
        reqAjax.sig(false, dataParam, (res) => {
            if (res.ResultCode == 6666) {
                prompt.tipMsgBox(res.Message);
                localStorage.setItem('userID', res.Data.ObjDetail.MemberID);
                localStorage.setItem('token', res.Data.ObjDetail.Token);
                let search = location.search;
                let str = "?orderStatus=";
                if (search.indexOf(str) != -1) {
                    setTimeout(function() { window.location.href = '/fillInOrder' + search; }, 2000)
                } else if (search.indexOf('?my') != -1) {
                    setTimeout(function() { window.location.href = '/myword' + search; }, 2000)
                } else {
                    setTimeout(function() { window.location.href = '/'; }, 2000)
                }
            } else {
                prompt.tipMsgBox(res.Message);
            }
        }, 'logins');
    };

    /**
     *注册
     */
    registerIn(info) {
        let thin = this;
        if ($('.reading').hasClass('live')) {
            thin.reqVerify(false, false, info, (res) => {
                if (res.ResultCode == 6666) {
                    prompt.tipMsgBox('注册成功');
                    setTimeout(function() {
                        location.href = '/login';
                    }, 2000)
                } else {
                    prompt.tipMsgBox(res.Message);
                }

            })
        } else {
            prompt.tipMsgBox('请先同意申明');
        }

    };
    /**
     * 重置
     */
    resetenvo(info) {
        let thin = this;
        thin.reqVerify(true, false, info, (res) => {
            if (res.ResultCode == 6666) {
                prompt.tipMsgBox('重置成功');
                setTimeout(function() {
                    location.href = '/login';
                }, 2000)
            } else {
                prompt.tipMsgBox(res.Message);
            }
        })
    };
}
new registerLogin().init();