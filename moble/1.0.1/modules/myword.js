var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');
var http = require('http');
var session = require('express-session');
var times = new Date().getTime()
var nonce = Math.random();
var addData = {
    'signature': '', // 签名 '',
    'memberID': session('id') || '', // 用户ID
    'timestamp': times, // 时间戳  
    'nonce': nonce // 随机数  
};
// dataParam.list = {
//     'condition': {}
// };
// for (var key in addData) {
//     dataParam.list[key] = addData[key];
// }
// let strData = JSON.stringify(dataParam.list);
// var aa = function signature(thisTimes) {
//     var strins = '1509701494119' + '' + '0.7551114613795922' + '' + '96694927-A85E-4063-B95E-2A10EE8C74CD'.toUpperCase() + '' + '96694927-A85E-4063-B95E-2A10EE8C74CF'.toUpperCase();
//     var arrayList = strins.split('');
//     var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
//     var sortString = sortList.join('');
//     var md5String = md5(sortString).toUpperCase();
//     return md5String;
// }
// console.log(aa());
// console.log(dataParam.id);
function signature(info) {
    var strins = times + '' + nonce + '' + info.id.toString().toUpperCase() + '' + info.token.toString().toUpperCase();
    var arrayList = strins.split('');
    var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) });
    var sortString = sortList.join('');
    var md5String = md5(sortString).toString().toUpperCase();
    return md5String;
}
// const dataParam = { 'url': '/H5personInfo', 'type': 'post', 'dataType': 'json', 'list': {}, id: '25904aae-36ce-46cf-9bd7-b916ad545a8d', token: 'd5c5c52e-9e42-422c-8efa-3233fdb24a0c' };
class myword {
    serReq(dataParam, callback) {
        request.post({
            url: datas.uitHttpLocation + '/api/My/GetMemberByID',
            json: true,
            form: ({
                signature: signature(dataParam),
                memberID: dataParam.id,
                timestamp: addData.timestamp,
                nonce: addData.nonce,
                condition: {}
            }),
        }, function(error, response, body) {
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                callback && callback(body);
            } else {
                body = '';
                callback && callback(body);
            }
        })
    }
}
module.exports = myword;
// let aa = { id: '25904aae-36ce-46cf-9bd7-b916ad545a8d', token: '461f0d76-e7aa-49ba-ae49-a85bf649003c' }
// myword.prototype.serReq(aa, function(res) {
//     console.log(res);
// });