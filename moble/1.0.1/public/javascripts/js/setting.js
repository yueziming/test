import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import MD5 from 'md5';
import { reqAjax } from '../baseAjax';
fastclick.attach(document.body);

class setting {
    init() {
        $('.goback i').on('click', function() {
            window.history.go(-1);
        })
        $('.exit').on('click', function() {
            let data = { url: '/loginOut' };
            reqAjax.sig(true, data, (res) => {
                localStorage.clear();
                MsgInfo.tipMsgBox('退出成功');
                setTimeout(function() { location.href = '/'; }, 2000)
            });
            // $.ajax({
            //     url: dataUrls + '/api/My/Logout',
            //     type: 'post',
            //     dataType: 'json',
            //     ContentType: "application/json",
            //     data: addData,
            //     success: function(res) {
            //         localStorage.clear();
            //         MsgInfo.tipMsgBox('退出成功');
            //         window.close();
            //         setTimeout(function() {
            //             location.href = '/';
            //         }, 2000)
            //     },
            //     error: function(e) {
            //         MsgInfo.tipMsgBox(e.Message);
            //     }
            // });
        })
    }
}
new setting().init();