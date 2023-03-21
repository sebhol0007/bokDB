var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//lägger till ett paket för att hantera cors
var cors = require('cors');

var indexRouter = require('./routes/index');
var bockerRouter = require('./routes/bocker');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//appen använder cors-paketet
app.use(cors());
//ansluter till databasen här
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Sebastien:hej-1223@cluster0.czf1nkv.mongodb.net/bokDatabasen?retryWrites=true&w=majority');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
console.log('Kopplingen lyckades!');
});




app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bocker', bockerRouter);

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
