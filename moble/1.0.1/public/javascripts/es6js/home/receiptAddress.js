webpackJsonp([6],{

/***/ 28:
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

            // $('.line-cont').on('click', 'label', function() {
            //     console.log(111);
            //     $('label').removeClass('live');
            //     $(this).addClass('live');
            // });
            dataParam.id = localStorage.getItem('userID');
            dataParam.token = localStorage.getItem('token');
            dataParam.url = '/AddressList';
            __WEBPACK_IMPORTED_MODULE_3__baseAjax__["a" /* reqAjax */].sig(true, dataParam, function (res) {
                if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                    localStorage.clear();
                    location.href = '/login';
                }
                if (res.ResultCode == 6666) {
                    thin.setMsgDetils(res);
                }
            });
        }
    }, {
        key: 'setMsgDetils',
        value: function setMsgDetils(res) {
            var thin = this;
            var html = '<div class="line4">\n                <div class="up">\n                    <div>\n                        <span>{{ReceiverName}}</span><span>{{Mobile}}</span>\n                    </div>\n                    <div>\n                        <span>{{Address}}</span>\n                    </div>\n                </div>\n                <div class="down">\n                    <div><label data-id="{{AddressID}}"   class="{{lasb}}" for="{{default}}"><input type="radio" class="default" id="{{default}}" name="radi" value=""></label>\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u5730\u5740</div>\n                    <div><span data-id="{{AddressID}}" class="edit">\u7F16\u8F91</span><span data-id="{{AddressID}}" class="dele">\u5220\u9664</span></div>\n                </div>\n            </div>';
            var html2 = '';
            var data = res.Data.List;
            var idn = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    idn++;
                    if (i.IsDefaultAddress == 1) {
                        html2 += html.replace(/{{AddressID}}/g, i.AddressID).replace('{{ReceiverName}}', i.ReceiverName).replace('{{Mobile}}', i.Mobile).replace('{{Address}}', i.Address).replace(/{{default}}/g, 'default_' + idn).replace('{{lasb}}', 'live');
                    } else {
                        html2 += html.replace(/{{AddressID}}/g, i.AddressID).replace('{{ReceiverName}}', i.ReceiverName).replace('{{Mobile}}', i.Mobile).replace('{{Address}}', i.Address).replace(/{{default}}/g, 'default_' + idn).replace('{{lasb}}', '');
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            ;
            idn = null;
            $('.line-cont').html(html2);
            $('.edit').on('click', function () {
                var cur = $(this).data('id');
                thin.edi(cur);
            });
            $('.dele').on('click', function () {
                var cur = $(this);
                var id = $(this).data('id');
                thin.del(cur, id);
            });
            $('label').on('click', function () {
                var cur = $(this);
                var id = $(this).data('id');
                thin.sel(cur, id);
            });
        }
    }, {
        key: 'sel',

        /**
         * 选中event
         */
        value: function sel(thi, id) {
            var thin = this;
            $('label').removeClass('live');
            $(thi).addClass('live');
            thin.reqajax(false, id, function (res) {
                if (res.ResultCode == 6666) {
                    __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('设置成功');
                    false;
                }
            });
        }
    }, {
        key: 'edi',

        /**
         * edit
         */
        value: function edi(thi) {
            location.href = '/editAddress#id=' + thi;
        }
    }, {
        key: 'del',

        /**
         * delete
         */
        value: function del(thi, id) {
            var thin = this;
            __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.comFirmMsg(0, '删除改地址', '删除', '取消', function () {
                thin.reqajax(true, id, function (res) {
                    if (res.ResultCode == 2100 || res.ResultCode == 2200 || res.ResultCode == 2300) {
                        localStorage.clear();
                        location.href = '/login';
                    }
                    if (res.ResultCode == 6666) {
                        __WEBPACK_IMPORTED_MODULE_2__msgBox___default.a.tipMsgBox('删除成功');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                });
            }, '');
        }
    }, {
        key: 'reqajax',
        value: function reqajax(isDel, data, callback) {
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
                url: dataUrls + (isDel ? '/api/My/DeleteAddress' : '/api/My/SetAsDefaultAddress'),
                type: 'post',
                dataType: 'json',
                ContentType: "application/json",
                data: addData,
                success: function success(res) {
                    callback && callback(res);
                }
            });
        }
    }]);

    return setting;
}();

new setting().init();

/***/ })

},[28]);