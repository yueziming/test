import fastclick from '../fastclick';
import '../fontSize';
import '../msgBox';
fastclick.attach(document.body);
class found {
    init() {
        //底部导航跳转 start
        let nums = localStorage.getItem("nums") || 0;
        let spli = window.location.href.slice(-5);
        if (spli == 'serve') {
            nums = 1;
        } else if (spli == 'found') {
            nums = 2;
        } else if (spli == 'yword') {
            nums = 3;
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
        //底部导航跳转 end
        /**
         * 我的子页跳转
         */
        $('.content span').on('click', function() {
                if (localStorage.getItem('userID')) {
                    if ($(this).index() !== 0) {
                        let Hrefs = $(this).data('name');
                        Hrefs != undefined ? (window.location.href = Hrefs) : '';
                    };
                } else {
                    location.href = '/login';
                }

            })
            /**
             * 我的订单跳转
             */
        $('.my-order').off('click').on('click', function() {
            location.href = '/myorder';
        })
    }
}
new found().init();