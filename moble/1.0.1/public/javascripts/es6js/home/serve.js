webpackJsonp([3],{

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__baseAjax__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var pageNum = 0;
//滚动条到页面底部加载更多案例 
var pageIndex = 2;
var thisSelNum = 0; // 当前选择项
var searchpageIndex = 1;
var seleNum = ''; // 当前选择项 id
var clickMun = false;
var thsVal = '';

var serve = function () {
    function serve() {
        _classCallCheck(this, serve);
    }

    _createClass(serve, [{
        key: 'init',
        value: function init() {
            //底部导航跳转 start
            var _this = this;
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

            var titleContDiv = $('.title-content').find('div');
            var locaid = window.location.search.split('id=')[1] || localStorage.getItem('id') || '';
            var isFlag = false;

            if (locaid) {
                for (var i = 0; i < titleContDiv.length; i++) {
                    var m = titleContDiv[i];
                    if ($(m).data('id') == locaid) {
                        isFlag = true;
                        $('.title-content div').eq(i).addClass('active').siblings().removeClass('active');
                        $('.banner').hide().eq(i).show();
                        $('.serve-wrapper').hide().eq(i).show();
                    }
                }
            }

            if (!isFlag) {
                $('.title-content div').eq(0).click();
                $('.title-content div').eq(0).addClass('active').siblings().removeClass('active');
                $('.banner').hide().eq(0).show();
                $('.serve-wrapper').hide().eq(0).show();
            }

            $("#serverName").on('keypress', function (e) {
                var keycode = e.keyCode;
                var searchName = $(this).val();
                if (keycode == '13') {
                    e.preventDefault();
                    $('.searchs ul').hide();
                    $('.searchs h3').html('搜索结果');
                    $('.itemMain').show();
                    thsVal = $(this).val();
                    //请求搜索接口  
                    _this.searchTxt(thsVal);
                }
            });

            //顶部导航跳转 start
            $('.title-item').on('click', function () {
                $('.title-item').removeClass('active');
                $(this).addClass('active');
                var _self = $(this),
                    flagNum = _self.data('num') || 0,
                    thisID = _self.data('id');
                localStorage.setItem('id', thisID);
                $('.banner').css('display', 'none').eq(flagNum).css('display', 'block');
                $('.serve-wrapper').css('display', 'none').eq(flagNum).css('display', 'block');
            });
            //顶部导航跳转 end
            var that = this;
            $('.newsLsitTitle div').off('click').on('click', function () {
                $('.serve-tpItem').html('');
                $(window).scrollTop(0);
                $(window).off('scroll');
                pageNum = $(this).data('id');
                thisSelNum = $(this).data('num');
                $('.newsLsitArry').children().remove();
                $('.newsLsitTitle div').attr('data-pagenum', 1);
                that.ajaxFrom();
                setTimeout(function () {
                    that.scrollLoad(); // 滑动加载更多
                }, 25);
            });
            $('.header i').off('click').on('click', function () {
                $('#services,.header i').hide();
                $('header').addClass('noheader');
                $('#searchs,.header em,.header span').show();
            });
            $('.header em').off('click').on('click', function () {
                $('#searchs,.header em,.header span').hide();
                $('header').removeClass('noheader');
                $('#services,.header i').show();
                $('#searchs ul').show();
                $('#searchs .itemMain').hide();
                $('.searchs h3').html('大家都在搜');
                $('#serverName').val('');
            });
            this.scrollLoad(); // 滑动加载更多
        }
    }, {
        key: 'scrollLoad',

        /**
         * 滑动加载更多
         */
        value: function scrollLoad() {
            window.scroll(0, 0);
            var that = this;
            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
                var scrollHeight = $(document).height(); //当前页面的总高度
                var clientHeight = $(this).height(); //当前可视的页面高度
                if (scrollTop + clientHeight >= scrollHeight) {
                    var pathname = location.pathname;
                    pathname == 'newList' ? that.ajaxFrom() : that.searchTxt(thsVal);
                } else if (scrollTop <= 0) {
                    console.log('0');
                }
            });
        }
    }, {
        key: 'ajaxFrom',

        /**
         * 资讯列表数据请求
         */
        value: function ajaxFrom() {
            var pageIdx = void 0,
                that = this;
            var thisActivePage = $('.newsLsitTitle div');
            for (var s = 0; s < thisActivePage.length; s++) {
                var thpad = thisActivePage[s];
                if (thpad.getAttribute('class').indexOf('active') > 0) {
                    pageIdx = parseInt(thpad.dataset.pagenum);
                    seleNum = thpad.dataset.id;
                }
            }
            $.ajax({
                url: dataUrls + '/api/h5/GetNewsListByTypeID?pageIndex=' + pageIdx + '&typeID=' + seleNum,
                type: 'get',
                dataType: 'json',
                timeout: 6000,
                success: function success(data) {
                    var json = data;
                    var divTop = '{nsa}<div class="tpItem">';
                    var isImg = '<a href="/entreneurship?id={id}&amp;name={title}"><div class="imgs" style="background-image:url(\'{backImg}\')"></div></a>';
                    var html = '\n                            <div class="rgts" style="">\n                                <a href="/entreneurship?id={id}&amp;name={title}"><h3>{title}</h3></a>\n                                <div class="btnspt">\n                                    <div><span>{TypeName}</span><i>{PublishDate}</i></div>\n                                    <div><i></i><span>{ScanViews}</span></div>\n                                </div>\n                            </div>\n                        </div><hr/>';
                    if (json.Data.List.length > 0) {
                        var tempHtml = '',
                            alist = json.Data.List;
                        for (var i in alist) {
                            // 
                            tempHtml += divTop.replace('{nsa}', i == 0 ? '<hr style="margin-top: 0;"/>' : '');
                            if (alist[i].PhotoURL) {
                                tempHtml += isImg.replace('{id}', alist[i].NewsID).replace('{title}', alist[i].Title).replace('{backImg}', alist[i].PhotoURL);
                            }
                            tempHtml += html.replace('{id}', alist[i].NewsID).replace(/{title}/g, alist[i].Title).replace('{TypeName}', alist[i].TypeName).replace('{PublishDate}', alist[i].PublishDate).replace('{ScanViews}', alist[i].ScanViews);
                        }
                        $('.newsLsitArry').append(tempHtml);
                        pageIdx++;
                        $('.newsLsitTitle').find(".active").attr('data-pagenum', pageIdx);
                    } else {
                        $('.serve-tpItem').html('没有更多了...');
                        $(window).off('scroll');
                    }
                }
            });
        }
    }, {
        key: 'searchTxt',

        /**
         * 搜索
         */
        value: function searchTxt(_searchTxt) {
            $.ajax({
                url: dataUrls + '/api/H5/FetchSearchList',
                type: 'get',
                data: {
                    inputStr: _searchTxt,
                    pageIndex: searchpageIndex,
                    pageSize: 9999
                },
                timeout: 6000,
                success: function success(data) {
                    // searchpageIndex++;
                    var datas = data.Data.List;
                    if (datas && datas.length > 0) {
                        var hts = '<div class="items">\n                                    <a href=\'/details?code={Code}&name={title}\'>\n                                        <em>{pric}</em>\n                                        <h2 style=\'width: 70%;\'>{title}</h2><br>\n                                        <span>{description}</span>\n                                    </a>\n                                </div>';
                        var html = '';
                        for (var i = 0; i < datas.length; i++) {
                            var tmp = datas[i];
                            html += hts.replace('{pric}', tmp.ServiceDiscountAmount > 999999999 ? '面议' : '￥' + tmp.ServiceDiscountAmount + '起').replace(/{title}/g, tmp.ServiceName || '').replace('{description}', tmp.ServiceDescription || '').replace('{Code}', tmp.Code);
                        }
                        $('.itemMain').append(html);
                    }
                }
            });
        }
    }]);

    return serve;
}();

new serve().init();

/***/ })

},[31]);