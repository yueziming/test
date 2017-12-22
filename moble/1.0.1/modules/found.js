var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class getDetail {
    getDs(callback) {
        request({
            url: datas.uitHttpLocation + '/api/h5/FindSpecialList',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            data: {}
        }, function(error, response, data) {
            if (response) {
                if (!error && response.statusCode == 200) {
                    callback && callback(data.Data);
                }
            } else {
                data.List = '';
                callback && callback(Data);
            }
        });
    }
}

module.exports = getDetail;
// getDetail.prototype.getDs();