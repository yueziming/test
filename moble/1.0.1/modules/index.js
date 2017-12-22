// import { getDataPost, getDataGet } from './httpServer';
// var datas = require('./httpServer')
var datas = require('./httpConfig');
var http = require('http');
var querystring = require('querystring');
var md5 = require('md5');
var cookParser = require('cookie-parser');
var request = require('request');

class GetDatas {
    validation() {
        var uid = cookParser('id') || '';
        var token = cookParser('token') || '';

        var times = new Date().getTime();
        var nonce = Math.random();
        var addData = {
            'signature': signature(times), // 签名
            'userid': uid || '', // 用户ID
            'timestamp': times, // 时间戳  
            'nonce': nonce // 随机数  
        }

        function signature(thisTimes) {
            var strins = thisTimes + '' + nonce + '' + uid.toString().toUpperCase() + '' + token.toString().toUpperCase()
            var arrayList = strins.split('')
            var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
            var sortString = sortList.join('')
            var md5String = md5(sortString).toString().toUpperCase()
            return md5String
        }
        return addData;
    };
    getHomes(callback) {
        let pageArray = [];
        let url = ['BannerAdvList', 'TopNewsList', 'HotAdvList', 'NewsList', 'RecommendServiceList', 'GetCategoryMenuList'],
            arylist = [{}, {}, {}, { list: { pageIndex: 1, pageSize: 10 } }, {}, {}],
            i = 0;

        function upDates() {
            let data = {
                'url': '/api/h5/' + url[i],
                'type': 'POST',
                'list': arylist[i]
            };
            var options = {
                url: datas.uitHttpLocation + data.url,
                json: true,
                method: data.type,
                headers: {
                    "content-type": "application/json",
                },
                data: data.list
            }
            if (i != 3) {
                request(options, function(error, response, data) {
                    if (response) {
                        if (response.statusCode == 200) {
                            if (data.ResultCode == '6666') {
                                if (i == 4) {
                                    let thisList = data.Data.List;
                                    var compare = function(obj1, obj2) {
                                        var val1 = obj1.Index;
                                        var val2 = obj2.Index;
                                        if (val1 < val2) {
                                            return 1;
                                        } else if (val1 > val2) {
                                            return -1;
                                        } else {
                                            return 0;
                                        }
                                    }
                                    let arryList = thisList;
                                    pageArray.push(arryList);
                                } else {
                                    pageArray.push(data.Data.List);
                                }
                            } else {
                                console.log(i + '===>' + data);
                                pageArray.push("");
                            }
                            if (i == 5) {
                                callback && callback(pageArray);
                                return;
                            }
                            i++;
                            upDates(i);
                        }
                    } else {
                        i++;
                        upDates(i);
                    }
                });
            } else {
                request.get({ url: options.url + '?pageIndex=1' }, function(error, response, body) {
                    if (response) {
                        if (!error && response.statusCode == 200) {
                            let datas = JSON.parse(body);
                            if (datas.ResultCode == '6666') {
                                pageArray.push(datas.Data.List);
                            } else {
                                console.log(i + '===>' + body);
                                pageArray.push("");
                            }
                            i++;
                            upDates(i);
                        }
                    } else {
                        i++;
                        upDates(i);
                    }
                });
            }
        }
        upDates();
    }
}
module.exports = GetDatas;

// GetDatas.prototype.getHomes();