import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import { reqAjax } from '../baseAjax';
import { uploadfile } from '../uploadfile';
import MD5 from 'md5';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
let picturedata;
class setting {
    init() {
        let thin = this;
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });

        $('.line1 .inputImg').on('click', function() {
            $('.inputImg').on('change', function() {
                thin.uploadImg(this, (photoUrl) => {
                    thin.ajaxFun(photoUrl, (res) => {
                        console.log(res);
                    });
                });
            });
        });
        dataParam.id = localStorage.getItem('userID');
        dataParam.token = localStorage.getItem('token');
        dataParam.url = '/H5personInfo';
        reqAjax.sig(true, dataParam, (res) => {
            thin.setMsgDetils(res);
        });
        $('.line2').on('click', function() {
            if ($(this).data('name') != 'Mobile') {
                location.href = '/editPerson?flagnum=' + $(this).index() + $(this).data('name') + '#=' + $(this).children().text();
            }
        });
    };
    setMsgDetils(data) {
        if (data.ResultCode == 2100 || data.ResultCode == 2200 || data.ResultCode == 2300) {
            localStorage.clear();
            location.href = '/login';
        }
        if (data.Data && data.Data.ObjDetail) {
            let datas = data.Data.ObjDetail;
            $('.name').html(datas.Name).parent().attr('data-name', 'Name');
            let IsMale = (datas.IsMale == 0 ? '女' : '男');
            $('.sex').html(IsMale).parent().attr('data-name', 'IsMale');
            $('.tel').html(datas.Mobile).parent().attr('data-name', 'Mobile');
            $('.qq').html(datas.QQ).parent().attr('data-name', 'QQ');
            $('.email').html(datas.Email).parent().attr('data-name', 'Email');
            let isPhoto = datas.Photo && datas.Photo || ''
            $('.backimg').attr('style', (isPhoto != '' ? "background-image:url(" + datas.Photo + ")" : '')).parent().parent().attr('data-name', 'Photo');
        }
    };
    ajaxFun(picturedata, callback) {
        dataParam.url = '/api/Member/UpdateOneColumn';
        dataParam.list = {
            condition: {
                MemberID: localStorage.getItem('userID'), //客户ID
                ColumnName: 'PhotoURL', //字段名称
                ColumnValue: picturedata //字段值
            }
        }
        var times = new Date().getTime()
        var nonce = Math.random()
        var addData = {
            'signature': signature(times), // 签名 '',
            'memberID': localStorage.getItem('userID') || '', // 用户ID
            'timestamp': times, // 时间戳  
            'nonce': nonce // 随机数  
        }
        for (var key in addData) {
            dataParam.list[key] = addData[key]
        }

        function signature(thisTimes) {
            var strins = thisTimes + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase()
            var arrayList = strins.split('')
            var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
            var sortString = sortList.join('');
            var md5String = MD5(sortString).toUpperCase();
            return md5String
        }
        $.ajax({
            url: dataUrls + dataParam.url,
            type: 'post',
            dataType: 'json',
            ContentType: "application/json",
            data: dataParam.list,
            success: function(res) {
                if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                    localStorage.clear();
                    location.href = '/login';
                }
                callback && callback(res);
            },
            complete: function() {

            }
        });
    };
    /**
     * 上传图片
     * @param {*DOME元素} eElem 
     */
    uploadImg(eElem, callback) {
        $('.mask').css('display', 'block');
        $('.mask div').css('opacty', 1).text('正在上传...');
        uploadfile(eElem, function(result) {
            let thisUrl = result.url || upSplitFile(result)
            $('.backimg').css({ "background-image": " url(" + thisUrl + ")" });
            // picturedata = thisUrl;
            $('.mask div').text('上传完成');
            setTimeout(function() {
                $('.mask').css('display', 'none');
            }, 1000);
            callback && callback(thisUrl)
        });
        /**
         * 上传重复时，切割图片寻找地址
         * @param { url } result 
         */
        function upSplitFile(result) {
            return result.res.requestUrls.join('').split('?')[0];
        }
    };
}
new setting().init();