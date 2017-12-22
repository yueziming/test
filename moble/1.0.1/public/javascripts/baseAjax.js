import MD5 from 'md5';
export var reqAjax = {
    sig: function(isLogin, data, callback, id, callback1) {
        $.ajax({
            url: data.url,
            dataType: 'json',
            type: data.type || 'post',
            ContentType: "application/json",
            data: data,
            success: function(data, status) {
                callback && callback(data);
            },
            complete: function(res) {
                callback1 && callback1(res);
            }
        })
    },
}