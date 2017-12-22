// import { getDataPost, getDataGet } from './httpServer';
// var datas = require('./httpServer')
var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class GetDatas {
    getDatas(code, callback) {
        request.get({ url: datas.uitHttpLocation + '/api/h5/GetServiceInfoByCode?code=' + code }, function(error, response, body) {
            if (response) {
                if (!error && response.statusCode == 200) {
                    let datas = JSON.parse(body);
                    callback && callback(datas.Data.ObjDetail);
                }
            } else {
                ObjDetail = "";
                callback && callback(ObjDetail);
            }
        });
    }
}
module.exports = GetDatas;