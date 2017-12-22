webpackJsonp([1],{

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__msgBox_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__commonAjax_js__);





$(function () {
    // Common.isLogin();
    var isLogin = false;
    //如果没有登录用本地存储刷新
    __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.isLogin(function (res) {
        if (!res) {
            isLogin = false;
            var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
            if (!shoppingcar || shoppingcar.length == 0) {
                //购物车空空如也
                $("main").html('<section class="empty-car"><p style="margin-bottom:.1rem;"><img src="./images/empty-box.png"></p><p style="font-size:.14rem;">购物车空空如也!</p></section>');
                $("footer").hide();
            } else {
                var htmlStr = '<section class="empty-car"><p style="margin-bottom:.1rem;"><img src="./images/empty-box.png"></p><p style="font-size:.14rem;">购物车空空如也!</p></section>';
                htmlStr += "";
                for (var i = 0; i < shoppingcar.length; i++) {
                    htmlStr += '<section class="order-list" data-id="' + shoppingcar[i].ServiceIdList + '">' + '<div class="order-check"><span class="icheck"></span></div><div class="order-list-content">' + '<div class="list-content"><div class="cols5 float-left"><span class="order-list-title">' + shoppingcar[i].Describe + '</span></div><div class="cols2 float-left"></div><div class="cols3 float-left">' + '<p class="text-right" style="margin-bottom:.02rem;"><span class="color-red">￥' + '<span class="pay-item" data-price="' + shoppingcar[i].Price + '">' + (shoppingcar[i].Price * shoppingcar[i].Qty).toFixed(2) + '</span></span>' + '</p><p class="text-right"><span class="inlinethrough">￥<span class="old-price" data-price="' + shoppingcar[i].marketPrice + '">' + (shoppingcar[i].marketPrice * shoppingcar[i].Qty).toFixed(2) + '</span></span></p></div></div><p class="order-cal-quantity"><span>数量：' + '</span><span class="show-quantity">X' + shoppingcar[i].Qty + '</span><span class="btn-plus"><a href="javascript:void(0);"></a></span>' + '<input type="text" class="input-quantity" value="' + shoppingcar[i].Qty + '" style="width:.6rem;height:.2rem;box-sizing:border-box;text-align:center;" disabled/>' + '<span class="btn-minus"><a href="javascript:void(0);"></a></span></p></div></section>';
                }
                $("main").html(htmlStr);
            }
            showEmptyCar();
        } else {
            isLogin = true;
        }
    });
    //点击回退
    $(".goback i").off("click").on("click", function () {
        // history.back();
        location.href = "/";
    });
    //加载后计算一次总金额
    calcTotal();
    //点击了编辑按钮
    $(".edit-menu").off("click").on("click", function () {
        var selectText = $.trim($(this).text()) || '';
        if (selectText == "编辑") {
            $(this).text("完成");
            $(this).addClass("deal");
            //将数量隐藏
            $(".show-quantity").css("display", "none");
            //展示按钮和input
            $("input").css("display", "inline-block");
            $(".btn-plus").css("display", "inline-block");
            $(".btn-minus").css("display", "inline-block");
            //显示删除按钮，隐藏去结算按钮
            $(".deal-acount").addClass("dsn");
            $(".del-item").removeClass("dsn");
            if ($(".deal-acount").hasClass("dsn")) {
                judgeDelActive($(".icheck.checked").length);
            }
        } else {
            $(this).text("编辑");
            $(this).removeClass("deal");
            //将数量显示
            $(".show-quantity").css("display", "inline-block");
            //隐藏按钮和input
            $("input").css("display", "none");
            $(".btn-plus").css("display", "none");
            $(".btn-minus").css("display", "none");
            //显示删除按钮，隐藏去结算按钮
            $(".deal-acount").removeClass("dsn");
            $(".del-item").removeClass("active");
            $(".del-item").addClass("dsn");
            //更新购物车数据
            var $con = $(".order-list");
            if (isLogin) {
                var baseAjax = {
                    url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].UPDATESHOPPINGCAR
                };
                var condition = {};
                condition.UpdateShoppingCartInputListModel = [];
                for (var i = 0; i < $con.length; i++) {
                    var obj = {};
                    obj.ServiceIdList = $con.eq(i).attr("data-id");
                    obj.Qty = $con.eq(i).find(".input-quantity").val();
                    condition.UpdateShoppingCartInputListModel.push(obj);
                }
                __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
                    console.log(res);
                    calcTotal();
                });
            } else {
                var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
                var temp = [];
                for (var _i = 0; _i < $con.length; _i++) {
                    var _obj = {};
                    _obj.ServiceIdList = $con.eq(_i).attr("data-id");
                    _obj.Qty = $con.eq(_i).find(".input-quantity").val();
                    temp.push(_obj);
                }
                for (var _i2 = 0; _i2 < shoppingcar.length; _i2++) {
                    for (var j = 0; j < temp.length; j++) {
                        if (shoppingcar[_i2].ServiceIdList == temp[j].ServiceIdList) {
                            shoppingcar[_i2].Qty = temp[_i2].Qty;
                            calcTotal();
                        }
                    }
                }
            }
        }
    });
    //全选
    $("footer").delegate("footer .order-check2", "click", function () {
        if ($(this).find(".icheck").hasClass("allchecked")) {
            $(this).find(".icheck").removeClass("allchecked");
            $("main .icheck").removeClass("checked");
        } else {
            $(this).find(".icheck").addClass("allchecked");
            $("main .icheck").addClass("checked");
        }
        if ($(".deal-acount").hasClass("dsn")) {
            judgeDelActive($(".icheck.checked").length);
        }
        calcTotal();
    });
    //单选
    $("main").delegate("main .order-check", "click", function () {
        if ($(this).find(".icheck").hasClass("checked")) {
            $(this).find(".icheck").removeClass("checked");
        } else {
            $(this).find(".icheck").addClass("checked");
        }
        if ($(".deal-acount").hasClass("dsn")) {
            judgeDelActive($(".icheck.checked").length);
        }
        calcTotal();
    });
    //判断删除按钮是否被激活
    function judgeDelActive(num) {
        if (num > 0) {
            $(".del-item").addClass("active");
        } else {
            $(".del-item").removeClass("active");
        }
    }
    //计算总金额
    function calcTotal() {
        var totalPay = 0;
        var checkLength = $(".icheck.checked").length;
        var $checkItem = $(".icheck.checked").parents("section").find(".pay-item");
        for (var i = 0; i < checkLength; i++) {
            totalPay += parseFloat($checkItem.eq(i).text());
        }
        // $.each($(".icheck.checked"),()=>{
        //     totalPay += parseFloat($(this).parents("section").find(".pay-item").text());
        // })
        $(".total-pay").text(totalPay.toFixed(2));
    }
    //加、减按钮点击事件
    $("main").delegate(".btn-plus", "click", function () {
        var $opContent = $(this).parents(".order-list-content");
        calPrice($opContent, 1);
    });
    $("main").delegate(".btn-minus", "click", function () {
        var $opContent = $(this).parents(".order-list-content");
        calPrice($opContent, 2);
    });
    //加减按钮点击后计算小条目价格
    function calPrice($opContent, num) {
        if (num === 1) {
            var quantity = parseInt($opContent.find(".input-quantity").val());
            var price = $opContent.find(".pay-item").attr("data-price");
            var old = $opContent.find(".old-price").attr("data-price");
            $opContent.find(".input-quantity").val(++quantity);
            $opContent.find(".show-quantity").text("X" + quantity);
            var pay = parseFloat(price * quantity).toFixed(2);
            var oldPrice = parseFloat(old * quantity).toFixed(2);
            $opContent.find(".pay-item").text(pay);
            $opContent.find(".old-price").text(oldPrice);
        } else {
            var _quantity = parseInt($opContent.find(".input-quantity").val());
            var _price = $opContent.find(".pay-item").attr("data-price");
            var _old = $opContent.find(".old-price").attr("data-price");
            if (_quantity > 1) {
                $opContent.find(".input-quantity").val(--_quantity);
                $opContent.find(".show-quantity").text("X" + _quantity);
                var _pay = parseFloat(_price * _quantity).toFixed(2);
                var _oldPrice = parseFloat(_old * _quantity).toFixed(2);
                $opContent.find(".pay-item").text(_pay);
                $opContent.find(".old-price").text(_oldPrice);
            }
        }
        calcTotal();
    }
    //删除事件
    $(".order-check4").delegate(".del-item", "click", function () {
        if ($(this).hasClass("active")) {
            var $con = $(".icheck.checked").closest("section");
            if (isLogin) {
                var baseAjax = {
                    url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].DELSHOPPINGCAR
                };
                var condition = {};
                condition.DeleteShoppingCartInputListModel = [];
                for (var i = 0; i < $con.length; i++) {
                    var obj = {};
                    obj.ServiceIdList = $con.eq(i).attr("data-id");
                    condition.DeleteShoppingCartInputListModel.push(obj);
                }
                __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
                    console.log(res);
                    $con.remove();
                    showEmptyCar();
                    __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default.a.tipMsgBox('已成功删除' + $con.length + '件商品', 1000);
                    calcTotal();
                });
            } else {
                var shoppingcar = JSON.parse(localStorage.getItem("shoppingcar"));
                for (var _i3 = 0; _i3 < shoppingcar.length; _i3++) {
                    if ($con.eq(_i3).attr("data-id") == shoppingcar[_i3].ServiceIdList) {
                        shoppingcar.splice(_i3, 1);
                        $con.remove();
                        showEmptyCar();
                        calcTotal();
                        break;
                    }
                }
            }
            showEmptyCar();
        }
    });
    // 无类目时显示空购物车
    function showEmptyCar() {
        if ($(".order-list").length == 0) {
            //空购物车显示
            $(".empty-car").show();
            //隐藏编辑按钮
            $(".edit-menu").css("display", "none");
            //隐藏footer
            $("footer").css("display", "none");
        } else {
            $(".empty-car").hide();
            $(".edit-menu").css("display", "inline-block");
            $("footer").css("display", "block");
        }
    }
    //去结算按钮点击
    /**
     * 如果客户已经登录
     * orderStatus:1  客户未登录是购买跳过去的
     * orderStatus:2  客户未登录是购物车跳过去的
     * orderStatus:3  客户正常登录购买跳过去的
     * orderStatus:4  客户正常登录购物车跳过去的
     */
    $(".deal-acount").off("click").on("click", function () {
        if ($(".icheck.checked").length > 0) {
            var $con = $(".icheck.checked").parents("section");
            var shopping = [];
            for (var i = 0; i < $con.length; i++) {
                var obj = {};
                obj.ServiceIdList = $con.eq(i).attr("data-id");
                obj.Describe = $con.eq(i).find(".order-list-title").text();
                obj.Price = $con.eq(i).find(".pay-item").text();
                obj.Qty = $con.eq(i).find(".input-quantity").val();
                shopping.push(obj);
            }
            localStorage.setItem("shoppingcarGo", JSON.stringify(shopping));
            if (isLogin) {
                location.href = "/fillInOrder?orderStatus=4";
            } else {
                location.href = "/login?orderStatus=2";
            }
        } else {
            __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default.a.tipMsgBox('当前没有选中任何商品', 1000);
        }
    });
    showEmptyCar();
});

/***/ })

},[33]);