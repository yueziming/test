import messagePromptBox from '../msgBox.js';
import md5 from 'md5';
import {API} from '../api.js';
import Common from '../commonAjax.js'

var pageCurrent = 1;
var tagHtml = "";

 //计算签名方法
 function signature(thisTimes,nonce) {
    var strins = thisTimes + '' + nonce + '' + (localStorage.getItem('userID') || '').toUpperCase() + '' +(localStorage.getItem('token') || '').toUpperCase()
    var arrayList = strins.split('')
    var sortList = arrayList.sort(function(a, b) { return a.localeCompare(b) })
    var sortString = sortList.join('')
    var md5String = md5(sortString).toUpperCase()
    return md5String
}

$(function(){
    //点击回退
    $(".goback i").off("click").on("click",function(){
        history.back();
    })
    //标签点击
    $("main").delegate(".tag","click",function(){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        let $Parent = $(this).parents(".services");
        let $Target = $Parent.find(".tag.active");
        let scon=[];
        let sid = [];
        for(let i=0;i<$Target.length;i++){
            if($Target.eq(i).attr("data-id")){
                sid.push($Target.eq(i).attr("data-id"));
                scon.push($Target.eq(i).text())
            }
        }
        $Parent.attr("data-id",sid.join(","));
        $Parent.attr("data-con",scon.join(","));
    });
    //自定义标签点击
    $("main").delegate(".tag-des","click",function(){
        messagePromptBox.confirmInput("输入框","请输入自定义标签的内容","确定","取消",()=>{
            console.log("点击了确定按钮");
        },()=>{
            console.log("点击了取消按钮");
        },(msg)=>{
            $(this).parents(".services").find(".tagContent").append("<span class='tag active'>"+msg+"</span>");
            let $Parent = $(this).parents(".services");
            let $Target = $Parent.find(".tag.active");
            let scon=[];
            let sid = [];
            for(let i=0;i<$Target.length;i++){
                sid.push($Target.eq(i).attr("data-id"));
                scon.push($Target.eq(i).text())
            }
            $Parent.attr("data-id",sid.join(","));
            $Parent.attr("data-con",scon.join(","));
        });
    });
    //提交评价
    $(".btn-sasess").off("click").on("click",function(){
        let $Parent = $("article");
        let times = new Date().getTime();
        let nonce = Math.random();
        let condition = {};
        condition.CommentItemList = [];
        for(let i=0;i<$Parent.length;i++){
            let obj = {};
            let $con = $Parent.eq(i);
            obj.OrderDetailID = $con.attr("data-id");
            obj.CommentCategoryID = $con.find(".services").attr("data-id");
            obj.CustomTag = $con.find(".services").attr("data-con");
            obj.CommentPoint = $con.find(".satisfaction").attr("data-star");
            obj.CommentContent = $con.find("textarea").val();
            condition.CommentItemList.push(obj);
        }
        let baseAjax = {
            url:API.COMMITASSESS
        }
        Common.ajax(baseAjax,condition,function(res){
            if(res){
                messagePromptBox.tipMsgBox('评价成功',1000);
                setTimeout(function(){
                    location.href = "/assesssuc";
                },1000);
            }
        })
    });
    //获取订单列表信息
    var getOrderList = ()=>{
        // pageCurrent = 1;
        let orderId = location.search.split("?id=")[1];
        let times = new Date().getTime();
        let nonce = Math.random();
        var data = {
            'signature': signature(times,nonce), // 签名
            // 'memberID': localStorage.getItem('userID') || '', // 用户ID
            'memberID': localStorage.getItem("userID"),
            'timestamp': times, // 时间戳  
            'nonce': nonce, // 随机数
            condition:{
                OrderID:orderId,//订单ID
            }
        }
        var dfd = $.Deferred();
        $.ajax({
            url:API.ORDERDETAIL,
            type:'post',
            dataType:'json',
            data:data,
            success:function(res){
                console.log(res);
                dealHtml(res);
                dfd.resolve();
            },
            error:function(){
                messagePromptBox.tipMsgBox('网络异常',1000);
            }
        });
        return dfd.promise();
    };
    //获取标签列表
    var getTagList = ()=>{
        let status = $(this).attr("data-num");
        let times = new Date().getTime();
        let nonce = Math.random();
        var data = {
            'signature': signature(times,nonce), // 签名
            // 'memberID': localStorage.getItem('userID') || '', // 用户ID
            'memberID': localStorage.getItem("userID"),
            'timestamp': times, // 时间戳  
            'nonce': nonce, // 随机数
        }
        var dfd = $.Deferred();
        $.ajax({
            url:API.TAGLIST,
            type:'post',
            dataType:'json',
            data:data,
            success:function(res){
                dealTag(res);
                dfd.resolve();
            },
            error:function(){
                messagePromptBox.tipMsgBox('网络异常',1000);
            }
        });
        return dfd.promise();
    }
    //生成标签方法
    function dealTag(data){
        if(data && data.ResultCode == "6666"){
            tagHtml = '<section class="services"><p>服务印象</p><p class="tagContent">';
            let tagSpan = '';
            for(let index in data.Data.List){
                // if(data.Data.List[index].IsCustom){
                    tagSpan += '<span class="tag active" data-id="'+data.Data.List[index].DictValue+'">'+data.Data.List[index].Text+'</span>';
                // }else{
                    // tagSpan += '<span class="tag" data-id="'+data.Data.List[index].DictValue+'">'+data.Data.List[index].Text+'</span>';
                // }
            };
            tagHtml += tagSpan;
            tagHtml += '<p><span class="tag-des"><img src="./images/pen.png" style="position: relative;top: .03rem;left: -.02rem;"/>自定义标签</span></p></section>'
        }else{
            messagePromptBox.tipMsgBox(data.Message,1000);
        }
    }
    //生成html方法
    function dealHtml(data){
        if(data && data.ResultCode == "6666"){
            let html = '';
            if(data.Data && data.Data.ObjDetail &&　data.Data.ObjDetail.DetailList){
                for(let index in data.Data.ObjDetail.DetailList){
                    html += '<article data-id='+data.Data.ObjDetail.DetailList[index].OrderDetailID+'><div class="list-theme fweight600">'+data.Data.ObjDetail.DetailList[index].ServiceName+'</div>'+
                               '<section class="satisfaction" data-star="5"><div class="service-satif">服务满意度</div><div class="star-content float-right"><span class="star" onclick="getStars(1)"></span>'+
                               '<span class="star" onclick="getStars(2)"></span><span class="star" onclick="getStars(3)"></span><span class="star" onclick="getStars(4)"></span>'+
                               '<span class="star" onclick="getStars(5)"></span></div><div class="clearboth"></div></section>';
                    html += tagHtml;
                    html += '<section class="service-assess" data-id='+data.Data.ObjDetail.DetailList[index].CommentID+'><p>服务评价</p><p style="width: 100%;height: 1rem;overflow: hidden;"><textarea style="width:100%;resize:none;height:1rem;border-color: #dadada;" placeholder="请输入你对这次服务的评价"></textarea></p>'+
                               '</article>';
                };
                $("main").empty();
                $("main").html(html); 
            }
        }
        else{
            messagePromptBox.tipMsgBox(data.Message,1000);
        }
    }
    $.when(getTagList()).done(getOrderList());
    // getOrderList();
})