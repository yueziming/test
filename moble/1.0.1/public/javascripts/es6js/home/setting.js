webpackJsonp([2],{

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontSize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fontSize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgBox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__msgBox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__baseAjax__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });
            $('.exit').on('click', function () {
                var data = { url: '/loginOut' };
                __WEBPACK_IMPORTED_MODULE_4__baseAjax__["a" /* reqAjax */].sig(true, data, function (res) {
                    localStorage.clear();
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('退出成功');
                    setTimeout(function () {
                        location.href = '/';
                    }, 2000);
                });
                // $.ajax({
                //     url: dataUrls + '/api/My/Logout',
                //     type: 'post',
                //     dataType: 'json',
                //     ContentType: "application/json",
                //     data: addData,
                //     success: function(res) {
                //         localStorage.clear();
                //         MsgInfo.tipMsgBox('退出成功');
                //         window.close();
                //         setTimeout(function() {
                //             location.href = '/';
                //         }, 2000)
                //     },
                //     error: function(e) {
                //         MsgInfo.tipMsgBox(e.Message);
                //     }
                // });
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[32]);