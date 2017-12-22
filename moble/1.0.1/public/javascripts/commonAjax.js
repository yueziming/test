var md5 = require("md5");
var messagePromptBox =require('./msgBox.js');

var Common ={
    ajax:function(baseAjax,param,callback){
        let times = new Date().getTime();
        let nonce = Math.random();
        let that = this;
        var data = {
            'signature': that.signature(times,nonce), // 签名
            // 'memberID': localStorage.getItem('userID') || '', // 用户ID
            'memberID': localStorage.getItem("userID") || '',
            'timestamp': times, // 时间戳  
            'nonce': nonce, // 随机数
            condition:param
        }
        $.ajax({
            url:baseAjax.url,
            type:baseAjax.type || "post",
            dataType:'json',
            data:data,
            success:function(res){
                // console.log(res);
                if(res && res.ResultCode == "6666"){
                    callback(res);
                }
                else{
                    messagePromptBox.tipMsgBox(res.Message,1000);
                }
            },
            error:function(){
                messagePromptBox.tipMsgBox('网络异常',1000);
            }
        })    
    },
    //计算签名方法
    signature:function(thisTimes,nonce){
        var strins = thisTimes + '' + nonce + '' + (localStorage.getItem('userID') || '').toUpperCase() + '' +(localStorage.getItem('token') || '').toUpperCase()
        var arrayList = strins.split('')
        var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
        var sortString = sortList.join('')
        var md5String = md5(sortString).toUpperCase()
        return md5String
    },
    //判断是否登录
    isLogin:function(callback){
        let sign = true;
        $.ajax({
            url:"/islogin",
            data:{},
            type:"post",
            dataType:"json",
            success:function(res){
                if(res && res.id && res.token){
                    if(localStorage.getItem("userID") == res.id){
                        callback(true);
                    }else{
                        localStorage.removeItem("userID");
                        localStorage.removeItem("token");
                        callback(false);
                    }
                }else{
                    localStorage.removeItem("userID");
                    localStorage.removeItem("token");
                    callback(false);
                }
            },
            error:function(){
                //后台接口登录不上，判断退出状态
                localStorage.removeItem("userID");
                localStorage.removeItem("token");
                callback(false);
            }
        })
    }
}

module.exports = Common;