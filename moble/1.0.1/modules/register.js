var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');
var http = require('http');
var session = require('express-session');

// const dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
class userLogin {
    serReq(dataParam, callback) {
        console.log(dataParam);
        dataParam.url = '/api/h5/login';
        dataParam.lsit = {};
        dataParam['list'] = {
            'condition': {
                UserName: dataParam.UserName, //电话
                Password: dataParam.Password //密码
            }
        };
        // console.log(dataParam)
        console.log(dataParam.UserName)
            // if (isLogin) {
        var times = new Date().getTime()
        var nonce = Math.random()
        var addData = {
                'signature': '', //signature(times), // 签名 '',
                'memberID': '', //session('id') || '', // 用户ID
                'timestamp': '', //times, // 时间戳  
                'nonce': '', //nonce // 随机数  
            }
            // }
        for (var key in addData) {
            dataParam.list[key] = addData[key]
        }
        // console.log(dataParam.list);
        // function signature(thisTimes) {
        //     var strins = thisTimes + '' + nonce + '' + session('id').toUpperCase() + '' + session('token').toUpperCase()
        //     var arrayList = strins.split('')
        //     var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
        //     var sortString = sortList.join('')
        //     var md5String = $.md5(sortString).toUpperCase()
        //     return md5String
        // }
        request({
            url: datas.uitHttpLocation + dataParam.url,
            method: dataParam.type,
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: dataParam.list
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
module.exports = userLogin;
// userLogin.prototype.serReq('15768705432', 'a123456', function(res) {
//     console.log(res);
// });