var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var servers = require('./routes/server');
//var pay = require('./routes/pay');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser('tbmiboladmin'));
app.use(session({
    secret: 'tbmiboladmin',
    uid: '',
    tokens: '',
    cookie: {
        maxAge: 1800000,
        uid: '',
        tokens: ''
    }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var log = require('./logHelper'); // 日志
// log.use(app);

app.use('/', servers);
//app.use('/pay', pay);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//   unnkown
app.use(function(req, res, next) {
    Object.defineProperty(req, 'ip', {
        get: function() { return this.headers['x-iisnode-REMOTE_ADDR']; }
    });
    next();
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var port = 80;
app.listen(port, function() {
    console.log(port + ':server start')
});

module.exports = app;