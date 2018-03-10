const Koa = require("koa");
const serv = require("koa-static");
const render = require("koa-swig");
const co = require("co");
const path = require("path");
const app = new Koa();
const initRouter = require("./router");

app.use(serv(__dirname+'/dist'));
app.context.render = co.wrap(render(app, {
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', 
    writeBody: false, 
    ext: 'html'
  }));

  initRouter(app);  
app.listen( (process && process.env && process.env.PORT) || 3000, ()=>{
    console.log('服务已启动，port:' + ((process && process.env && process.env.PORT) || 3000));
});
app.on("close",function(e){
    console.log("连接已断开");
});
app.on('error',function(err){
    console.log("链接异常断开")
    console.log(err.stack)
});