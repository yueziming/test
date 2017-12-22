import '../msgBox';
import Common from '../commonAjax.js'
import { API } from '../api.js'
let flags = true;
$(function() {
    let detail = {
        isLogin: false,
        getLogin:function(){
            let that = this;
            Common.isLogin(function(res){
                that.isLogin = res;
                that.init();
            })
        },
        init: function() {
            //如果有客户登录
            if (this.isLogin) {
                // this.isLogin = true;
                var baseAjax = {
                    url: API.GETSHOPPINGCARDATA
                }
                Common.ajax(baseAjax, {}, function(res) {
                    if (res && res.Data && res.Data.List && res.Data.List.length > 0) {
                        let counts = 0;
                        for (let i = 0; i < res.Data.List.length; i++) {
                            if (res.Data.List[i].IsMain) {
                                counts += res.Data.List[i].Qty;
                            }
                        }
                        $(".go-shopping-car i").text(counts);
                        $(".go-shopping-car").show();
                    } else {
                        $(".go-shopping-car").hide();
                    }
                })
            } else {
                this.isLogin = false;
                let res = JSON.parse(localStorage.getItem("shoppingcar"));
                if (res && res.length > 0) {
                    let counts = 0;
                    for (let i = 0; i < res.length; i++) {
                        counts += res[i].Qty;
                    }
                    $(".go-shopping-car i").text(counts);
                    $(".go-shopping-car").show();
                } else {
                    $(".go-shopping-car").hide();
                }
            }
        },
        bindclick() {
            $('.clickOption span').off('click').on('click', function() {
                let sleid = parseInt($(this).data('sleid'));
                $(this).addClass('active').siblings().removeClass('active');
                $('.bodys hgroup').eq(sleid).show().siblings().hide();
                let codes = window.location.search.substr(1).split("&name=")[0].substr(5);
                flags ? clickOption(codes) : "";
            });
        },
    }
    detail.getLogin();
    setTimeout(() => {
        detail.bindclick();
    }, 200);
    //加入购物车
    $(".btn-addshopping").off("click").on("click", function() {
        if (detail.isLogin) {
            let baseAjax = {
                url: API.ADDSHOPPINGCAR
            };
            let condition = {};
            condition.ShoppingCartInputListModel = [{
                ServiceId: $("#serviceName").attr("data-id"), //服务id
                Describe: $("#serviceName").text(), //描述
                Qty: 1, //数量
                Price: $("#price").text(), //单价
                IsMain: true, //是否主服务(内资公司注册)
                ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
                Type: 0, // 默认0
                Status: true, // 默认true
            }];
            Common.ajax(baseAjax, condition, function(res) {
                var quantity = $(".go-shopping-car i").text();
                quantity = parseInt(quantity);
                quantity++;
                $(".go-shopping-car i").text(quantity);
                $(".go-shopping-car").show();
            })
        } else {
            let shoppingCar = JSON.parse(localStorage.getItem("shoppingcar")) || [];
            let obj = {
                ServiceId: $("#serviceName").attr("data-id"), //服务id
                Describe: $("#serviceName").text(), //描述
                Qty: 1, //数量
                Price: $("#price").text(), //单价
                marketPrice: $("#marketPrice").text(),
                IsMain: true, //是否主服务(内资公司注册)
                ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
                Type: 0, // 默认0
                Status: true, // 默认true
            }
            let repeat = false;
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
    $(".btn-buy").off("click").on("click", function() {
        let buyInfo = {
            ServiceId: $("#serviceName").attr("data-id"), //服务id
            Describe: $("#serviceName").text(), //描述
            Qty: 1, //数量
            Price: $("#price").text(), //单价
            IsMain: true, //是否主服务(内资公司注册)
            ServiceIdList: $("#serviceName").attr("data-id"), //服务id列表
            Type: 0, // 默认0
            Status: true, // 默认true
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
        success: function(data) {
            flags = false;
            console.log(data);
            let datas = data.Data.List;
            if (datas && datas.length > 0) {
                let htmls = `<div class="items items1"><div class="itman"><span>{mobel}</span>
                                <span>{wjicon}</span>
                                <span>{times}</span></div>
                            <div class="msgs">{contents}</div><div class="msbq">{CategoryStr}</div></div>`;
                let tmphtml = '';

                function categoryStr(CommentCategoryStr) {
                    let emhtml = '';
                    if (CommentCategoryStr.length > 0) {
                        let categoryStr = CommentCategoryStr.split(',');
                        for (var is = 0; is < categoryStr.length; is++) {
                            var tmps = categoryStr[is];
                            emhtml += '<em>' + tmps + '</em>';
                        }
                    }
                    return emhtml;
                }

                function wjicons(nums) {
                    let ihtml = ``;
                    let is = 5 - nums;
                    for (var i = 0; i < nums; i++) {
                        ihtml += '<i></i>';
                    }
                    for (var m = 0; m < is; m++) {
                        ihtml += '<i class="active"></i>';
                    }
                    return ihtml
                }
                for (let i = 0; i < datas.length; i++) {
                    let tmp = datas[i];
                    tmphtml += htmls.replace('{mobel}', tmp.Mobile)
                        .replace('{times}', tmp.CommentDate)
                        .replace('{contents}', tmp.CommentContent)
                        .replace('{wjicon}', wjicons(tmp.CommentPoint))
                        .replace('{CategoryStr}', categoryStr(tmp.CommentCategoryStr))
                }
                $('.itemdserver').html(tmphtml);
            }
        }
    });
}