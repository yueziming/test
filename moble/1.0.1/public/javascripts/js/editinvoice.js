import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import MD5 from 'md5';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };

class setting {
    init() {
        let thin = this;
        $('.goback').remove();
        let path = location.search;
        let sear = location.hash;
        let num = sear.split('=')[1];
        let id = localStorage.getItem('userID');
        let html = `<div class="goback" style="height:.5rem;line-height:.5rem;;width:100%;border-bottom:.01rem solid #E3E3E3;color:#424242;background:#fff;text-align:center;font-size:.18rem;position:fixed;top:0;left:0;z-index:8"><i style="display:inline-block;height:100%;width:.4rem;position:absolute;left:0;background:url(../../images/goback.png) no-repeat center;background-size:.2rem .2rem;"></i>{{name}}<a style="display:inline-block;height:100%;width:.4rem;position:absolute;right:0;text-decoration: none;font-size: .14rem;">{{submit}}</a></div>`;
        let html2 = '';
        // if (num == '0') html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
        // if (num == '1') html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
        if (num == '2') html2 = html.replace('{{name}}', '修改公司名称').replace('{{submit}}', '提交');
        if (num == '3') html2 = html.replace('{{name}}', '修改税号').replace('{{submit}}', '提交');
        if (num == '4') html2 = html.replace('{{name}}', '修改地址').replace('{{submit}}', '提交');
        if (num == '5') html2 = html.replace('{{name}}', '修改电话').replace('{{submit}}', '提交');
        if (num == '6') html2 = html.replace('{{name}}', '修改开户行').replace('{{submit}}', '提交');
        if (num == '7') html2 = html.replace('{{name}}', '修改银行账号').replace('{{submit}}', '提交');
        let content = `<div class="line2">{{invoice}}<em class="niname"></em><i class="unselect"></i></div>
            <div class="line2">{{invoice1}}<em class="niname"></em><i class="unselect"></i></div>`;
        if (num == '0') {
            let content1 = content.replace('{{invoice}}', '专用发票').replace('{{invoice1}}', '普通发票')
            html2 = html.replace('{{name}}', '修改发票类型').replace('{{submit}}', '提交');
            $('.setting-content').html(content1);
            cli();

        };
        if (num == '1') {
            let content1 = content.replace('{{invoice}}', '咨询服务费').replace('{{invoice1}}', '财务服务费')
            html2 = html.replace('{{name}}', '修改发票内容').replace('{{submit}}', '提交');
            $('.setting-content').html(content1);
            cli();
        }

        function cli() {
            $('.line2 i').on('click', function() {
                $('.line2 i').removeClass('select');
                $(this).addClass('select');
            });
        }
        $('body').append(html2);
        $('.goback i').on('click', function() {
            window.history.back();
        });
        $('.delVal').on('click', function() {
            $('input').val('');
        });
        $('.goback a').on('click', function() {
            if ($('.line2').length != 1) {
                if ($('.line2 i').hasClass('select')) {
                    num == '0' ? localStorage.setItem('invoice', $('i.select').parent().text()) : localStorage.setItem('invoicecontent', $('i.select').parent().text());
                    location.href = '/invoice' + path;
                } else {
                    MsgInfo.tipMsgBox('请先选择');
                }
            } else {
                let subVal = $('.line2 input').val();
                if (subVal.length > 0) {
                    num == '2' ? localStorage.setItem('company', subVal) : num == '3' ? localStorage.setItem('tax', subVal) : num == '4' ? localStorage.setItem('address', subVal) : num == '5' ? localStorage.setItem('tel', subVal) : num == '6' ? localStorage.setItem('account', subVal) : localStorage.setItem('bank', subVal);
                    location.href = '/invoice' + path;
                } else {
                    MsgInfo.tipMsgBox('请先填内容');
                }
            }

        });
    };
}
new setting().init();