import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
import MD5 from 'md5';
import { uploadfile } from '../uploadfile';
fastclick.attach(document.body);
const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
const picturedata = {};

class setting {
    init() {
        let thin = this;
        $('.goback i').on('click', function() {
            window.history.back();
        });
        $('.line2').on('click', function() {
            let path = location.search;
            location.href = '/editinvoice' + path + '#flagnum=' + $(this).data('num');
        });
        let urk = location.search;
        let id = urk.split('=')[1];
        $('.invoice').text(localStorage.getItem('invoice') || '普通发票');
        $('.invoicecontent').text(localStorage.getItem('invoicecontent') || '咨询服务费');
        $('.company').text(localStorage.getItem('company') || '');
        $('.tax').text(localStorage.getItem('tax') || '');
        $('.address').text(localStorage.getItem('address') || '');
        $('.tel').text(localStorage.getItem('tel') || '');
        $('.account').text(localStorage.getItem('account') || '');
        $('.bank').text(localStorage.getItem('bank') || '');
        if (localStorage.getItem('invoice') && localStorage.getItem('invoice') == '专用发票') {
            $('section').show();
        } else {
            $('section').hide();
        }
        // $('.updataImg').on('click', function() {
        $('#file').on('change', function() {
            thin.uploadImg(this);
            // });
        });


        dataParam.url = '/api/My/CreateInvoice';
        $('.saveSubmit').on('click', function() {
            let invoice = $('.invoice').text() == '普通发票' ? 1 : 2;
            let invoicecontent = $('.invoicecontent').text() == '财务服务费' ? 1 : 2;
            let company = $('.company').text();
            let tax = $('.tax').text();
            let address = $('.address').text();
            let tel = $('.tel').text();
            let account = $('.account').text();
            let bank = $('.bank').text();
            // let certificateC = $('.certificateC').css('background-image');
            dataParam.list = {
                condition: {
                    OrderID: id, //订单ID
                    InvoiceType: invoice, //发票类型 1增值税收普通发票  2专用发票    
                    CompanyName: company, //公司名称 
                    TaxNo: tax, //税号 
                    TaxContent: invoicecontent, //发票内容 1财务服务费  2咨询服务费 
                    Address: address, //地址
                    Tel: tel, //电话 
                    OpenAccountBank: account, //开户行
                    BankAccount: bank, //银行账号
                    CertificatePhoto: picturedata.picture, //纳税人认定书
                }
            };

            thin.reqajax(dataParam, (res) => {
                if (res.ResultCode == 6666) {
                    localStorage.removeItem('invoice');
                    localStorage.removeItem('invoicecontent');
                    localStorage.removeItem('company');
                    localStorage.removeItem('tax');
                    localStorage.removeItem('address');
                    localStorage.removeItem('tel');
                    localStorage.removeItem('account');
                    localStorage.removeItem('bank');
                    MsgInfo.tipMsgBox('保存成功');
                    setTimeout(function() {
                        location.href = '/orderdetails?id=' + id;
                    }, 2000)
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
        $.ajax({
            url: (dataUrls + data.url),
            type: 'post',
            dataType: 'json',
            ContentType: "application/json",
            data: data.list,
            success: function(res) {
                callback && callback(res);
            }
        });
    };
    /**
     * 上传图片
     * @param {*DOME元素} eElem 
     */
    uploadImg(eElem) {
        uploadfile(eElem, function(result) {
            let thisUrl = result.url || upSplitFile(result)
            $('.certificateC').css({ "background-image": " url(" + thisUrl + ")" });
            picturedata.picture = thisUrl;
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