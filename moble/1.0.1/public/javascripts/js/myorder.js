// import fastclick from '../fastclick';
// import fontSize from '../fontSize';
import messagePromptBox from '../msgBox.js';
import { API } from '../api'
import md5 from 'md5';
import Common from '../commonAjax.js'

//定义当前页和每页页数、总数据量、状态全局变量
var pageCurrent = 1;
var pageSize = 5;
var status = -1;
var tabClickNum = '';
$(function() {
    bindClick();
    var pageTotal = parseInt($("main").attr("data-count"));
    //点击回退
    $(".goback i").off("click").on("click", function() {
        history.back();
    });
    //顶部导航选择切换
    $(".nav-tab-top li").on("click", function() {
        $(".nav-tab-top li").removeClass("active");
        $(this).addClass("active");
        tabClickNum = $(this).data('num');
        pageCurrent = 1;
        status = $.trim($(this).text()) == '全部' ? null : $(this).text();
        ajaxForm(false);
    });
    /**
     * 加载列表
     */
    function ajaxForm(flag) {
        let baseAjax = {
            url: API.ORDERLIST
        }
        let condition = {
            OrderStatus: status, //订单状态
            PageIndex: pageCurrent, //当前页（分页）
            PageSize: pageSize, //每页条数（分页）
        }
        Common.ajax(baseAjax, condition, function(res) {
            if (res.Data.List) {
                pageTotal = Math.ceil(res.Data.TotalCount / pageSize);
                var data = res.Data.List;
                // console.log(res);
                var htmlstr = '';
                for (let item in data) {
                    htmlstr += '<section class="order-list" data-id="' + data[item].OrderID + '" data-price="' + (data[item].OrderPrice || 0) + '">' +
                        '<div class="order-list-header">' +
                        '<span>订单编号&nbsp;&nbsp;</span><span class="order-no">' + data[item].OrderNo + '</span>';
                    if (data[item].OrderStatus == '办理中') {
                        htmlstr += '<span class="float-right color-red">' + data[item].OrderStatus + '</span>';
                    } else {
                        htmlstr += '<span class="float-right">' + data[item].OrderStatus + '</span>';
                    }
                    htmlstr += '</div>';
                    for (var index in data[item].DetailList) {
                        htmlstr += '<div class="order-list-content" data-id="' + data[item].DetailList[index].OrderDetailID + '">' +
                            '<div class="list-content">' +
                            '<div class="cols5 float-left">' +
                            '<span class="order-list-title">' + data[item].DetailList[index].ServiceName + '</span></div>' +
                            '<div class="cols2 float-left">' +
                            '<span class="order-list-quantity">X&nbsp;' + data[item].DetailList[index].Count + '</span></div>' +
                            '<div class="cols3 float-left">' +
                            '<p class="text-right" style="margin-bottom:.02rem;">' +
                            '<span class="color-red fweight600">￥' + data[item].DetailList[index].DiscountPrice + '</span></p>' +
                            '<p class="text-right">' +
                            '<span class="fweight600 inlinethrough">￥' + data[item].DetailList[index].DisplayPrice + '</span></p></div></div>' +
                            '<div class="clearboth"></div>';
                    }
                    htmlstr += '<div class="order-list-operate text-right">' +
                        '共' + data[item].Count + '项服务&nbsp;<span class="order-pay-title">合计:</span><span class="color-red fweight600">￥' + (data[item].OrderPrice || 0.00) + '</span></div>' +
                        '<div class="order-list-operate text-right">';

                    if ($.trim(data[item].PayStatus) == "未付款" && $.trim(data[item].OrderStatus) != "已取消") {
                        htmlstr += '<span class="float-right btn btn-danger btn-pay ml10 gopays-btn" style="margin-top:0.04rem"><a href="javascript:void(0);">去付款</a></span><span class="float-right btn btn-default cancel-btn ml10" style="margin-top:0.04rem"><a href="javascript:void(0);">取消订单</a></span>';
                    }
                    if (($.trim(data[item].OrderStatus) == "待评价" || $.trim(data[item].IsEvaluate == false)) && $.trim(data[item].PayStatus) != "未付款") {
                        htmlstr += '<span class="float-right btn btn-danger qupinjia-btn" style="margin-top:0.04rem"><a href="javascript:void(0);">去评价</a></span>';
                    }

                    htmlstr += '</div></div>';
                    htmlstr += '</section>';
                }
                if (flag) {
                    $("main").append(htmlstr);
                } else {
                    $("main").empty();
                    $("main").html(htmlstr);
                }
                bindClick();
            }
        })
    };
    /**
     * 滑动加载更多
     */
    window.scroll(0, 0);
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
        var scrollHeight = $(document).height(); //当前页面的总高度
        var clientHeight = $(this).height(); //当前可视的页面高度
        if (scrollTop + clientHeight >= scrollHeight) {
            if (pageCurrent < pageTotal) {
                pageCurrent++;
                ajaxForm(true);
                // console.log(true);
            }
        } else if (scrollTop <= 0) {
            // console.log('0');
        }
    });

});

function bindClick() {
    //点击进入订单详情
    $("main .list-content").off('click').on("click", function() {
        location.href = '/orderdetails?id=' + $(this).parents("section").attr("data-id");
    });
    //取消订单
    // $("main").delegate(".cancel-btn", "click", function() {
    //     let $this = $(this).parents("section");
    //     messagePromptBox.comFirmMsg(0, "确定取消订单吗？", "确定", "取消", function() {
    //         let baseAjax = {
    //             url: API.CANCELORDER
    //         }
    //         let condition = {
    //             OrderID: $this.attr("data-id")
    //         }
    //         Common.ajax(baseAjax, condition, function(res) {
    //             if (res) {
    //                 messagePromptBox.tipMsgBox('订单已取消', 1000);
    //                 $this.remove();
    //             }
    //         })
    //     }, function() {
    //         // alert("点击了取消按钮");
    //     });
    // });
    $('main .cancel-btn').off('click').on('click', function() {
        let $this = $(this).parents("section");
        messagePromptBox.comFirmMsg(0, "确定取消订单吗？", "确定", "取消", function() {
            let baseAjax = {
                url: API.CANCELORDER
            }
            let condition = {
                OrderID: $this.attr("data-id")
            }
            Common.ajax(baseAjax, condition, function(res) {
                if (res) {
                    messagePromptBox.tipMsgBox('订单已取消', 1000);
                    $this.remove();
                }
            })
        }, function() {
            // alert("点击了取消按钮");
        });
    });
    //去评价按钮点击
    // $("main").delegate(".btn-assess", "click", function() {
    //     location.href = '/assess?id=' + $(this).parents("section").attr("data-id");
    // });
    $('.qupinjia-btn').off('click').on('click', function() {
        location.href = '/assess?id=' + $(this).parents("section").attr("data-id");
    });


    //去付款按钮点击
    // $(".order-list").delegate(".btn-pay", "click", function() {
    //     localStorage.setItem("orderNo", $(this).parents("section").attr("data-id"));
    //     //存储数据给结算
    //     let $con = $(this).parents("section").find(".order-list-title");
    //     let bodyTitle = [];
    //     let Totlafees = $(this).parents("section").attr("data-price") || 0;
    //     for (let i = 0; i < $con.length; i++) {
    //         bodyTitle.push($con.eq(i).text());
    //     }
    //     localStorage.setItem("bodyDetail", bodyTitle);
    //     localStorage.setItem("bodyTitle", bodyTitle);
    //     localStorage.setItem("Totlafees", Totlafees);
    //     location.href = '/wxaliPays/';
    // });
    $('main .btn-pay').off("click").on('click', function() {
        localStorage.setItem("orderNo", $(this).parents("section").attr("data-id"));
        //存储数据给结算
        let $con = $(this).parents("section").find(".order-list-title");
        let bodyTitle = [];
        let Totlafees = $(this).parents("section").attr("data-price") || 0;
        for (let i = 0; i < $con.length; i++) {
            bodyTitle.push($con.eq(i).text());
        }
        localStorage.setItem("bodyDetail", bodyTitle);
        localStorage.setItem("bodyTitle", bodyTitle);
        localStorage.setItem("Totlafees", Totlafees);
        location.href = '/wxaliPays/';
    });
}