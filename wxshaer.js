var jsSHA = require('jssha');
var request = require('request');
let config={
    appID:"wx66b6d0c67bbffb67",
    appSecret:"8be8582faf35585b5e44483b81d6c12d"
}
class wxshaers {
    accessToken(callback){ // 获取access_token
        var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.appID+'&secret='+config.appSecret;
        request(tokenUrl, function (error, response, body) {
          if (response.statusCode && response.statusCode === 200) {
            body = JSON.parse(body); 
            callback&&callback(body);
          }
        });
    };
    upJsapiTicket(accessTtokens,callback){ // Jsapi_ticket
        var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessTtokens + '&type=jsapi';
        request(ticketUrl, function (err, response, content) {
          content = JSON.parse(content);
          if (content.errcode && content.errcode == 0) {
            callback&&callback(content.ticket);
          }
        })
    };
    createNonceStr(){ // 随机字符串
        return Math.random().toString(36).substr(2, 15);
    };
    createTimestamp(){ // 时间戳
        // return new Date().getTime();
        return parseInt(new Date().getTime() / 1000) + '';
    };
    raw(args) { // 拼接字符串
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });
        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    };
    sign(jsapi_ticket, url) {
        let self = this;
        var ret = {
          jsapi_ticket: jsapi_ticket,
          nonceStr: self.createNonceStr(),
          timestamp: self.createTimestamp(),
          url: url
        };
        var str = self.raw(ret);
        // var shaObj = new jsSHA(str, 'TEXT');
        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update(str);
        ret.signature = shaObj.getHash( 'HEX');
        return ret;
      };
      getsignature(url,callback){
          let self = this;
          let ticket = '';
          let result ={};
          self.accessToken((data)=>{
            self.upJsapiTicket(data.access_token,(datas)=>{
                    ticket = datas;
                    result = self.sign(ticket,url);
                    callback(result);
                })
            });
      }
}
module.exports=wxshaers;