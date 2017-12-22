var url = require('url');
var queryString = require('querystring');
var crypto = require('crypto');
var request = require('request');
var xml2jsparseString = require('xml2js').parseString;

var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var tols = require('./tols');
var app = express();

var times = new Date().getTime();
var nonce = Math.random();

let ordernumbers = '';

var addData = {
    'signature': '', // 签名
    'userid': session('id') || '', // 用户ID
    'timestamp': times, // 时间戳  
    'nonce': nonce // 随机数  
}

function signature(uid, utoken) {
    let id = uid || '';
    let token = utoken || '';
    var strins = times + '' + nonce + '' + id.toString().toUpperCase() + '' + token.toString().toUpperCase()
    var arrayList = strins.split('')
    var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
    var sortString = sortList.join('')
    var md5String = md5(sortString).toString().toUpperCase();
    return md5String
}

// 引入项目的配置信息
// var config = require('../config/index.js');

var obj = {
    appid: 'wx66b6d0c67bbffb67',
    attach: '',
    body: '',
    mch_id: '1327276501',
    nonce_str: '',
    notify_url: '/success', // 微信付款后的回调地址 Y
    openid: '',
    out_trade_no: '', // new Date().getTime(), //订单号 Y
    spbill_create_ip: '', //客户端的 ip Y
    total_fee: '', //商品的价格， 此处需要注意的是这个价格是以分算的， 那么一般是元， 你需要转换为 RMB 的元 Y
    trade_type: 'JSAPI',
}

config = {
    wxappid: 'wx66b6d0c67bbffb67',
    mch_id: '1327276501',
    wxpaykey: 'C19A46C5741947A0AE4DF0860B1F5447',
    wxappsecret: '8be8582faf35585b5e44483b81d6c12d',
    WxSSLCERT_PATH: '',
    WxNOTIFY_URL: '/success',
    WxNOTIFY_ERROR_URL: '/success',
    WxLOG_LEVENL: '3',
    WxToken: 'token'
};

var userInfo = {
    access_token: '',
    expires_in: '',
    refresh_token: '',
    openid: '',
    scope: '',
};

// wechat 支付类 (使用 es6 的语法)
class WechatPay {
    /**
     * 获取微信统一下单参数
     */
    getUnifiedorderXmlParams(obj) {
        var body = '<xml> ' +
            '<appid>' + config.wxappid + '</appid> ' +
            '<attach>' + obj.attach + '</attach> ' +
            '<body>' + obj.body + '</body> ' +
            '<mch_id>' + config.mch_id + '</mch_id> ' +
            '<nonce_str>' + obj.nonce_str + '</nonce_str> ' +
            '<notify_url>' + obj.notify_url + '</notify_url>' +
            '<openid>' + obj.openid + '</openid> ' +
            '<out_trade_no>' + obj.out_trade_no + '</out_trade_no>' +
            '<spbill_create_ip>' + obj.spbill_create_ip + '</spbill_create_ip> ' +
            '<total_fee>' + obj.total_fee + '</total_fee> ' +
            '<trade_type>' + obj.trade_type + '</trade_type> ' +
            '<sign>' + obj.sign + '</sign> ' +
            '</xml>';
        return body;
    }

    createNonceStr() {
        return Math.random().toString(36).substr(2, 15);
    };

    /**
     * 获取微信统一下单的接口数据
     */
    getPrepayId() {
        var that = this;
        var UnifiedorderParams = { // 生成统一下单接口参数
            appid: config.wxappid,
            attach: obj.attach,
            body: obj.body,
            mch_id: config.mch_id,
            nonce_str: this.createNonceStr(),
            notify_url: obj.notify_url, // 微信付款后的回调地址
            openid: userInfo.openid,
            out_trade_no: ('tb' + new Date().getTime() + '0000' + Math.floor(Math.random() * 10)), //new Date().getTime(), //订单号
            spbill_create_ip: obj.spbill_create_ip,
            total_fee: obj.total_fee,
            trade_type: 'JSAPI',
            // sign: getSign(),
        };
        ordernumbers = UnifiedorderParams.out_trade_no;
        UnifiedorderParams.sign = that.getSign(UnifiedorderParams); // 获取 sign 参数
        return new Promise(function(resolve, reject) { // 返回 promise 对象
            request.post({
                url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                body: JSON.stringify(that.getUnifiedorderXmlParams(UnifiedorderParams))
            }, function(error, response, body) {
                var prepay_id = '';
                if (!error && response.statusCode == 200) {
                    console.log(ordernumbers);
                    xml2jsparseString(body, { async: true }, function(error, result) { // 微信返回的数据为 xml 格式， 需要装换为 json 数据， 便于使用
                        prepay_id = result.xml.prepay_id[0];
                        resolve(prepay_id); // 放回数组的第一个元素
                    });
                } else {
                    reject(body);
                }
            });
        });
    }

    /**
     * 获取微信支付的签名
     * @param payParams
     */
    getSign(signParams) {
        // 按 key 值的ascll 排序
        var keys = Object.keys(signParams);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function(val, key) {
            if (signParams[val]) {
                newArgs[val] = signParams[val];
            }
        })
        var string = queryString.stringify(newArgs) + '&key=' + config.wxpaykey;
        // 生成签名
        return crypto.createHash('md5').update(queryString.unescape(string), 'utf8').digest("hex").toUpperCase();
    }

    /**
     * 微信支付的所有参数
     * @param req 请求的资源, 获取必要的数据
     * @returns {{appId: string, timeStamp: Number, nonceStr: *, package: string, signType: string, paySign: *}}
     */
    getBrandWCPayParams(callback) {
        var that = this;
        var prepay_id_promise = that.getPrepayId();
        prepay_id_promise.then(function(prepay_id) {
            var prepay_id = prepay_id;
            var wcPayParams = {
                "appId": config.wxappid, //公众号名称，由商户传入
                "timeStamp": parseInt(new Date().getTime() / 1000).toString(), //时间戳，自1970年以来的秒数
                "nonceStr": that.createNonceStr(), //随机串
                "package": "prepay_id=" + prepay_id, // 通过统一下单接口获取
                "signType": "MD5"
            };
            wcPayParams.paySign = that.getSign(wcPayParams); //微信支付签名
            callback(null, wcPayParams, ordernumbers);
        }, function(error) {
            callback(error);
        });
    }

    /**
     * 获取随机的NonceStr
     */
    createNonceStr() {
        return Math.random().toString(36).substr(2, 15);
    };

    /**
     * 获取微信的 AccessToken
     */
    getAccessToken(total, code, ip, token, opid, retoken, scope, expin, callback, bodyDetail, bodyTitle) {
        var that = this;
        total = parseFloat(total) * 100;
        obj.spbill_create_ip = ip;
        obj.total_fee = total;
        obj.body = bodyDetail;
        obj.attach = bodyTitle;
        request.get({
            url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.wxappid + "&secret=" + config.wxappsecret + "&code=" + code + "&grant_type=authorization_code",
            form: {}
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                userInfo.access_token = token;
                userInfo.expires_in = expin;
                userInfo.refresh_token = retoken;
                userInfo.openid = opid;
                userInfo.scope = scope;
                obj.openid = opid;
                // 拼接微信的支付的参数
                that.getBrandWCPayParams(function(error, responseData, orderNumber) {
                    console.log(orderNumber);
                    callback && callback(responseData, orderNumber);
                });
            }
        });
    };

    /**
     * 支付成功回调
     */
    payCallback(OrderNO, TotalFee, TransactionID, PaymentType, BankType, id, token, callback) {
        console.log('\n' + id + '\n' + token);
        addData.signature = signature(id, token)
        console.log(JSON.stringify(addData));
        console.log(datas.uitHttpLocation);
        request.post({
            url: datas.uitHttpLocation + '/api/My/PayCallback',
            json: true,
            form: ({
                signature: addData.signature,
                memberID: id,
                timestamp: addData.timestamp,
                nonce: addData.nonce,
                condition: {
                    OrderId: OrderNO,
                    TotalFee: TotalFee,
                    TransactionID: TransactionID,
                    PaymentType: PaymentType,
                    BankType: BankType
                }
            })
        }, function(error, response, data) {
            console.log(JSON.stringify(data) + '\n\n\n\n');
            if (response) {
                if (!error && response.statusCode == 200) {
                    if (data.ResultCode == '6666') {
                        callback && callback(data);
                    }
                }
            } else {
                //后台程序错误
                var data = "网络异常，与后台失去联系";
                callback && callback(data);
            }
        });
    };
}
module.exports = WechatPay;