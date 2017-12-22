webpackJsonp([8],{

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__commonAjax_js__);





$(function () {
    //点击回退
    $(".goback i").off("click").on("click", function () {
        window.location.href = '/myorder';
    });
    var getDetail = function getDetail() {
        var baseAjax = {
            url: __WEBPACK_IMPORTED_MODULE_1__api__["a" /* API */].ORDERDETAIL
        };
        var condition = {
            OrderID: location.search.split("?id=")[1] //订单状态
        };
        __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, condition, function (res) {
            if (res.Data.ObjDetail) {
                console.log(res.Data.ObjDetail);
                var data = res.Data.ObjDetail;
                //用户姓名、电话、地址
                $("#customer").text(data.ContactorReceiver);
                $("#mobileNo").text(data.MobileReceiver);
                $("#receiverAddr").text(data.Address);
                $("main").attr("data-id", data.OrderID);
                //订单信息
                $(".order-list").empty();
                if (data.DetailList) {
                    for (var i = 0; i < data.DetailList.length; i++) {
                        var html = '<div class="list-content">' + '<div class="cols5 float-left">' + '<span class="order-list-title">' + data.DetailList[i].ServiceName + '</span>' + '</div>' + '<div class="cols2 float-left">' + '<span class="order-list-quantity">X&nbsp;' + data.DetailList[i].Count + '</span>' + '</div>' + '<div class="cols3 float-left">' + '<p class="text-right" style="margin-bottom:.02rem;">' + '<span class="color-red fweight600">￥' + data.DetailList[i].DiscountPrice + '</span>' + '</p>' + '<p class="text-right">' + '<span class="fweight600 inlinethrough">￥' + data.DetailList[i].DisplayPrice + '</span>' + '</p>' + '</div>' + '</div>';
                        $(".order-list").append(html);
                    }
                }
                //订单编号
                $("#orderNo").text(data.OrderNo);
                $("#createTime").text(data.CreateTime);
                $("#invoice").text(data.CompanyName);
                data.CompanyName ? $("#invoice").text(data.CompanyName) : $("#invoice").parent().hide();
                data.TaxContent == 1 ? $("#invoiceContent").text("财务服务费") : data.TaxContent == 2 ? $("#invoiceContent").text("咨询服务费") : $("#invoiceContent").parent().hide();
                // $("#invoiceContent").text(data.TaxContent == 1 ? "财务服务费" : "咨询服务费");
                //服务合计、服务优惠、实际付款金额
                $("#totalPay").text("￥" + (data.DisplayPrice || 0.00));
                $("#infactPay").text("￥" + (data.OrderPrice || 0.00));
                var discountPrice = parseFloat(data.DisplayPrice - data.OrderPrice).toFixed(2);
                $("#discountPrice").text("-￥" + discountPrice);
            }
        });
    };
    getDetail();
    /**
     * 填写发票信息
     */
    $(".btn-invoice").off("click").on("click", function () {
        location.href = "/invoice?OrderID=" + ($("main").attr("data-id") || "");
    });
});

/***/ })

},[26]);