// import { getDataPost, getDataGet } from './httpServer';
// var datas = require('./httpServer')
var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class GetDatas {
    getDatas(id, callback) {
        request.get({ url: datas.uitHttpLocation + '/api/h5/GetNewsByID?newsID=' + id }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let datas = JSON.parse(body);
                callback && callback(datas.Data.ObjDetail);
            }
        });
    }
}
module.exports = GetDatas;