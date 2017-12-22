import fastclick from '../fastclick';
import '../fontSize';
import '../msgBox';
import { reqAjax } from '../baseAjax';

fastclick.attach(document.body);
let pageNum = 0;
//滚动条到页面底部加载更多案例 
let pageIndex = 2;
let thisSelNum = 0; // 当前选择项
let searchpageIndex = 1;
let seleNum = ''; // 当前选择项 id
let clickMun = false;
let thsVal = '';

class serve {
    init() {
        //底部导航跳转 start
        let _this = this;
        let nums = localStorage.getItem("nums") || 0;
        let spli = window.location.href.slice(-5);
        if (spli == 'serve') {
            nums = 1;
        } else if (spli == 'found') {
            nums = 2;
        } else {
            nums = 0;
        }
        $('.div').eq(nums).addClass('active').siblings().removeClass('active');
        $('.div').on("click", function() {
            let _self = $(this),
                hrefs = _self.data('href'),
                nums = _self.data('nums');
            localStorage.setItem("nums", nums);
            window.location.href = hrefs;
        });

        let titleContDiv = $('.title-content').find('div');
        let locaid = window.location.search.split('id=')[1] || localStorage.getItem('id') || '';
        let isFlag = false;

        if (locaid) {
            for (let i = 0; i < titleContDiv.length; i++) {
                let m = titleContDiv[i];
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

        $("#serverName").on('keypress', function(e) {
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
        $('.title-item').on('click', function() {
            $('.title-item').removeClass('active');
            $(this).addClass('active');
            let _self = $(this),
                flagNum = _self.data('num') || 0,
                thisID = _self.data('id');
            localStorage.setItem('id', thisID);
            $('.banner').css('display', 'none').eq(flagNum).css('display', 'block');
            $('.serve-wrapper').css('display', 'none').eq(flagNum).css('display', 'block');
        });
        //顶部导航跳转 end
        let that = this;
        $('.newsLsitTitle div').off('click').on('click', function() {
            $('.serve-tpItem').html('');
            $(window).scrollTop(0);
            $(window).off('scroll');
            pageNum = $(this).data('id');
            thisSelNum = $(this).data('num');
            $('.newsLsitArry').children().remove();
            $('.newsLsitTitle div').attr('data-pagenum', 1);
            that.ajaxFrom();
            setTimeout(function() {
                that.scrollLoad(); // 滑动加载更多
            }, 25)
        });
        $('.header i').off('click').on('click', function() {
            $('#services,.header i').hide();
            $('header').addClass('noheader');
            $('#searchs,.header em,.header span').show();
        });
        $('.header em').off('click').on('click', function() {
            $('#searchs,.header em,.header span').hide();
            $('header').removeClass('noheader');
            $('#services,.header i').show();
            $('#searchs ul').show();
            $('#searchs .itemMain').hide();
            $('.searchs h3').html('大家都在搜');
            $('#serverName').val('');
        });
        this.scrollLoad(); // 滑动加载更多
    };
    /**
     * 滑动加载更多
     */
    scrollLoad() {
        window.scroll(0, 0);
        let that = this;
        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
            var scrollHeight = $(document).height(); //当前页面的总高度
            var clientHeight = $(this).height(); //当前可视的页面高度
            if (scrollTop + clientHeight >= scrollHeight) {
                let pathname = location.pathname;
                pathname == 'newList' ? that.ajaxFrom() : that.searchTxt(thsVal);
            } else if (scrollTop <= 0) {
                console.log('0');
            }
        });
    };
    /**
     * 资讯列表数据请求
     */
    ajaxFrom() {
        let pageIdx, that = this;
        let thisActivePage = $('.newsLsitTitle div');
        for (let s = 0; s < thisActivePage.length; s++) {
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
            success: function(data) {
                var json = data;
                let divTop = '{nsa}<div class="tpItem">';
                let isImg = `<a href="/entreneurship?id={id}&amp;name={title}"><div class="imgs" style="background-image:url('{backImg}')"></div></a>`;
                let html = `
                            <div class="rgts" style="">
                                <a href="/entreneurship?id={id}&amp;name={title}"><h3>{title}</h3></a>
                                <div class="btnspt">
                                    <div><span>{TypeName}</span><i>{PublishDate}</i></div>
                                    <div><i></i><span>{ScanViews}</span></div>
                                </div>
                            </div>
                        </div><hr/>`;
                if (json.Data.List.length > 0) {
                    let tempHtml = '',
                        alist = json.Data.List;
                    for (let i in alist) { // 
                        tempHtml += divTop.replace('{nsa}', ((i == 0) ? '<hr style="margin-top: 0;"/>' : ''));
                        if (alist[i].PhotoURL) {
                            tempHtml += isImg.replace('{id}', alist[i].NewsID)
                                .replace('{title}', alist[i].Title)
                                .replace('{backImg}', alist[i].PhotoURL)
                        }
                        tempHtml += html.replace('{id}', alist[i].NewsID)
                            .replace(/{title}/g, alist[i].Title)
                            .replace('{TypeName}', alist[i].TypeName)
                            .replace('{PublishDate}', alist[i].PublishDate)
                            .replace('{ScanViews}', alist[i].ScanViews);
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
    };
    /**
     * 搜索
     */
    searchTxt(searchTxt) {
        $.ajax({
            url: dataUrls + '/api/H5/FetchSearchList',
            type: 'get',
            data: {
                inputStr: searchTxt,
                pageIndex: searchpageIndex,
                pageSize: 9999
            },
            timeout: 6000,
            success: function(data) {
                // searchpageIndex++;
                let datas = data.Data.List;
                if (datas && datas.length > 0) {
                    let hts = `<div class="items">
                                    <a href='/details?code={Code}&name={title}'>
                                        <em>{pric}</em>
                                        <h2 style='width: 70%;'>{title}</h2><br>
                                        <span>{description}</span>
                                    </a>
                                </div>`;
                    let html = '';
                    for (let i = 0; i < datas.length; i++) {
                        let tmp = datas[i];
                        html += hts.replace('{pric}', (tmp.ServiceDiscountAmount > 999999999 ? '面议' : '￥' + tmp.ServiceDiscountAmount + '起'))
                            .replace(/{title}/g, tmp.ServiceName || '')
                            .replace('{description}', tmp.ServiceDescription || '')
                            .replace('{Code}', tmp.Code);
                    }
                    $('.itemMain').append(html);
                }
            },
        });
    };
}
new serve().init();