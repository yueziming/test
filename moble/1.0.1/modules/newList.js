var datas = require('./httpConfig')
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class GetDatas {
    getDatas(callback) {
        let pageArray = [];
        let url = ['NewsTypeList', 'GetNewsListByTypeID'],
            i = 0;

        function upDates() {
            let data = {
                'url': '/api/h5/' + url[i],
                'type': 'POST',
            };
            var options = {
                url: datas.uitHttpLocation + data.url,
                json: true,
                method: data.type,
                headers: {
                    "content-type": "application/json",
                },
                data: {}
            }
            if (i != 1) {
                request(options, function(error, response, data) {
                    if (response) {
                        if (response.statusCode == 200) {
                            if (data.ResultCode == "6666") {
                                pageArray.push(data.Data.List);
                            } else {
                                pageArray.push("");
                            }
                            i++;
                            upDates(i);
                        }
                    } else {
                        pageArray.push("");
                        i++;
                        upDates(i);
                    }
                });
            } else {
                request.get(options.url + '?pageIndex=1&typeID=0', function(error, response, body) {
                    if (response) {
                        if (!error && response.statusCode == 200) {
                            let datas = JSON.parse(body);
                            if (datas.ResultCode == "6666") {
                                pageArray.push(datas.Data.List);
                            } else {
                                pageArray.push("");
                            }
                            callback && callback(pageArray);
                            return;
                        }
                    } else {
                        pageArray.push("");
                        callback && callback(pageArray);
                        return;
                    }
                });
            }
        }
        upDates();
    }
}
module.exports = GetDatas;
// GetDatas.prototype.getDatas()