var express = require('express');
var router = express.Router();
var indexModule = require('../modules/index');
var detail = require('../modules/details');
var found = require('../modules/found');
var serve = require('../modules/serve');
var orderList = require('../modules/myorder');
var orderDetail = require('../modules/orderDetail');
var entreneurship = require('../modules/entreneurship');
var newList = require('../modules/newList');
var datas = require('../modules/httpConfig');
var userLogin = require('../modules/register');
var shoppingcar = require('../modules/shoppingcar');
var personInfo = require('../modules/personInfo');
var myshare = require('../modules/myshare');
var myword = require('../modules/myword');
var resetPassword = require('../modules/resetPassword');
var receiptAddress = require('../modules/receiptAddress');
var editAddress = require('../modules/editAddress');
var loginout = require('../modules/loginout');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var url = require('url');
var configs = require('./config');
var wxpay = require('../modules/wxpay');
var wxshaers = require('../modules/wxshaer.js');
// var redis = require("redis"),
//     client = redis.createClient();

// var RedisStore = require('connect-redis')(session);
// app.use(session({
//     store: new RedisStore(options),
//     secret: 'keyboard cat'
// }));

var app = express();

//设置session有效时间
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (60000 * 60 * 24) }, //设置session有效期限为1天
    cookie: { maxAge: (60000 * 60 * 24) }, //设置session有效期限为1天
    cookie: { maxAge: (60000 * 30), secure: false } //设置session有效期限为30分钟
}))

/* GET home page. */
router.get('/', function(req, res, next) {
    var _url = req.body.url;
    indexModule.prototype.getHomes(function(data) {
        res.render('index', {
            title: ' 腾博智慧云商',
            bannerDs: data[0],
            TopNewsList: data[1],
            HotAdvList: data[2],
            NewsList: data[3],
            RecommendServiceList: data[4],
            GetCategoryMenuList: data[5],
        });
    });

});

/**
 * 我的
 */
router.get('/myword', function(req, res, next) {
    let obj = {};
    if (req.session.user && req.session.user.token) {
        obj.token = req.session.user && req.session.user.token;
        obj.id = req.session.user && req.session.user.id;
        myword.prototype.serReq(obj, (data) => {
            if (data.Data && data.Data.ObjDetail) {
                res.render('myword', { title: '我的', info: data.Data.ObjDetail });
                console.log(data.Data.ObjDetail);
            } else {
                res.render('myword', { title: '我的', info: '' });
            }
        });
    } else {
        res.render('myword', { title: '我的', info: '' });
    }

});

/**
 * 我的订单
 */
router.get('/myorder', function(req, res, next) {
    let id = req.session.user && req.session.user.id;
    let token = req.session.user && req.session.user.token;
    console.log("---------------------------");
    console.log("id is:" + id);
    console.log("token is:" + token);
    if (id && id != '') {
        orderList.prototype.getList(id, token, function(data) {
            // console.log(data);
            if (data) {
                res.render('myorder', { title: '我的订单', res: data });
            } else {
                res.render('myorder', { title: '我的订单', res: [] });
            }
        });
    } else {
        res.redirect('/login');
    }
});

/**
 * 订单详情
 */
router.get('/orderdetails', function(req, res, next) {
    res.render('orderdetails', { title: '订单详情' });
})

/**
 * 订单评价
 */
router.get('/assess', function(req, res, next) {
    res.render('assess', { title: '评价' });
})

/**
 * 评价成功
 */
router.get('/assesssuc', function(req, res, next) {
    res.render('assesssuc', { title: '评价成功' });
})

/**
 * 购物车
 */
router.get('/shoppingcar', function(req, res, next) {
    let id = req.session.user && req.session.user.id;
    let token = req.session.user && req.session.user.token;
    if (id && id != '') {
        console.log("id is" + id);
        shoppingcar.prototype.getList(id, token, function(data) {
            if (data) {
                let myData = [];
                let falseData = [];
                //将ServiceIdList拼接
                for (var index in data) {
                    //要显示的数据
                    if (data[index].IsMain) {
                        myData.push(data[index]);
                    } else { //非主要数据
                        falseData.push(data[index]);
                    }
                }
                for (let index in myData) {
                    let arr = data[index].ServiceIdList.split(",");
                    if (arr.length > 1) {
                        myData[index].Describe += '(';
                        for (let i = 0; i < arr.length; i++) {
                            for (let index2 in falseData) {
                                if (arr[i] == falseData[index2].ServiceId) {
                                    myData[index].Describe += falseData[index2].Describe;
                                    myData[index].Price = parseFloat(parseFloat(myData[index].Price) + parseFloat(falseData[index2].Price)).toFixed(2);
                                    myData[index].MarketPrice = parseFloat(parseFloat(myData[index].MarketPrice) + parseFloat(falseData[index2].MarketPrice)).toFixed(2);
                                }
                            }
                            if (i == arr.length - 1) {
                                myData[index].Describe += ')';
                            }
                        }
                    }
                }
                res.render('shoppingcar', { title: '购物车', res: myData });
            } else {
                res.render('shoppingcar', { title: '购物车', res: "" });
            }
            // }
        });
    } else {
        console.log(2);
        res.render('shoppingcar', { title: '购物车', res: "" });
    }
})

/**
 * 查询
 */
router.get('/found', function(req, res, next) {
    found.prototype.getDs(function(data) {
        if (data.List) {
            res.render('found', { title: '发现', res: data.List });
        } else {
            res.render('found', { title: '发现', res: '' });
        }
    });
});

/**
 * 详情
 */
router.get('/details', function(req, res, next) {
    let code = req.query.code,
        name = req.query.Name;
    request.get({ url: datas.uitHttpLocation + '/api/h5/GetServiceInfoByCode?code=' + code }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let datas = JSON.parse(body);
            if (datas.Data.ObjDetail) {
                res.render('details', { title: name, objdetail: datas.Data.ObjDetail, datastils: datas });
            } else {
                res.render('details', { title: name, objdetail: '' });
            }
            // res.render('details', { title: name, objdetail: datas.Data.ObjDetail });
        }
    });
});

/**
 * 资讯
 */
router.get('/entreneurship', function(req, res, next) {
    let id = req.query.id,
        name = req.query.Name;
    entreneurship.prototype.getDatas(id, function(data) {
        res.render('entreneurship', { title: name, objdetail: data });
    });
});

/**
 * 服务
 */
router.get('/serve', function(req, res, next) {
    serve.prototype.serReq(function(data) {
        console.log(data[1]);
        if (data) {
            res.render('serve', { title: '服务', serve: data[0], serverData: data[1] })
        }
    });
});

/**
 * 看资讯
 */
router.get('/newList', function(req, res, next) {
    newList.prototype.getDatas(function(data) {
        res.render('newList', {
            title: '看资讯',
            newListTitle: data[0],
            newBody: data[1]
        });
    });
});
/**
 * 退出清除session
 */
router.post('/loginout', function(req, res, next) {
    let info = {
        id: req.session.user.id,
        token: req.session.user.token,
        PageIndex: req.body.PageIndex,
        PageSize: req.body.PageSize
    }
    loginout.prototype.serReq(info, function(data) {
        // reqs.session = null;
        req.session.user = null;
        res.json(data);
    });
});
/**
 * 我的分享
 */
router.get('/myShare', function(req, res, next) {
    res.render('myShare', { title: '我的分享' });
});
/**
 * my share req
 */
router.post('/myshare', function(req, res, next) {
    let info = {
        id: req.session.user.id,
        token: req.session.user.token,
        PageIndex: req.body.PageIndex,
        PageSize: req.body.PageSize
    }
    myshare.prototype.serReq(info, function(data) {
        res.json(data);
    });
});
/**
 * 填写订单页
 */
router.get('/fillInOrder', function(req, res, next) {
    res.render('fillInOrder', { title: '填写订单页' });
});
/**
 * 登录
 */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: '登录',
        message: '',
    });
});

//登录
router.post('/h5login', function(req, res, next) {
    userLogin.prototype.serReq(req.body, function(data) {
        let obj = {};
        obj.id = ((data && data.Data) && data.Data.ObjDetail && data.Data.ObjDetail.MemberID) || '';
        obj.token = ((data && data.Data) && data.Data.ObjDetail && data.Data.ObjDetail.Token) || '';
        req.session.user = obj;
        res.json(data);
    });
});

/**
 * 判断登录接口
 */
router.post('/islogin', function(req, res, next) {
    let obj = {};
    obj.id = req.session.user && req.session.user.id;
    obj.token = req.session.user && req.session.user.token;
    res.json(obj);
})

/**
 * 取session
 */
router.get('/session', function(req, res, next) {
    req.session.user = null;
    res.redirect('/login');
});
/**
 * 注册
 */
router.get('/register', function(req, res, next) {
    res.render('register', {
        title: '注册',
    });
});
/**
 * 设置
 */
router.get('/setting', function(req, res, next) {
    res.render('setting', { title: '设置' });
});
/**
 * 个人资料
 */
router.get('/personalInfo', function(req, res, next) {
    res.render('personalInfo', { title: '个人资料' });
});
/**
 * 编辑个人资料
 */
router.get('/editperson', function(req, res, next) {
    res.render('editperson', { title: '个人资料' });
});

/**
 * 获取个人资料
 */
router.post('/H5personInfo', function(req, res, next) {
    personInfo.prototype.serReq(req.body, function(data) {
        res.json(data);
    });
});
/**
 * 修改密码
 */
router.get('/resetPassword', function(req, res, next) {
    res.render('resetPassword', { title: '修改密码' });
});
/**
 * 忘记密码
 */
router.get('/forgetpwd', function(req, res, next) {
    res.render('forgetpwd', { title: '忘记密码' });
});
/**
 * reset password
 */
router.post('/UpdatePassword1', function(req, res, next) {
    console.log(req.body);
    let info = {
        id: req.session.user.id,
        token: req.session.user.token,
        UserName: req.body.UserName,
        Password: req.body.Password
    }
    resetPassword.prototype.serReq(req.body, function(data) {
        res.json(data);
    });
});
/**
 * 收货地址
 */
router.get('/receiptAddress', function(req, res, next) {
    res.render('receiptAddress', { title: '收货地址' });
});
/**
 * get address
 */
router.post('/AddressList', function(req, res, next) {
    let info = {
        id: req.session.user.id,
        token: req.session.user.token
    }
    receiptAddress.prototype.serReq(info, function(data) {
        res.json(data);
    });
});
/**
 * 新增编辑地址
 */
router.get('/editAddress', function(req, res, next) {
    res.render('editAddress', { title: '新增地址' });
});
/**
 * new create edit address
 */
router.post('/editAddress', function(req, res, next) {
    // console.log(req.body);
    editAddress.prototype.serReq(req.body, function(data) {
        res.json(data);
    });
});
/**
 * 搜索
 */
router.post('/h5/FetchSearchList', (req, res, next) => {
    serve.prototype.serSearch(req.body, (data) => {
        console.log(data);
    })
});
/**
/**
 * 填写发票
 */
router.get('/invoice', function(req, res, next) {
    res.render('invoice', { title: '填写发票' });
});
/**
 * 编辑发票
 */
router.get('/editinvoice', function(req, res, next) {
    res.render('editinvoice', { title: '填写发票' });
});
/**
 * 关于腾博
 */
router.get('/aboutTB', function(req, res, next) {
    res.render('aboutTB', { title: '关于腾博' });
});

/**
 * 分享码规则
 */
router.get('/codeRule', function(req, res, next) {
    res.render('codeRule', { title: '分享码规则' });
});

/**
 * 支付成功页面
 */
router.all('/wxsuccess', function(req, res) {
    res.render('wxsuccess', { title: '支付成功' });
});

/**
 * 支付失败页面
 */
router.all('/wxerror', function(req, res) {
    res.render('wxerror', { title: '支付失败' });
});

/**
 * 两地车牌活动支付页面
 */
router.get('/wxaliPays/joinsuc', function(req, res,next) {
    res.render('joinsuc', {});
});
/**
 * 两地车牌活动支付失败页面
 */
router.all('/activewxerror', function(req, res) {
    res.render('activewxerror', { title: '支付失败' });
});

/**
 * 支付页面
 */
router.get('/wxaliPays/', function(req, res, next) {
    res.render('wxaliPays', { title: '选择支付方式' });
});

/**
 * 获取access_token,openid
 */
router.post('/astokenOpid', function(req, res, next) {
    request.get({
        url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx66b6d0c67bbffb67&secret=8be8582faf35585b5e44483b81d6c12d&code=' + req.body.CODES + '&grant_type=authorization_code',
        form: {}
    }, function(error, response, body) {
        console.log(body);
        if (!error && response.statusCode == 200) {
            var userdata = JSON.parse(body);
            res.json(userdata);
        }
    });
});

/**
 * 获取wxpay
 */
router.post('/wxpay', function(req, res, next) {
    var token = req.body.token;
    var opid = req.body.opid;
    var retoken = req.body.retoken;
    var scope = req.body.scope;
    let ress = res;
    var expin = req.body.expin;
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');

    let bodyDetail = req.body.bodyDetail;
    let bodyTitle = req.body.bodyTitle;
    var reqTotla = req.body.Totla_fees;
    console.log(req.body);
    console.log('--------------------------------------------------------------------');
    console.log(bodyDetail + '\n\n' + bodyTitle + '\n\n' + reqTotla);
    console.log('--------------------------------------------------------------------');
    wxpay.prototype.getAccessToken(reqTotla, req.body.CODES, ip, token, opid, retoken, scope, expin, function(data, orderNumber) {
        data.orderNum = orderNumber
        ress.json(data);
    }, bodyDetail, bodyTitle);
});

/**
 * 支付成功后回调
 */
router.post('/payCallback', function(req, res, next) {
    var OrderNO = req.body.OrderNO;
    var TotalFee = req.body.TotalFee;
    var TransactionID = req.body.TransactionID;
    var PaymentType = req.body.PaymentType;
    var BankType = req.body.BankType;
    let id = req.session.user && req.session.user.id;
    let token = req.session.user && req.session.user.token;
    wxpay.prototype.payCallback(OrderNO, TotalFee, TransactionID, PaymentType, BankType, id, token, function(data) {
        res.json(data);
    });
});

/**
 * 朋友圈接口调用
 */
router.post('/wxshaer', function(req, res,next) {
    let myUrl = req.body.url;
    // console.log('00'+JSON.stringify(myUrl));
    wxshaers.prototype.getsignature(myUrl,function(data) {
        // console.log("123");
        // console.log(JSON.stringify(data));
        if(data){
            res.json(JSON.stringify(data));
        }else{
            res.json(JSON.stringify({"ResultCode":0,"Message":"微信分享调取失败"}));
        }
    });
});


/**
 * 404页面
 */
router.all('/*', function(req, res) {
    res.render('error404', { title: 'error404' });
});

module.exports = router;