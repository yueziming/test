import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import { reqAjax } from '../baseAjax';
import {API} from '../api';
import Common from '../commonAjax';

fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
const pageParam = {
    'PageIndex': 1,
    'PageSize': 10,
    'PageTotal': ''
}

class setting {
    constructor(){
        //获取手机号码
        let mobile = '';
        let baseAjax = {
            url:API.GETUSERINFO
        };
        let condition = {};
        Common.ajax(baseAjax,condition,function(res){
            mobile = res&&res.Data&&res.Data.ObjDetail&&res.Data.ObjDetail.Mobile || '';
            $("#codeNum").text(mobile);
            // console.log(mobile);
            $(".hidden").qrcode({
                width: 140,
                height: 140,
                text: location.origin+"/register?recommend="+mobile
            });
    
            //获取网页中的canvas对象
    
            var mycanvas1=document.getElementsByTagName('canvas')[0];
    
            //新Image对象，可以理解为DOM
            var image = new Image();
            // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
            // 指定格式 PNG
            image.src = mycanvas1.toDataURL("image/png");
    
            //将转换后的img标签插入到html中
    
            var img=image;
    
            $('.qrImg').html(img);//imagQrDiv表示你要插入的容器id
        })
    };

    init() {
        let thin = this;
        /**
         * go back
         */
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });
        /**
         * copy scope
         */
        $('a.copyShare').on('click', function() {
            var temporary = document.createElement('input');
            var content = document.getElementById('codeNum').innerText || document.getElementById('codeNum').innerHtml;
            temporary.setAttribute('value', content);
            document.body.appendChild(temporary);
            temporary.select();
            document.execCommand('Copy');
            document.body.removeChild(temporary);
            MsgInfo.tipMsgBox('复制成功');
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
        dataParam.url = API.GETMYSHARE;
        Common.ajax(dataParam,dataParam.condition,(res)=>{
            thin.setMsgDetils(res);
        })
        // reqAjax.sig(true, dataParam, (res) => {
        //     // console.log(res);
        //     thin.setMsgDetils(res);
        // });
    };
    setMsgDetils(res) {
        if (res && res.Data && res.Data.ObjDetail) {
            let thin = this;
            let phone = res.Data.ObjDetail.Mobile;
            let data = res.Data.ObjDetail.InvitationList;
            // $('#codeNum').text(phone);
            pageParam.PageTotal = res.Data.TotalCount;
            $('.total').text('共' + pageParam.PageTotal + '名');
            let html = `<div class="line">
                <span class="name">{{name}}</span>
                <span class="tel">{{tel}}</span>
                <span class="date">{{date}}</span>
            </div>`;
            let html2 = '';
            for (let i of data) {
                html2 += html.replace('{{name}}', i.Name).replace('{{tel}}', i.Mobile).replace('{{date}}', i.CreateTime);
            }
            $('.content').html(html2);
            if (pageParam.PageTotal > 10) {
                $('.content').append('<p><span class="seemore" style="cursor:pointer">加载更多</span></p>');
                $('.seemore').on('click', function() {
                    pageParam.PageSize += 10;
                    thin.init();
                })
            }
        }
    }
}
new setting().init();