var datas = require('./httpConfig')
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class serve {
    serReq(callback) {

        let hrefUrl = ['/api/h5/GetCategoryTreeList', '/api/h5/WeSearch'];
        let dataArray = [];
        let i = 0;
        cabak();

        function cabak() {
            if (i < hrefUrl.length) {
                request({
                    url: datas.uitHttpLocation + hrefUrl[i],
                    method: "POST",
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: {}
                }, function(error, response, body) {
                    i++;
                    if (response) {
                        if (!error && response.statusCode == 200) {
                            if (body.Data) {
                                dataArray.push(body.Data.List);
                                cabak();
                            }
                        }
                    } else {
                        dataArray.push('');
                        cabak();
                    }
                });
            } else {
                callback && callback(dataArray);
            }
        }
    };
    serSearch(callback) {
        request({
            url: datas.uitHttpLocation + '/api/h5/FetchSearchList',
            method: "get",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: {}
        }, function(error, response, body) {
            if (response) {
                if (!error && response.statusCode == 200) {
                    callback && callback(dataArray);
                }
            } else {
                body.Data = {};
                body.Data.List = '';
                callback && callback(dataArray);
            }
        });
    }
}
module.exports = serve;