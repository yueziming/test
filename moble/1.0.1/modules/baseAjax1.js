var session = require('express-session');
var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');
var http = require('http');
var reqAjax = {
    sig: function sig(isLogin, data, callback) {
        if (isLogin) {
            var times = new Date().getTime()
            var nonce = Math.random()
            var addData = {
                'signature': signature(times), // 签名 '',
                'userid': session('id') || '', // 用户ID
                'timestamp': times, // 时间戳  
                'nonce': nonce // 随机数  
            }
            for (var key in addData) {
                data.list[key] = addData[key]
            }

            function signature(thisTimes) {
                var strins = thisTimes + '' + nonce + '' + session('id').toUpperCase() + '' + session('token').toUpperCase()
                var arrayList = strins.split('')
                var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
                var sortString = sortList.join('')
                var md5String = $.md5(sortString).toUpperCase()
                return md5String
            }
        }
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
                if (!error && response.statusCode == 200) {
                    callback && callback(body.Data);
                }
            } else {
                data.List = '';
                callback && callback(Data);
            }
        })
    },

}
module.export = reqAjax;