export var uploadfile = (element, callBack) => {
    var client = new OSS.Wrapper({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIdgXPkmoZuDLE',
        accessKeySecret: 'Gctxnr0a58nflOb75DtXil2S8tHGJw',
        bucket: 'tb-images'
    });
    var f = element.files[0];
    var val = $(element).val();
    var suffix = val.substr(val.indexOf("."));
    var obj = timestamp(); // 这里是生成文件名
    var storeAs = 'upload-file/' + obj + suffix; //命名空间
    client.multipartUpload(storeAs, f).then(function(result) {
        callBack && callBack(result);
        // console.log(result); //--->返回对象
        // console.log(result.url); //--->返回链接
    }).catch(function(err) {
        console.log(err);
    });
    /**
     * 生成时间戳格式文件
     */
    function timestamp() {
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return "tb_" + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
    }
    /**
     * 获取时间戳小于0补全
     */
    function add0(m) {
        return m < 10 ? '0' + m : m;
    }
}