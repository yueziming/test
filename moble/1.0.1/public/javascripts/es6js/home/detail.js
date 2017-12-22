webpackJsonp([20],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commonAjax_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commonAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__commonAjax_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_js__ = __webpack_require__(4);



var flags = true;
$(function () {
    var detail = {
        isLogin: false,
        getLogin: function getLogin() {
            var that = this;
            __WEBPACK_IMPORTED_MODULE_1__commonAjax_js___default.a.isLogin(function (res) {
                that.isLogin = res;
                that.init();
            });
        },
        init: function init() {
            //如果有客户登录
            if (this.isLogin) {
                // this.isLogin = true;
                var baseAjax = {
                    url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].GETSHOPPINGCARDATA
                };
                __WEBPACK_IMPORTED_MODULE_1__commonAjax_js___default.a.ajax(baseAjax, {}, function (res) {
                    if (res && res.Data && res.Data.List && res.Data.List.length > 0) {
                        var counts = 0;
                        for (var i = 0; i < res.Data.List.length; i++) {
                            if (res.Data.List[i].IsMain) {
                                counts += res.Data.List[i].Qty;
                            }
                        }
                        $(".go-shopping-car i").text(counts);
                        $(".go-shopping-car").show();
                    } else {
                        $(".go-shopping-car").hide();
                    }
                });
            } else {
                this.isLogin = false;
                var res = JSON.parse(localStorage.getItem("shoppingcar"));
                if (res && res.length > 0) {
                    var counts = 0;
                    for (var i = 0; i < res.length; i++) {
                        counts += res[i].Qty;
                    }
                    $(".go-shopping-car i").text(counts);
                    $(".go-shopping-car").show();
                } else {
                    $(".go-shopping-car").hide();
                }
            }
        },
        bindclick: function bindclick() {
            $('.clickOption span').off('click').on('click', function () {
                var sleid = parseInt($(this).data('sleid'));
                $(this).addClass('active').siblings().removeClass('active');
                $('.bodys hgroup').eq(sleid).show().siblings().hide();
                var codes = window.location.search.substr(1).split("&name=")[0].substr(5);
                flags ? clickOption(codes) : "";
            });
        }
    };
    detail.getLogin();
    setTimeout(function () {
        detail.bindclick();
    }, 200);
    //加入购物车
    $(".btn-addshopping").off("click").on("click", function () {
        if (detail.isLogin) {
            var baseAjax = {
                url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].ADDSHOPPINGCAR
            };
            var condition = {};
            condition.ShoppingCartInputListModel = [{
                ServiceId: $("#serviceName").attr("data-id"), //服务id
                Describe: $("#serviceName").text(), //描述
                Qty: 1, //数量
                Price: $("#price").text(), //单价
                IsMain: true, //是否主服务(内资公司注册)
                ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
                Type: 0, // 默认0
                Status: true // 默认true
            }];
            __WEBPACK_IMPORTED_MODULE_1__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
                var quantity = $(".go-shopping-car i").text();
                quantity = parseInt(quantity);
                quantity++;
                $(".go-shopping-car i").text(quantity);
                $(".go-shopping-car").show();
            });
        } else {
            var shoppingCar = JSON.parse(localStorage.getItem("shoppingcar")) || [];
            var obj = {
                ServiceId: $("#serviceName").attr("data-id"), //服务id
                Describe: $("#serviceName").text(), //描述
                Qty: 1, //数量
                Price: $("#price").text(), //单价
                marketPrice: $("#marketPrice").text(),
                IsMain: true, //是否主服务(内资公司注册)
                ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
                Type: 0, // 默认0
                Status: true // 默认true
            };
            var repeat = false;
            for (var i in shoppingCar) {
                if (obj.ServiceIdList == shoppingCar[i].ServiceIdList) {
                    var quantity = shoppingCar[i].Qty;
                    quantity = parseInt(quantity);
                    quantity++;
                    shoppingCar[i].Qty = quantity;
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                shoppingCar.push(obj);
            }
            localStorage.setItem("shoppingcar", JSON.stringify(shoppingCar));
            //页面购物车数量增加
            var quantity = $(".go-shopping-car i").text();
            quantity = parseInt(quantity);
            quantity++;
            $(".go-shopping-car i").text(quantity);
            $(".go-shopping-car").show();
        }
    });
    //立即购买
    $(".btn-buy").off("click").on("click", function () {
        var buyInfo = {
            ServiceId: $("#serviceName").attr("data-id"), //服务id
            Describe: $("#serviceName").text(), //描述
            Qty: 1, //数量
            Price: $("#price").text(), //单价
            IsMain: true, //是否主服务(内资公司注册)
            ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
            Type: 0, // 默认0
            Status: true // 默认true
        };
        sessionStorage.setItem("buyInfo", JSON.stringify(buyInfo));
        /**
         * 如果客户已经登录
         * orderStatus:1  客户未登录是购买跳过去的
         * orderStatus:2  客户未登录是购物车跳过去的
         * orderStatus:3  客户正常登录购买跳过去的
         * orderStatus:4  客户正常登录购物车跳过去的
         */
        if (detail.isLogin) {
            location.href = "/fillInOrder?orderStatus=3";
        } else {
            location.href = "/login?orderStatus=1";
        }
    });
});

/**
 * 获取评论列表
 */
function clickOption(code) {
    $.ajax({
        url: dataUrls + '/api/h5/GetCommentList',
        type: 'get',
        dataType: 'json',
        timeout: 6000,
        data: {
            code: code, //服务code
            pageIndex: 1, //页码（分页）
            pageSize: 9999 //条数
        },
        success: function success(data) {
            flags = false;
            console.log(data);
            var datas = data.Data.List;
            if (datas && datas.length > 0) {
                var categoryStr = function categoryStr(CommentCategoryStr) {
                    var emhtml = '';
                    if (CommentCategoryStr.length > 0) {
                        var _categoryStr = CommentCategoryStr.split(',');
                        for (var is = 0; is < _categoryStr.length; is++) {
                            var tmps = _categoryStr[is];
                            emhtml += '<em>' + tmps + '</em>';
                        }
                    }
                    return emhtml;
                };

                var wjicons = function wjicons(nums) {
                    var ihtml = '';
                    var is = 5 - nums;
                    for (var i = 0; i < nums; i++) {
                        ihtml += '<i></i>';
                    }
                    for (var m = 0; m < is; m++) {
                        ihtml += '<i class="active"></i>';
                    }
                    return ihtml;
                };

                var htmls = '<div class="items items1"><div class="itman"><span>{mobel}</span>\n                                <span>{wjicon}</span>\n                                <span>{times}</span></div>\n                            <div class="msgs">{contents}</div><div class="msbq">{CategoryStr}</div></div>';
                var tmphtml = '';

                for (var i = 0; i < datas.length; i++) {
                    var tmp = datas[i];
                    tmphtml += htmls.replace('{mobel}', tmp.Mobile).replace('{times}', tmp.CommentDate).replace('{contents}', tmp.CommentContent).replace('{wjicon}', wjicons(tmp.CommentPoint)).replace('{CategoryStr}', categoryStr(tmp.CommentCategoryStr));
                }
                $('.itemdserver').html(tmphtml);
            }
        }
    });
}

/***/ })

},[14]);