const axios = require('axios')
const Router = require('koa-router')
const koaBody = require('koa-body');
const myrequest = require('./modules/base');
let myRequest = new myrequest();

module.exports = function (app) {
    const router = new Router();
    app.use(router.routes());
    app.use(router.allowedMethods());
    
  //首页路由
  router.get('/', async (ctx, next) => {
    // ctx.router available
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetHomeDetail',{});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'首页',
      self:'index',
    };
    ctx.body = await ctx.render('index',cbdata);
  });
  //首页路由
  router.get('/index.html',async (ctx,next)=>{
    // ctx.router available
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetHomeDetail',{});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'首页',
      self:'index',
    };
    ctx.body = await ctx.render('index',cbdata);
  });
  //服务页路由
  router.get('/service.html',async (ctx,next)=>{
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetServiceTypeList',{});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    let abc = abc;
    cbdata.base = {
      title:'服务页',
      self:'service',
    };
    ctx.body = await ctx.render('service',cbdata);
  });
  //服务详情页路由
  router.get('/servicedetail.html',async (ctx,next)=>{
    // ctx.router available
    let id = ctx.query.id;
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetServiceList',{'id':id});
    console.log(data);
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'服务详情页',
      self:'servicedetail',
    };
    console.log(cbdata);
    ctx.body = await ctx.render('servicedetail',cbdata);
  });
  //案例页路由
  router.get('/cases.html',async (ctx,next)=>{
    // ctx.router available
    let cbdata = {};
    let data = {};
    let pagecurrent = ctx.query.page || 1;
    data = await myRequest.post('/api/Home/GetProjectCaseList',{PageNo:pagecurrent,PageSize:20});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'案例页',
      self:'cases',
    };
    if(cbdata.PageInfo){
      cbdata.PageInfo.PageList = [];
      let count = cbdata.PageInfo.PageCount || 0;
      let className = "";
      for(let i=0;i<count;i++){
        if(i == (pagecurrent-1)){
          className = "active";
        }else{
          className = "";
        }
        cbdata.PageInfo.PageList.push(className);
      }
    }
    ctx.body = await ctx.render('cases',cbdata);
  });
  //案例详情页路由
  router.get('/casesdetail.html',async (ctx,next)=>{
    // ctx.router available
    let id = ctx.query.id;
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetProjectCaseById',{'id':id});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'案例详情页',
      self:'casesdetail',
    };
    ctx.body = await ctx.render('casesdetail',cbdata);
  });
  //行业资讯页路由
  router.get('/news.html',async (ctx,next)=>{
    // ctx.router available
    let cbdata = {};
    let data = {};
    let pagecurrent = ctx.query.page || 1;
    let id = ctx.query.id || 'ed52aad2-ff53-4fb5-ac17-552b163dff87';
    //默认为集团行业资讯 IndustryNewsTypeId:ed52aad2-ff53-4fb5-ac17-552b163dff87
    data = await myRequest.post('/api/Home/GetIndustryNewTypeList',{});
    if(data && data.ResultCode=="6666"){
      cbdata.List = data.Data && data.Data.List || {};
    }
    for(let item in cbdata.List){
      cbdata.List[item].active = "";
      if(cbdata.List[item].Key == id){
        cbdata.List[item].active = "active";
      }
    }
    data = await myRequest.post('/api/Home/GetIndustryNewList',{IndustryNewsTypeId:id,PageNo:pagecurrent,PageSize:20});
    if(data && data.ResultCode=="6666"){
      cbdata.Data = data.Data;
    }
    cbdata.base = {
      title:'行业资讯',
      self:'news',
    };
    if(cbdata.Data.PageInfo){
      cbdata.Data.PageInfo.PageList = [];
      let count = cbdata.Data.PageInfo.PageCount || 0;
      let className = "";
      for(let i=0;i<count;i++){
        if(i == (pagecurrent-1)){
          className = "active";
        }else{
          className = "";
        }
        cbdata.Data.PageInfo.PageList.push(className);
      }
    }
    ctx.body = await ctx.render('news',cbdata);
  });
  //行业资讯详情页路由
  router.get('/newsdetail.html',async (ctx,next)=>{
    // ctx.router available
    let id = ctx.query.id;
    let cbdata = {};
    let data = {};
    data = await myRequest.post('/api/Home/GetIndustryNewById',{'id':id});
    if(data && data.ResultCode=="6666"){
      cbdata = data.Data;
    }
    cbdata.base = {
      title:'行业资讯详情页',
      self:'newsdetail',
    };
    ctx.body = await ctx.render('newsdetail',cbdata);

  });
  //关于我们路由
  router.get('/about.html',async (ctx,next)=>{
    // ctx.router available
    ctx.body = await ctx.render('about',{'base':{'title':'关于我们','self':'about'}});
  });
}