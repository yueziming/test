webpackJsonp([7],{

/***/ 27:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uploadfile__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_md5__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var dataParam = { 'url': '', 'type': 'post', 'dataType': 'json', 'list': {} };
var picturedata = void 0;

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            var thin = this;
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });

            $('.line1 .inputImg').on('click', function () {
                $('.inputImg').on('change', function () {
                    thin.uploadImg(this, function (photoUrl) {
                        thin.ajaxFun(photoUrl, function (res) {
                            console.log(res);
                        });
                    });
                });
            });
            dataParam.id = localStorage.getItem('userID');
            dataParam.token = localStorage.getItem('token');
            dataParam.url = '/H5personInfo';
            __WEBPACK_IMPORTED_MODULE_3__baseAjax__["a" /* reqAjax */].sig(true, dataParam, function (res) {
                thin.setMsgDetils(res);
            });
            $('.line2').on('click', function () {
                if ($(this).data('name') != 'Mobile') {
                    location.href = '/editPerson?flagnum=' + $(this).index() + $(this).data('name') + '#=' + $(this).children().text();
                }
            });
        }
    }, {
        key: 'setMsgDetils',
        value: function setMsgDetils(data) {
            if (data.ResultCode == 2100 || data.ResultCode == 2200 || data.ResultCode == 2300) {
                localStorage.clear();
                location.href = '/login';
            }
            if (data.Data && data.Data.ObjDetail) {
                var datas = data.Data.ObjDetail;
                $('.name').html(datas.Name).parent().attr('data-name', 'Name');
                var IsMale = datas.IsMale == 0 ? '女' : '男';
                $('.sex').html(IsMale).parent().attr('data-name', 'IsMale');
                $('.tel').html(datas.Mobile).parent().attr('data-name', 'Mobile');
                $('.qq').html(datas.QQ).parent().attr('data-name', 'QQ');
                $('.email').html(datas.Email).parent().attr('data-name', 'Email');
                var isPhoto = datas.Photo && datas.Photo || '';
                $('.backimg').attr('style', isPhoto != '' ? "background-image:url(" + datas.Photo + ")" : '').parent().parent().attr('data-name', 'Photo');
            }
        }
    }, {
        key: 'ajaxFun',
        value: function ajaxFun(picturedata, callback) {
            dataParam.url = '/api/Member/UpdateOneColumn';
            dataParam.list = {
                condition: {
                    MemberID: localStorage.getItem('userID'), //客户ID
                    ColumnName: 'PhotoURL', //字段名称
                    ColumnValue: picturedata //字段值
                }
            };
            var times = new Date().getTime();
            var nonce = Math.random();
            var addData = {
                'signature': signature(times), // 签名 '',
                'memberID': localStorage.getItem('userID') || '', // 用户ID
                'timestamp': times, // 时间戳  
                'nonce': nonce // 随机数  
            };
            for (var key in addData) {
                dataParam.list[key] = addData[key];
            }

            function signature(thisTimes) {
                var strins = thisTimes + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase();
                var arrayList = strins.split('');
                var sortList = arrayList.sort(function (a, b) {
                    return a.localeCompare(b);
                });
                var sortString = sortList.join('');
                var md5String = __WEBPACK_IMPORTED_MODULE_5_md5___default()(sortString).toUpperCase();
                return md5String;
            }
            $.ajax({
                url: dataUrls + dataParam.url,
                type: 'post',
                dataType: 'json',
                ContentType: "application/json",
                data: dataParam.list,
                success: function success(res) {
                    if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                        localStorage.clear();
                        location.href = '/login';
                    }
                    callback && callback(res);
                },
                complete: function complete() {}
            });
        }
    }, {
        key: 'uploadImg',

        /**
         * 上传图片
         * @param {*DOME元素} eElem 
         */
        value: function uploadImg(eElem, callback) {
            $('.mask').css('display', 'block');
            $('.mask div').css('opacty', 1).text('正在上传...');
            Object(__WEBPACK_IMPORTED_MODULE_4__uploadfile__["a" /* uploadfile */])(eElem, function (result) {
                var thisUrl = result.url || upSplitFile(result);
                $('.backimg').css({ "background-image": " url(" + thisUrl + ")" });
                // picturedata = thisUrl;
                $('.mask div').text('上传完成');
                setTimeout(function () {
                    $('.mask').css('display', 'none');
                }, 1000);
                callback && callback(thisUrl);
            });
            /**
             * 上传重复时，切割图片寻找地址
             * @param { url } result 
             */
            function upSplitFile(result) {
                return result.res.requestUrls.join('').split('?')[0];
            }
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[27]);