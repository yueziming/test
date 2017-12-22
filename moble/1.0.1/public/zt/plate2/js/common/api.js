
var API={
    //获取手机验证码
    GETVALIDATE:"/api/Topic/SendSmsRandomCode",
    //获取初始化数据
    GETINITDATA:"/api/Topic/GetActiveGroupList",
    //获取最新参与记录
    GETNEWRECODE:"/api/Topic/GetNewTopicRecordList",
    //提交表单
    SUBMIT:"/api/Topic/JoinThematicActivities",
    //创建活动订单
    CREATEORDERNO:"/api/Topic/CreateActiveOrder",
    //支付成功后保存订单接口
    SAVEPAYSUCORDER:"/api/Topic/PayCallback"
}