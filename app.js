var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// jsonp response
//
app.get('/api/request' , function(req , res){
  var callbackName = req.query.callback;
  var data = {success: true , message:'response message'}
  var response = callbackName+'('+JSON.stringify(data)+')'
  res.send(response)
})

//
// cros response set
//
function cors(req , res ,checkMethod){
  var origin = req.get('Origin');
  var allowOrigin = '';
  var allowMethod = true ;
  switch(origin){
    case "http://www.server.com":
    allowOrigin = origin
    break;
  }
  if(checkMethod){
    var method = req.get('Access-Control-Request-Method')
    allowMethod = 'put,get,post'.indexOf(method.toLowerCase()) > -1 ? true : false ;
    console.log(method+"-"+allowMethod)
  }
  if(allowOrigin && allowMethod){
    res.set('Access-Control-Allow-Origin' , allowOrigin);
    res.set('Access-Control-Allow-Methods' , 'PUT, POST')
    return true;
  }else{
    return false ;
  }
}

//
// simple cors request
//
app.get('/api/cors' , function(req , res){
  var allow = cors(req , res);
  if(allow){
    var data = {success: true , message:'response message'}
    res.json(data)
  }else{
    res.end()
  }
});

//
// preflight cors request
//
app.options('/api/cors' , function(req , res){
  cors(req , res , true);
  res.end();
})

app.put('/api/cors' , function(req , res){
  var allow = cors(req , res);
  if(allow){
    var data = {success: true , message:'response message'}
    res.json(data)  
  }else{
    res.end();
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



module.exports = app;
