webpackJsonp([14],{

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__commonAjax_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_js__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);

var Homes = function () {
    function Homes() {
        _classCallCheck(this, Homes);
    }

    _createClass(Homes, [{
        key: 'init',
        value: function init() {
            var nums = localStorage.getItem("nums") || 0;
            var spli = window.location.href.slice(-5);
            if (spli == 'serve') {
                nums = 1;
            } else if (spli == 'found') {
                nums = 2;
            } else {
                nums = 0;
            }
            $('.div').eq(nums).addClass('active').siblings().removeClass('active');
            $('.div').on("click", function () {
                var _self = $(this),
                    hrefs = _self.data('href'),
                    nums = _self.data('nums');
                localStorage.setItem("nums", nums);
                window.location.href = hrefs;
            });
            this.bannerInit();
            this.hotInitSwip();
            this.swipersInit();
            $('.navBars div').off('click').on('click', function () {
                var thiaid = $(this).data('id');
                var thiaSel = $(this).data('isfg');
                localStorage.setItem('id', thiaid);
                window.location.href = thiaSel ? '/newList' : '/serve?id=' + thiaid;
            });
            this.scrollLoad(); // 滑动加载

            $('.clickHrefs').off('click').on('click', function () {
                var thisHrefs = $(this).data('hrefs');
                window.location.href = thisHrefs;
            });
            var that = this;
            __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.isLogin(function (res) {
                that.getShoppingcar(res);
            });
        }
    }, {
        key: 'getShoppingcar',
        value: function getShoppingcar(flag) {
            var isLogin = flag;
            //如果有客户登录或未登录读取购物车数据
            if (isLogin) {
                var baseAjax = {
                    url: __WEBPACK_IMPORTED_MODULE_4__api_js__["a" /* API */].GETSHOPPINGCARDATA
                };
                __WEBPACK_IMPORTED_MODULE_3__commonAjax_js___default.a.ajax(baseAjax, {}, function (res) {
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
                // this.isLogin = false;
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
        }
    }, {
        key: 'bannerInit',
        value: function bannerInit() {
            var swiper1 = new Swiper('#swp1', {
                autoplay: 5000, //可选选项，自动滑动
                pagination: '.swiper-pagination'
            });
        }
    }, {
        key: 'scrollLoad',
        value: function scrollLoad() {
            //滚动条到页面底部加载更多案例 
            var pageIndex = 2;
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
                var scrollHeight = $(document).height(); //当前页面的总高度
                var clientHeight = $(this).height(); //当前可视的页面高度
                if (scrollTop + clientHeight >= scrollHeight) {
                    $.ajax({
                        url: dataUrls + '/api/h5/NewsList?pageIndex=' + pageIndex,
                        type: 'get',
                        dataType: 'json',
                        timeout: 6000,
                        success: function success(data) {
                            var json = data;
                            var divTop = '<div class="tpItem">';
                            var isImg = '<a href="/entreneurship?id={id}&amp;name={title}"><div class="imgs" style="background-image:url(\'{backImg}\')"></div></a>';
                            var html = '\n                    <div class="rgts" style="">\n                        <a href="/entreneurship?id={id}&amp;name={title}"><h3>{title}</h3></a>\n                        <div class="btnspt">\n                            <div><span>{TypeName}</span><i>{PublishDate}</i></div>\n                            <div><i></i><span>{ScanViews}</span></div>\n                        </div>\n                    </div>\n                </div><hr/>';
                            if (json.Data.List.length > 0) {
                                var tempHtml = '',
                                    alist = json.Data.List;
                                for (var i in alist) {
                                    tempHtml += divTop;
                                    if (alist[i].PhotoURL) {
                                        tempHtml += isImg.replace('{id}', alist[i].NewsID).replace('{title}', alist[i].Title).replace('{backImg}', alist[i].PhotoURL);
                                    }
                                    tempHtml += html.replace('{id}', alist[i].NewsID).replace(/{title}/g, alist[i].Title).replace('{TypeName}', alist[i].TypeName).replace('{PublishDate}', alist[i].PublishDate).replace('{ScanViews}', alist[i].ScanViews);
                                }
                                $('.newssb .new-tps').append(tempHtml);
                                pageIndex++;
                            } else {
                                var ff = true;
                                $(window).unbind('scroll');
                                var tmpHtml = '<div class="tpItem" style=\'height: .3rem;font-size: .10rem;text-align: center;display: block;color: #acacac;\'>\u6CA1\u6709\u66F4\u591A\u4E86...</div>';
                                if (ff && $('.tpItem:last-child').text() !== '没有更多了...') {
                                    ff = false;
                                    $('.newssb .new-tps').append(tmpHtml);
                                }
                            }
                        }
                    });
                } else if (scrollTop <= 0) {
                    console.log('0');
                }
            });
        }
    }, {
        key: 'swipersInit',
        value: function swipersInit() {
            var $a = $(".gb_sb a");
            var $s = $(".gb_sb span");
            var cArr = ["p3", "p2", "p1"];
            var index = 0;
            //上一张
            function previmg() {
                cArr.unshift(cArr[2]);
                cArr.pop();
                $(".list li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                });
                index--;
                if (index < 0) {
                    index = 2;
                }
                show();
            }
            //下一张
            function nextimg() {
                cArr.push(cArr[0]);
                cArr.shift();
                $(".list li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                });
                index++;
                if (index > 2) {
                    index = 0;
                }
                show();
            }
            //通过底下按钮点击切换
            $a.each(function () {
                $(this).click(function () {
                    var myindex = $(this).index();
                    var b = myindex - index;
                    if (b == 0) {
                        return;
                    } else if (b > 0) {
                        var newarr = cArr.splice(0, b);
                        cArr = cArr.concat(newarr);
                        $(".list li").each(function (i, e) {
                            $(e).removeClass().addClass(cArr[i]);
                        });
                        index = myindex;
                        show();
                    } else if (b < 0) {
                        cArr.reverse();
                        var oldarr = cArr.splice(0, -b);
                        cArr = cArr.concat(oldarr);
                        cArr.reverse();
                        $(".list li").each(function (i, e) {
                            $(e).removeClass().addClass(cArr[i]);
                        });
                        index = myindex;
                        show();
                    }
                });
            });
            //改变底下按钮的背景色
            function show() {
                $($s).eq(index).addClass("active").parent().siblings().children().removeClass("active");
            }
            // 鼠标移入box时清除定时器
            // $(".box").mouseover(function() {
            //     clearInterval(timer);
            // });
            // 鼠标移出box时开始定时器
            // $(".box").mouseleave(function() {
            //     timer = setInterval(nextimg, 4000);
            // });
            // 进入页面自动开始定时器
            // timer = setInterval(nextimg, 4000);

            var startPosition, endPosition, deltaX, deltaY, moveLength;

            $(".qiehs .list").bind('touchstart', function (e) {
                var touch = e.touches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
            }).bind('touchmove', function (e) {
                var touch = e.touches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                deltaX = endPosition.x - startPosition.x;
                deltaY = endPosition.y - startPosition.y;
                moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
            }).bind('touchend', function (e) {
                //如果滑动距离太短
                if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
                    return result;
                }
                if (deltaX < 0) {
                    previmg();
                } else if (deltaX > 0) {
                    nextimg();
                }
            });
        }
    }, {
        key: 'hotInitSwip',
        value: function hotInitSwip() {
            setInterval(function () {
                var thisMar = $('#msgtipli').children().eq(0);
                $('#msgtipli').children().eq(0).remove();
                $('#msgtipli').append(thisMar);
            }, 3000);
        }
    }]);

    return Homes;
}();

new Homes().init();

/***/ })

},[20]);