var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');
var http = require('http');
var session = require('express-session');

// const dataParam = { 'url': '/H5personInfo', 'type': 'post', 'dataType': 'json', 'list': 'condition: {PageIndex: 1,PageSize: 10, }', id: '25904aae-36ce-46cf-9bd7-b916ad545a8d', token: '95d8a943-8162-48d5-98b4-1b94d0480c14' };

var times = new Date().getTime()
var nonce = Math.random();
var addData = {
    'signature': '', // 签名 '',
    'memberID': session('id') || '', // 用户ID
    'timestamp': times, // 时间戳  
    'nonce': nonce // 随机数  
};

function signature(info) {
    var strins = times + '' + nonce + '' + info.id.toString().toUpperCase() + '' + info.token.toString().toUpperCase();
    var arrayList = strins.split('');
    var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
    var sortString = sortList.join('');
    var md5String = md5(sortString).toString().toUpperCase();
    return md5String;
}
class receiptAddress {
    serReq(dataParam, callback) {
        console.log('-----------')
        console.log(dataParam);
        console.log(datas.uitHttpLocation)
        request.post({
            url: datas.uitHttpLocation + '/api/OrderOther/AddressList',
            json: true,
            form: ({
                signature: signature(dataParam),
                memberID: dataParam.id,
                timestamp: addData.timestamp,
                nonce: addData.nonce,
                condition: {
                    MemberID: dataParam.id //客户ID
                }
            }),
        }, function(error, response, body) {
            if (response) {
                console.log(response.statusCode);
                if (!error && response.statusCode == 200) {
                    callback && callback(body);
                }
            } else {
                body = '';
                callback && callback(body);
            }
        })
    }

}
module.exports = receiptAddress;
// receiptAddress.prototype.serReq(dataParam, function(res) {
//     console.log(res);
// });