let hostnames = window.location.hostname;
window.baseURL = '';
switch (hostnames) {
    case 'localhost':
        window.baseURL = 'http://172.16.194.220';
        // window.baseURL = 'http://testapi.itenbo.com'
        break;
    case 'tm.itenbo.com':

        window.baseURL = 'http://testapi.itenbo.com'
        break;
    case 'm.itenbo.com':

        window.baseURL = 'http://api.itenbo.com'
        break;
    default:
        window.baseURL = 'http://api.itenbo.com'
        break;
}
export var API = {
    //订单列表
    ORDERLIST: baseURL + "/api/My/orderlist",
    //取消订单
    CANCELORDER: baseURL + "/api/My/CancelOrder",
    //订单详情
    ORDERDETAIL: baseURL + "/api/My/GetOrderDetail",
    //标签列表
    TAGLIST: baseURL + "/api/My/CommentTagList",
    //提交评价
    COMMITASSESS: baseURL + "/api/My/SubmitCommentList",
    //提交订单
    COMMITORDER: baseURL + "/api/H5Order/Submit",
    //加入购物车
    ADDSHOPPINGCAR: baseURL + "/api/ShoppingCart/AddCart",
    //获取购物车数据
    GETSHOPPINGCARDATA: baseURL + "/api/ShoppingCart/GetCart",
    //更新购物车
    UPDATESHOPPINGCAR: baseURL + "/api/ShoppingCart/UpdateCart",
    //删除购物车
    DELSHOPPINGCAR: baseURL + "/api/ShoppingCart/DeleteCart",
    //获取默认收货地址
    GETDEFAULTADDR: baseURL + "/api/OrderOther/AddressList",
    //获取个人信息
    GETUSERINFO: baseURL + "/api/My/GetMemberByID",
    //获取我的分享信息
    GETMYSHARE: baseURL + "/api/My/InvitationList"
}