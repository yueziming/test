import fastclick from '../fastclick';
import '../fontSize';
import '../msgBox';
import Common from '../commonAjax.js'
import {API} from '../api.js'

fastclick.attach(document.body);
class Homes {
    init() {
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
        this.bannerInit();
        this.hotInitSwip();
        this.swipersInit();
        $('.navBars div').off('click').on('click', function() {
            let thiaid = $(this).data('id');
            let thiaSel = $(this).data('isfg');
            localStorage.setItem('id', thiaid);
            window.location.href = ((thiaSel) ? '/newList' : '/serve?id=' + thiaid);
        });
        this.scrollLoad(); // 滑动加载

        $('.clickHrefs').off('click').on('click', function() {
            let thisHrefs = $(this).data('hrefs');
            window.location.href = thisHrefs;
        });
        let that = this;
        Common.isLogin(function(res){
            that.getShoppingcar(res);
        })
    };
    getShoppingcar(flag){
        let isLogin = flag;
        //如果有客户登录或未登录读取购物车数据
        if(isLogin){
            var baseAjax = {
                url:API.GETSHOPPINGCARDATA
            }
            Common.ajax(baseAjax,{},function(res){
                if(res && res.Data && res.Data.List && res.Data.List.length >0){
                    let counts = 0;
                    for(let i=0;i<res.Data.List.length;i++){
                        if(res.Data.List[i].IsMain){
                            counts += res.Data.List[i].Qty;
                        }
                    }
                    $(".go-shopping-car i").text(counts);
                    $(".go-shopping-car").show();
                }else{
                    $(".go-shopping-car").hide();
                }
            })
        }else{
            // this.isLogin = false;
            let res = JSON.parse(localStorage.getItem("shoppingcar"));
            if(res && res.length >0){
                let counts = 0;
                for(let i=0;i<res.length;i++){
                    counts += res[i].Qty;
                }
                $(".go-shopping-car i").text(counts);
                $(".go-shopping-car").show();
            }else{
                $(".go-shopping-car").hide();
            }
        }
    };
    bannerInit() {
        let swiper1 = new Swiper('#swp1', {
            autoplay: 5000, //可选选项，自动滑动
            pagination: '.swiper-pagination'
        });
    };
    scrollLoad() {
        //滚动条到页面底部加载更多案例 
        let pageIndex = 2;
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
            var scrollHeight = $(document).height(); //当前页面的总高度
            var clientHeight = $(this).height(); //当前可视的页面高度
            if (scrollTop + clientHeight >= scrollHeight) {
                $.ajax({
                    url: dataUrls + '/api/h5/NewsList?pageIndex=' + pageIndex,
                    type: 'get',
                    dataType: 'json',
                    timeout: 6000,
                    success: function(data) {
                        var json = data;
                        let divTop = '<div class="tpItem">';
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
                            for (let i in alist) {
                                tempHtml += divTop;
                                if (alist[i].PhotoURL) {
                                    tempHtml += isImg.replace('{id}', alist[i].NewsID)
                                        .replace('{title}', alist[i].Title)
                                        .replace('{backImg}', alist[i].PhotoURL)
                                }
                                tempHtml += html.replace('{id}', alist[i].NewsID)
                                    .replace(/{title}/g, alist[i].Title)
                                    .replace('{TypeName}', alist[i].TypeName)
                                    .replace('{PublishDate}', alist[i].PublishDate)
                                    .replace('{ScanViews}', alist[i].ScanViews)
                            }
                            $('.newssb .new-tps').append(tempHtml);
                            pageIndex++;
                        } else {
                            let ff = true;
                            $(window).unbind('scroll');
                            let tmpHtml = `<div class="tpItem" style='height: .3rem;font-size: .10rem;text-align: center;display: block;color: #acacac;'>没有更多了...</div>`
                            if (ff && ($('.tpItem:last-child').text() !== '没有更多了...')) {
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
    };
    swipersInit() {
        var $a = $(".gb_sb a");
        var $s = $(".gb_sb span");
        var cArr = ["p3", "p2", "p1"];
        var index = 0;
        //上一张
        function previmg() {
            cArr.unshift(cArr[2]);
            cArr.pop();
            $(".list li").each(function(i, e) {
                $(e).removeClass().addClass(cArr[i]);
            })
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
            $(".list li").each(function(i, e) {
                $(e).removeClass().addClass(cArr[i]);
            })
            index++;
            if (index > 2) {
                index = 0;
            }
            show();
        }
        //通过底下按钮点击切换
        $a.each(function() {
                $(this).click(function() {
                    var myindex = $(this).index();
                    var b = myindex - index;
                    if (b == 0) {
                        return;
                    } else if (b > 0) {
                        var newarr = cArr.splice(0, b);
                        cArr = cArr.concat(newarr);
                        $(".list li").each(function(i, e) {
                            $(e).removeClass().addClass(cArr[i]);
                        })
                        index = myindex;
                        show();
                    } else if (b < 0) {
                        cArr.reverse();
                        var oldarr = cArr.splice(0, -b)
                        cArr = cArr.concat(oldarr);
                        cArr.reverse();
                        $(".list li").each(function(i, e) {
                            $(e).removeClass().addClass(cArr[i]);
                        })
                        index = myindex;
                        show();
                    }
                })
            })
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

        $(".qiehs .list").bind('touchstart', function(e) {
            var touch = e.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        }).bind('touchmove', function(e) {
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            };
            deltaX = endPosition.x - startPosition.x;
            deltaY = endPosition.y - startPosition.y;
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        }).bind('touchend', function(e) {
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
    };
    hotInitSwip() {
        setInterval(function() {
            let thisMar = $('#msgtipli').children().eq(0);
            $('#msgtipli').children().eq(0).remove();
            $('#msgtipli').append(thisMar);
        }, 3000);
    }
}
new Homes().init();