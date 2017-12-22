import fastclick from '../fastclick';
import '../fontSize';
import MsgInfo from '../msgBox';
fastclick.attach(document.body);

class setting {
    init() {
        $('.goback i').on('click', function() {
            window.history.go(-1);
        });
        $('.pay div').on('click', function() {
            if ($(this).indexof() == 0) {

            }
        })
    }
}
new setting().init();