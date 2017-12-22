import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import { reqAjax } from '../baseAjax';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
class setting {
    init() {
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });
        $('.submit').on('click', function() {

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
                        reqAjax.sig(true, dataParam, (res) => {
                            if (res.ResultCode == 6666) {
                                MsgInfo.tipMsgBox('修改成功');
                                setTimeout(function() {
                                    location.href = '/login';
                                }, 2000)
                            } else {
                                MsgInfo.tipMsgBox(res.Message);
                            }
                        });
                    } else {
                        MsgInfo.tipMsgBox('新密码与确认密码不不一致');
                    }
                } else {
                    MsgInfo.tipMsgBox('新密码不能为纯数字,长度为6-20位');
                }
            } else {
                MsgInfo.tipMsgBox('原密码不能为空');
            }
        })
    }
}
new setting().init();