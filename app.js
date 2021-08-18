var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var donorRouter = require('./routes/donors');
var nurseRouter = require('./routes/nurse');
var transferRouter = require('./routes/transfer');
var authRouter = require('./routes/Auth');
var storageRouter = require('./routes/storage');
var campsRouter = require('./routes/camps');
var eventRouter= require('./routes/event')
var hospitalRouter = require('./routes/hospital')
var donationRouter = require('./routes/donation')
var rquestRouter = require('./routes/request');
const requestRouter = require('./routes/request');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/donors',donorRouter);
app.use('/nurse',nurseRouter);
app.use('/transfer',transferRouter);
app.use('/Storage',storageRouter);
app.use('/camps',campsRouter);
app.use('/event',eventRouter);
app.use('/hospital',hospitalRouter)
app.use('/Donation',donationRouter)
app.use('/request',requestRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
