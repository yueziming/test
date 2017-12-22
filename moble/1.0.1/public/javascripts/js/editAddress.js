import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import { reqAjax } from '../baseAjax';
import MD5 from 'md5';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json' };
let addrssid = '';
class setting {
    init() {
        let thin = this;
        dataParam.id = localStorage.getItem('userID');
        dataParam.token = localStorage.getItem('token');
        let addrssi = location.hash;
        addrssid = addrssi ? addrssi.split('=')[1] : '';
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });
        _init_Data();
        if (location.hash) {
            $('.goback span').text('编辑地址');
            thin.edit(addrssid);
        }
        let flag = false;
        $('.line5 label').on('click', function() {
            flag = !flag;
            flag ? $(this).addClass('live') : $(this).removeClass('live');
        });
        this.bindClick();
    };
    bindClick() {
        let _this = this;
        $('.sureBtn').on('click', function() {
            $('.sureBtn').off('click');
            dataParam.AddressID = addrssid;
            dataParam.ReceiverName = $('.name').val(); //联系人
            dataParam.Mobile = $('.tel').val(); // 电话
            dataParam.Province = $('#province').val(); // 省
            dataParam.City = $('#city').val(); //市
            dataParam.Country = $('#county').val(); //区
            dataParam.DetailAddress = $('.detailAddress').val(); //详细地址
            dataParam.url = '/editAddress';
            let numDefault = $('label').hasClass('live') ? 1 : 0;
            dataParam.IsDefaultAddress = numDefault;
            reqAjax.sig(true, dataParam, (res) => {
                if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                    localStorage.clear();
                    location.href = '/login';
                }
                if (res.ResultCode == 6666) {
                    addrssid ? MsgInfo.tipMsgBox('编辑成功') : MsgInfo.tipMsgBox('新增成功');
                    // let search = location.search;
                    // let str = search.split(/\d/);
                    if (sessionStorage.getItem("search")) {
                        let search = sessionStorage.getItem("search");
                        sessionStorage.removeItem("search");
                        setTimeout(function() { window.location.href = '/fillInOrder' + search; }, 2000);
                    } else {
                        setTimeout(function() {
                            location.href = '/receiptAddress';
                        }, 2000);
                    }
                } else {
                    MsgInfo.tipMsgBox(res.Message);
                }
            }, '', (ress) => {
                _this.bindClick();
            });
        });
    };
    /**
     * 编辑
     */
    edit(id) {
        let thin = this;
        thin.reqajax(id, (res) => {
            let info = res.Data.ObjDetail;
            if (info && info.ReceiverName) {
                $('.name').val(info.ReceiverName); //联系人
                $('.tel').val(info.Mobile); // 电话
                // $('#province').val(info.Province); // 省
                // $('#city').val(info.City); //市
                // $('#county').val(info.Country); //区
                $('.detailAddress').val(info.DetailAddress); //详细地址
                _init_Update(info.Province, info.City, info.Country);
                info.IsDefaultAddress == 1 ? $('.line5 label').addClass('live') : '';
            }
        })
    };
    reqajax(data, callback) {
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
            var arrayList = strins.split('');
            var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
            var sortString = sortList.join('');
            var md5String = MD5(sortString).toUpperCase();
            return md5String
        }
        $.ajax({
            url: dataUrls + '/api/My/GetAddressByID',
            type: 'post',
            dataType: 'json',
            ContentType: "application/json",
            data: addData,
            success: function(res) {
                if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                    localStorage.clear();
                    location.href = '/login';
                }
                callback && callback(res);
            }
        });
    }

}
new setting().init();