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
    }
}
new found().init();