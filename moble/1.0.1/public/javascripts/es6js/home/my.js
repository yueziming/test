webpackJsonp([12],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);

var found = function () {
    function found() {
        _classCallCheck(this, found);
    }

    _createClass(found, [{
        key: 'init',
        value: function init() {
            //底部导航跳转 start
            var nums = localStorage.getItem("nums") || 0;
            var spli = window.location.href.slice(-5);
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
            $('.div').on("click", function () {
                var _self = $(this),
                    hrefs = _self.data('href'),
                    nums = _self.data('nums');
                localStorage.setItem("nums", nums);
                window.location.href = hrefs;
            });
            //底部导航跳转 end
            /**
             * 我的子页跳转
             */
            $('.content span').on('click', function () {
                if (localStorage.getItem('userID')) {
                    if ($(this).index() !== 0) {
                        var Hrefs = $(this).data('name');
                        Hrefs != undefined ? window.location.href = Hrefs : '';
                    };
                } else {
                    location.href = '/login';
                }
            });
            /**
             * 我的订单跳转
             */
            $('.my-order').off('click').on('click', function () {
                location.href = '/myorder';
            });
        }
    }]);

    return found;
}();

new found().init();

/***/ })

},[22]);