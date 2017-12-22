import messagePromptBox from '../msgBox.js';
import md5 from 'md5';
import { API } from '../api.js';
import Common from '../commonAjax.js'

$(function() {
    let fillOrder = {
        // 初始化
        init: function() {
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
        bindEvent: function() {
            let that = this;
            //点击回退
            $(".goback i").off("click").on("click", function() {
                    // history.back();
                    location.href = "/shoppingcar";
                })
                //点击选择地址
            $(".address").off("click").on("click", function() {
                    location.href = "/receiptAddress";
                })
                //提交订单按钮点击
            $(".send-order-btn").off("click").on("click", function() {
                let baseAjax = {
                    url: API.COMMITORDER
                }
                let condition = {};
                if (that.orderStatus == 1 || that.orderStatus == 3) {
                    let orderList = JSON.parse(sessionStorage.getItem("buyInfo"));
                    condition.OrderSubmitInputListModel = [{
                        ServiceIdList: orderList.ServiceIdList,
                        Qty: orderList.Qty,
                        AddressId: $(".address").attr("data-id")
                    }];
                } else if (that.orderStatus == 2 || that.orderStatus == 4) {
                    let orderList = JSON.parse(localStorage.getItem("shoppingcarGo"));
                    condition.OrderSubmitInputListModel = [];
                    for (let i = 0; i < orderList.length; i++) {
                        let obj = {}
                        obj.ServiceIdList = orderList[i].ServiceIdList;
                        obj.Qty = orderList[i].Qty;
                        obj.AddressId = $(".address").attr("data-id");
                        condition.OrderSubmitInputListModel.push(obj);
                    }
                }
                Common.ajax(baseAjax, condition, function(res) {
                    if (res.Data && res.Data.IsSuccess) {
                        messagePromptBox.tipMsgBox('提交订单成功', 1000);
                        //存储数据给结算
                        let $con = $(".order");
                        let bodyTitle = [];
                        let Totlafees = $(".pay-total").text().slice(1) || 0;
                        for (let i = 0; i < $con.length; i++) {
                            bodyTitle.push($con.eq(i).find("p").eq(0).text());
                        }
                        localStorage.setItem("orderNo", res.Data.Result);
                        localStorage.setItem("bodyDetail", bodyTitle);
                        localStorage.setItem("bodyTitle", bodyTitle);
                        localStorage.setItem("Totlafees", Totlafees);
                        //清除sessionStorage和localstorage
                        sessionStorage.removeItem("buyInfo");
                        localStorage.removeItem("shoppingcar");
                        localStorage.removeItem("shoppingcarGo");
                        setTimeout(function() {
                            location.href = "/wxaliPays/";
                        }, 1000);
                    } else {
                        messagePromptBox.tipMsgBox('提交订单失败', 1000);
                    }
                })
            })
        },
        //获取地址
        getAddress: function() {
            let that = this;
            let baseAjax = {
                url: API.GETDEFAULTADDR
            }
            let condition = {
                MemberID: localStorage.getItem('userID')
            }
            Common.ajax(baseAjax, condition, function(res) {
                    if (res.Data && 　res.Data.List) {
                        if (res.Data.List.length > 0) {
                            let receiverInfo = res.Data.List[0].ReceiverName + "  " + res.Data.List[0].Mobile;
                            $(".receiver-info").text(receiverInfo);
                            $(".receiver-addr").text(res.Data.List[0].Address);
                            $(".address").attr("data-id", res.Data.List[0].AddressID)
                        } else { //没有数据,跳转到填写收货地址页面
                            let search = location.search;
                            sessionStorage.setItem("search", search);
                            // location.href = '/editAddress'+search;
                        }
                    } else {
                        messagePromptBox.tipMsgBox('后台数据格式错误', 1000);
                    }
                    console.log(res);
                })
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
        getOrderInfo: function() {
            let that = this;
            let htmlStr = "";
            $("#orderList").empty();
            let orderList;
            switch (that.orderStatus) {
                case '1':
                case '3':
                    orderList = JSON.parse(sessionStorage.getItem("buyInfo"));
                    htmlStr += '<div class="order" data-id="' + orderList.ServiceIdList + '"><p>' + orderList.Describe + '</p>' +
                        '<p>￥<span class="price">' + parseFloat(orderList.Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList.Qty + '</span></i></div>';
                    $("#orderList").html(htmlStr);
                    break;
                case '2':
                case '4':
                    orderList = JSON.parse(localStorage.getItem("shoppingcarGo"));
                    for (let i = 0; i < orderList.length; i++) {
                        htmlStr += '<div class="order" data-id="' + orderList[i].ServiceIdList + '"><p>' + orderList[i].Describe + '</p>' +
                            '<p>￥<span class="price">' + parseFloat(orderList[i].Price).toFixed(2) + '</span></p><i>×<span class="quantity">' + orderList[i].Qty + '</span></i></div>';
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
        calcTotal: function() {
            let that = this;
            let $con = $(".order");
            let total = 0;
            for (let i = 0; i < $con.length; i++) {
                let price = parseFloat($con.find(".price").eq(i).text());
                // let quantity = parseInt($con.find(".quantity").eq(i).text());
                total += price;
            }
            $(".pay-total").text("￥" + total.toFixed(2));
        }
    }
    fillOrder.init();
})