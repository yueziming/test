import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import MD5 from 'md5';
// import dataUrls from '../httpConfig2.js';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };

class setting {
    init() {
        let thin = this;
        $('.goback').remove();
        let sear = location.search;
        let num = sear.split('=')[1];
        let name = num.split(/\d/)[1];
        let hasname = location.hash;
        let hname = hasname.split('=')[1];
        let inpVal = decodeURI(hname);
        let id = localStorage.getItem('userID');
        let html = `<div class="goback" style="height:.5rem;line-height:.5rem;;width:100%;border-bottom:.01rem solid #E3E3E3;color:#424242;background:#fff;text-align:center;font-size:.18rem;position:fixed;top:0;left:0;z-index:8"><i style="display:inline-block;height:100%;width:.4rem;position:absolute;left:0;background:url(../../images/goback.png) no-repeat center;background-size:.2rem .2rem;"></i>{{name}}<a style="display:inline-block;height:100%;width:.4rem;position:absolute;right:0;text-decoration: none;font-size: .14rem;">{{submit}}</a></div>`;
        let html2 = '';
        if (name == 'Name') html2 = html.replace('{{name}}', '修改姓名').replace('{{submit}}', '提交');
        if (name == 'QQ') html2 = html.replace('{{name}}', '修改QQ').replace('{{submit}}', '提交');
        if (name == 'Mobile') html2 = html.replace('{{name}}', '修改手机').replace('{{submit}}', '提交');
        if (name == 'Email') html2 = html.replace('{{name}}', '修改邮箱').replace('{{submit}}', '提交');
        if (name == 'IsMale') {
            let content = `<div class="line2">男<em class="niname"></em><i class="unselect"></i></div>
            <div class="line2">女<em class="niname"></em><i class="unselect"></i></div>
            <div class="line2">保密<em class="niname"></em><i class="unselect"></i></div>`
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

            function cli() {
                $('.line2 i').on('click', function() {
                    $('.line2 i').removeClass('select');
                    $(this).addClass('select');
                });
            }
        }
        $('.delVal').on('click', function() {
            $('input').val('');
        });
        $('.line2 input').val(inpVal);
        $('body').append(html2);
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });
        dataParam.url = '/api/Member/UpdateOneColumn';
        $('.goback a').on('click', function() {
            if ($('.line2').length != 1) {
                let sex = $('i.select').parent().text();
                let sexnum = '';
                sex == '男' ? sexnum = 1 : sex == '女' ? sexnum = 0 : sexnum = null;
                dataParam.list = {
                    condition: {
                        MemberID: id, //客户ID
                        ColumnName: 'Gender', //字段名称
                        ColumnValue: sexnum //字段值
                    }
                };
            } else {
                let subVal = $('.line2 input').val();
                dataParam.list = {
                    condition: {
                        MemberID: id, //客户ID
                        ColumnName: name, //字段名称
                        ColumnValue: subVal //字段值
                    }
                };
            }
            thin.reqajax(dataParam, (res) => {
                if (res.ResultCode == 6666) {
                    MsgInfo.tipMsgBox('修改成功');
                    location.href = '/personalinfo';
                } else {
                    MsgInfo.tipMsgBox(res.Message);
                }
            })
        });

    };
    reqajax(data, callback) {
        var times = new Date().getTime()
        var nonce = Math.random()
        var addData = {
            'signature': signature(times), // 签名 '',
            'memberID': localStorage.getItem('userID') || '', // 用户ID
            'timestamp': times, // 时间戳  
            'nonce': nonce // 随机数  
        }
        for (var key in addData) {
            data.list[key] = addData[key]
        }

        function signature(thisTimes) {
            var strins = thisTimes + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase()
            var arrayList = strins.split('')
            var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
            var sortString = sortList.join('');
            var md5String = MD5(sortString).toUpperCase();
            return md5String
        }
        console.log(dataUrls);
        $.ajax({
            url: dataUrls + '' + data.url,
            type: 'post',
            dataType: 'json',
            ContentType: "application/json",
            data: data.list,
            success: function(res) {
                callback && callback(res);
            }
        });
    }
}
new setting().init();