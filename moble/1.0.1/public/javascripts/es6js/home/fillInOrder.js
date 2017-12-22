webpackJsonp([16],{

/***/ 18:
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
    var fillOrder = {
        // 初始化
        init: function init() {
            this.bindEvent();
            this.getAddress();
            this.getOrderInfo();
            this.calcTotal();
            //进入的时候清除search存储
            sessionStorage.removeItem("search");
        },
        //当前订单状态
        orderStatus: location.search.split("?orderStatus=")[1],
        //绑定事件
        bindEvent: function bindEvent() {
            var that = this;
            //点击回退
            $(".goback i").off("click").on("click", function () {
                // history.back();
                location.href = "/shoppingcar";
            });
            //点击选择地址
            $(".address").off("click").on("click", function () {
                location.href = "/receiptAddress";
            });
            //提交订单按钮点击
            $(".send-order-btn").off("click").on("click", function () {
                var baseAjax = {
                    url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].COMMITORDER
                };
                var condition = {};
                if (that.orderStatus == 1 || that.orderStatus == 3) {
                    var orderList = JSON.parse(sessionStorage.getItem("buyInfo"));
                    condition.OrderSubmitInputListModel = [{
                        ServiceIdList: orderList.ServiceIdList,
                        Qty: orderList.Qty,
                        AddressId: $(".address").attr("data-id")
                    }];
                } else if (that.orderStatus == 2 || that.orderStatus == 4) {
                    var _orderList = JSON.parse(localStorage.getItem("shoppingcarGo"));
                    condition.OrderSubmitInputListModel = [];
                    for (var i = 0; i < _orderList.length; i++) {
                        var obj = {};
                        obj.ServiceIdList = _orderList[i].ServiceIdList;
                        obj.Qty = _orderList[i].Qty;
                        obj.AddressId = $(".address").attr("data-id");
                        condition.OrderSubmitInputListModel.push(obj);
                    }
                }
                __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
                    if (res.Data && res.Data.IsSuccess) {
                        __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default.a.tipMsgBox('提交订单成功', 1000);
                        //存储数据给结算
                        var $con = $(".order");
                        var bodyTitle = [];
                        var Totlafees = $(".pay-total").text().slice(1) || 0;
                        for (var _i = 0; _i < $con.length; _i++) {
                            bodyTitle.push($con.eq(_i).find("p").eq(0).text());
                        }
                        localStorage.setItem("orderNo", res.Data.Result);
                        localStorage.setItem("bodyDetail", bodyTitle);
                        localStorage.setItem("bodyTitle", bodyTitle);
                        localStorage.setItem("Totlafees", Totlafees);
                        //清除sessionStorage和localstorage
                        sessionStorage.removeItem("buyInfo");
                        localStorage.removeItem("shoppingcar");
                        localStorage.removeItem("shoppingcarGo");
                        setTimeout(function () {
                            location.href = "/wxaliPays/";
                        }, 1000);
                    } else {
                        __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default.a.tipMsgBox('提交订单失败', 1000);
                    }
                });
            });
        },
        //获取地址
        getAddress: function getAddress() {
            var that = this;
            var baseAjax = {
                url: __WEBPACK_IMPORTED_MODULE_2__api_js__["a" /* API */].GETDEFAULTADDR
            };
            var condition = {
                MemberID: localStorage.getItem('userID')
            };
            __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
                if (res.Data && res.Data.List) {
                    if (res.Data.List.length > 0) {
                        var receiverInfo = res.Data.List[0].ReceiverName + "  " + res.Data.List[0].Mobile;
                        $(".receiver-info").text(receiverInfo);
                        $(".receiver-addr").text(res.Data.List[0].Address);
                        $(".address").attr("data-id", res.Data.List[0].AddressID);
                    } else {
                        //没有数据,跳转到填写收货地址页面
                        var search = location.search;
                        sessionStorage.setItem("search", search);
                        // location.href = '/editAddress'+search;
                    }
                } else {
                    __WEBPACK_IMPORTED_MODULE_0__msgBox_js___default.a.tipMsgBox('后台数据格式错误', 1000);
                }
                console.log(res);
            });
            // if(that.orderStatus)
        },
        //获取订单信息
        /**
         * 如果客户已经登录
         * orderStatus:1  客户未登录是购买跳过去的
         * orderStatus:2  客户未登录是购物车跳过去的
         * orderStatus:3  客户正常登录购买跳过去的
         * orderStatus:4  客户正常登录购物车跳过去的
         */
        getOrderInfo: function getOrderInfo() {
            var that = this;
            var htmlStr = "";
            $("#orderList").empty();
            var orderList = void 0;
            switch (that.orderStatus) {
                case '1':
                case '3':
                    orderList = JSON.parse(sessionStorage.getItem("buyInfo"));
                    htmlStr += '<div class="order" data-id="' + orderList.ServiceIdList + '"><p>' + orderList.Describe + '</p>' + '<p>￥<span class="price">' + parseFloat(orderList.Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList.Qty + '</span></i></div>';
                    $("#orderList").html(htmlStr);
                    break;
                case '2':
                case '4':
                    orderList = JSON.parse(localStorage.getItem("shoppingcarGo"));
                    for (var i = 0; i < orderList.length; i++) {
                        htmlStr += '<div class="order" data-id="' + orderList[i].ServiceIdList + '"><p>' + orderList[i].Describe + '</p>' + '<p>￥<span class="price">' + parseFloat(orderList[i].Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList[i].Qty + '</span></i></div>';
                    }
                    $("#orderList").html(htmlStr);
                    break;
            }
            // if (that.orderStatus == 1 || that.orderStatus == 3) {
            //     let orderList = JSON.parse(sessionStorage.getItem("buyInfo"));
            //     htmlStr += '<div class="order" data-id="' + orderList.ServiceIdList + '"><p>' + orderList.Describe + '</p>' +
            //         '<p>￥<span class="price">' + parseFloat(orderList.Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList.Qty + '</span></i></div>';
            //     $("#orderList").html(htmlStr);
            // } else if (that.orderStatus == 2 || that.orderStatus == 4) {
            //     let orderList = JSON.parse(localStorage.getItem("shoppingcarGo"));
            //     for (let i = 0; i < orderList.length; i++) {
            //         htmlStr += '<div class="order" data-id="' + orderList[i].ServiceIdList + '"><p>' + orderList[i].Describe + '</p>' +
            //             '<p>￥<span class="price">' + parseFloat(orderList[i].Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList[i].Qty + '</span></i></div>';
            //     }
            //     $("#orderList").html(htmlStr);
            // }
        },
        //计算总价格
        calcTotal: function calcTotal() {
            var that = this;
            var $con = $(".order");
            var total = 0;
            for (var i = 0; i < $con.length; i++) {
                var price = parseFloat($con.find(".price").eq(i).text());
                // let quantity = parseInt($con.find(".quantity").eq(i).text());
                total += price;
            }
            $(".pay-total").text("￥" + total.toFixed(2));
        }
    };
    fillOrder.init();
});

/***/ })

},[18]);