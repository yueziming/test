import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import { reqAjax } from '../baseAjax';
import MD5 from 'md5';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json' };
class setting {
    init() {
        let thin = this;
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });

        // $('.line-cont').on('click', 'label', function() {
        //     console.log(111);
        //     $('label').removeClass('live');
        //     $(this).addClass('live');
        // });
        dataParam.id = localStorage.getItem('userID');
        dataParam.token = localStorage.getItem('token');
        dataParam.url = '/AddressList';
        reqAjax.sig(true, dataParam, (res) => {
            if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                localStorage.clear();
                location.href = '/login';
            }
            if (res.ResultCode == 6666) {
                thin.setMsgDetils(res);
            }
        });
    };
    setMsgDetils(res) {
        let thin = this;
        let html = `<div class="line4">
                <div class="up">
                    <div>
                        <span>{{ReceiverName}}</span><span>{{Mobile}}</span>
                    </div>
                    <div>
                        <span>{{Address}}</span>
                    </div>
                </div>
                <div class="down">
                    <div><label data-id="{{AddressID}}"   class="{{lasb}}" for="{{default}}"><input type="radio" class="default" id="{{default}}" name="radi" value=""></label>设置为默认地址</div>
                    <div><span data-id="{{AddressID}}" class="edit">编辑</span><span data-id="{{AddressID}}" class="dele">删除</span></div>
                </div>
            </div>`;
        let html2 = '';
        let data = res.Data.List;
        let idn = 0;
        for (let i of data) {
            idn++;
            if (i.IsDefaultAddress == 1) {
                html2 += html.replace(/{{AddressID}}/g, i.AddressID).replace('{{ReceiverName}}', i.ReceiverName).replace('{{Mobile}}', i.Mobile).replace('{{Address}}', i.Address).replace(/{{default}}/g, 'default_' + idn).replace('{{lasb}}', 'live');
            } else {
                html2 += html.replace(/{{AddressID}}/g, i.AddressID).replace('{{ReceiverName}}', i.ReceiverName).replace('{{Mobile}}', i.Mobile).replace('{{Address}}', i.Address).replace(/{{default}}/g, 'default_' + idn).replace('{{lasb}}', '');
            }

        };
        idn = null;
        $('.line-cont').html(html2);
        $('.edit').on('click', function() {
            let cur = $(this).data('id');
            thin.edi(cur);
        });
        $('.dele').on('click', function() {
            let cur = $(this);
            let id = $(this).data('id');
            thin.del(cur, id);
        });
        $('label').on('click', function() {
            let cur = $(this);
            let id = $(this).data('id');
            thin.sel(cur, id);
        });
    };
    /**
     * 选中event
     */
    sel(thi, id) {
        let thin = this;
        $('label').removeClass('live');
        $(thi).addClass('live');
        thin.reqajax(false, id, (res) => {
            if (res.ResultCode == 6666) {
                MsgInfo.tipMsgBox('设置成功');
                false
            }
        });
    };
    /**
     * edit
     */
    edi(thi) {
        location.href = '/editAddress#id=' + thi;
    };
    /**
     * delete
     */
    del(thi, id) {
        let thin = this;
        MsgInfo.comFirmMsg(0, '删除改地址', '删除', '取消', function() {
            thin.reqajax(true, id, (res) => {
                if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                    localStorage.clear();
                    location.href = '/login';
                }
                if (res.ResultCode == 6666) {
                    MsgInfo.tipMsgBox('删除成功');
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                }
            });
        }, '')

    }
    reqajax(isDel, data, callback) {
        var times = new Date().getTime()
        var nonce = Math.random()
        var addData = {
            'signature': signature(times), // 签名 '',
            'memberID': localStorage.getItem('userID') || '', // 用户ID
            'timestamp': times, // 时间戳  
            'nonce': nonce, // 随机数  
            condition: {
                AddressID: data //地址ID
            }
        }


        function signature() {
            var strins = times + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase()
            var arrayList = strins.split('')
            var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
            var sortString = sortList.join('');
            var md5String = MD5(sortString).toUpperCase();
            return md5String
        }
        $.ajax({
            url: dataUrls + (isDel ? '/api/My/DeleteAddress' : '/api/My/SetAsDefaultAddress'),
            type: 'post',
            dataType: 'json',
            ContentType: "application/json",
            data: addData,
            success: function(res) {
                callback && callback(res);
            }
        });
    }

}
new setting().init();