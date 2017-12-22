var session = require('express-session');

export function tisld(){
    var times = new Date().getTime()
    var nonce = Math.random()
    var addData = {
        'signature': signature(times), // 签名
        'userid': session('id') || '', // 用户ID
        'timestamp': times, // 时间戳  
        'nonce': nonce // 随机数  
    }
    for (var key in addData) {
        data.list[key] = addData[key]
    }

    function signature(thisTimes) {
        var strins = thisTimes + '' + nonce + '' + session('id').toUpperCase() + '' +session('token').toUpperCase()
        var arrayList = strins.split('')
        var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
        var sortString = sortList.join('')
        var md5String = $.md5(sortString).toUpperCase()
        return md5String
    }
}