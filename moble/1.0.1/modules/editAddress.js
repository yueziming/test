var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');
var http = require('http');
var session = require('express-session');

// const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'id': '25904aae-36ce-46cf-9bd7-b916ad545a8d', 'token': '77b71b32-6fa2-44c9-8a50-58397d14e542' };

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
class editAddress {
    serReq(dataParam, callback) {
        request.post({
            url: datas.uitHttpLocation + '/api/OrderOther/addaddress',
            json: true,
            form: ({
                signature: signature(dataParam),
                memberID: dataParam.id,
                timestamp: addData.timestamp,
                nonce: addData.nonce,
                condition: {
                    AddressID: dataParam.AddressID, //地址ID
                    MemberID: dataParam.id, //客户ID
                    ReceiverName: dataParam.ReceiverName, // 联系人
                    Mobile: dataParam.Mobile, // 电话
                    Province: dataParam.Province, //省
                    City: dataParam.City, //市
                    Country: dataParam.Country, //区
                    DetailAddress: dataParam.DetailAddress, //详细地址
                    IsDefaultAddress: dataParam.IsDefaultAddress //设为默认地址 是1 否0
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
module.exports = editAddress;
// editAddress.prototype.serReq(dataParam, function(res) {
//     console.log(res);
// });