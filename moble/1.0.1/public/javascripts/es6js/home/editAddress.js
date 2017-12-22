webpackJsonp([19],{

/***/ 15:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_md5__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_md5__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






__WEBPACK_IMPORTED_MODULE_0__fastclick___default.a.attach(document.body);
var dataParam = { 'url': '', 'type': 'post', 'dataType': 'json' };
var addrssid = '';

var setting = function () {
    function setting() {
        _classCallCheck(this, setting);
    }

    _createClass(setting, [{
        key: 'init',
        value: function init() {
            var thin = this;
            dataParam.id = localStorage.getItem('userID');
            dataParam.token = localStorage.getItem('token');
            var addrssi = location.hash;
            addrssid = addrssi ? addrssi.split('=')[1] : '';
            $('.goback i').on('click', function () {
                window.history.go(-1);
            });
            _init_Data();
            if (location.hash) {
                $('.goback span').text('编辑地址');
                thin.edit(addrssid);
            }
            var flag = false;
            $('.line5 label').on('click', function () {
                flag = !flag;
                flag ? $(this).addClass('live') : $(this).removeClass('live');
            });
            this.bindClick();
        }
    }, {
        key: 'bindClick',
        value: function bindClick() {
            var _this = this;
            $('.sureBtn').on('click', function () {
                $('.sureBtn').off('click');
                dataParam.AddressID = addrssid;
                dataParam.ReceiverName = $('.name').val(); //联系人
                dataParam.Mobile = $('.tel').val(); // 电话
                dataParam.Province = $('#province').val(); // 省
                dataParam.City = $('#city').val(); //市
                dataParam.Country = $('#county').val(); //区
                dataParam.DetailAddress = $('.detailAddress').val(); //详细地址
                dataParam.url = '/editAddress';
                var numDefault = $('label').hasClass('live') ? 1 : 0;
                dataParam.IsDefaultAddress = numDefault;
                __WEBPACK_IMPORTED_MODULE_3__baseAjax__["a" /* reqAjax */].sig(true, dataParam, function (res) {
                    if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                        localStorage.clear();
                        location.href = '/login';
                    }
                    if (res.ResultCode == 6666) {
                        addrssid ? __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('编辑成功') : __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('新增成功');
                        // let search = location.search;
                        // let str = search.split(/\d/);
                        if (sessionStorage.getItem("search")) {
                            var search = sessionStorage.getItem("search");
                            sessionStorage.removeItem("search");
                            setTimeout(function () {
                                window.location.href = '/fillInOrder' + search;
                            }, 2000);
                        } else {
                            setTimeout(function () {
                                location.href = '/receiptAddress';
                            }, 2000);
                        }
                    } else {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox(res.Message);
                    }
                }, '', function (ress) {
                    _this.bindClick();
                });
            });
        }
    }, {
        key: 'edit',

        /**
         * 编辑
         */
        value: function edit(id) {
            var thin = this;
            thin.reqajax(id, function (res) {
                var info = res.Data.ObjDetail;
                if (info && info.ReceiverName) {
                    $('.name').val(info.ReceiverName); //联系人
                    $('.tel').val(info.Mobile); // 电话
                    // $('#province').val(info.Province); // 省
                    // $('#city').val(info.City); //市
                    // $('#county').val(info.Country); //区
                    $('.detailAddress').val(info.DetailAddress); //详细地址
                    _init_Update(info.Province, info.City, info.Country);
                    info.IsDefaultAddress == 1 ? $('.line5 label').addClass('live') : '';
                }
            });
        }
    }, {
        key: 'reqajax',
        value: function reqajax(data, callback) {
            var times = new Date().getTime();
            var nonce = Math.random();
            var addData = {
                'signature': signature(times), // 签名 '',
                'memberID': localStorage.getItem('userID') || '', // 用户ID
                'timestamp': times, // 时间戳  
                'nonce': nonce, // 随机数  
                condition: {
                    AddressID: data //地址ID
                }
            };

            function signature() {
                var strins = times + '' + nonce + '' + localStorage.getItem('userID').toUpperCase() + '' + localStorage.getItem('token').toUpperCase();
                var arrayList = strins.split('');
                var sortList = arrayList.sort(function (a, b) {
                    return a.localeCompare(b);
                });
                var sortString = sortList.join('');
                var md5String = __WEBPACK_IMPORTED_MODULE_4_md5___default()(sortString).toUpperCase();
                return md5String;
            }
            $.ajax({
                url: dataUrls + '/api/My/GetAddressByID',
                type: 'post',
                dataType: 'json',
                ContentType: "application/json",
                data: addData,
                success: function success(res) {
                    if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                        localStorage.clear();
                        location.href = '/login';
                    }
                    callback && callback(res);
                }
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[15]);