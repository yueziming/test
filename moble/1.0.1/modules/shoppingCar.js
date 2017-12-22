var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var express = require('express');
var tols=require('./tols');
var app = express();

var times = new Date().getTime()
var nonce = Math.random()
var addData = {
    'signature': '', // 签名
    'userid': session('id') || '', // 用户ID
    'timestamp': times, // 时间戳  
    'nonce': nonce // 随机数  
}

function signature(uid,utoken) {
    let id = uid || '';
    let token = utoken || '';
    var strins = times + '' + nonce + '' + id.toString().toUpperCase() + '' + token.toString().toUpperCase()
    var arrayList = strins.split('')
    var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
    var sortString = sortList.join('')
    var md5String = md5(sortString).toString().toUpperCase();
    return md5String
}

class shoppingCar {
    getList(id,token,callback) {
        console.log("id is"+id);
        request.post({
            url: datas.uitHttpLocation + '/api/ShoppingCart/GetCart',
            json: true,
            form:({
                signature:signature(id,token),
                memberID:id,
                timestamp:addData.timestamp,
                nonce:addData.nonce,
            })
        }, function(error, response, data) {
            console.log(data);
            if (response) {
                if (!error && response.statusCode == 200) {
                    if(data.ResultCode == '6666'){
                        callback && callback(data.Data.List);
                    }
                }
            } else {
                //后台程序错误
                var data = "网络异常，与后台失去联系";
                callback && callback(data);
            }
        });
    }
}

module.exports = shoppingCar;
// new getOrder().getList()