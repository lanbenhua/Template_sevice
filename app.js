const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config.json');
const index = require('./routes/index');
const bizFlow = require('./routes/biz-flow');
const tplData = require('./routes/tpl-data');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('monk')(config.mongodb_uri);
db.get('tpl_data').createIndex({ "createdAt": 1 }, { expireAfterSeconds: config.tpl_data_ttl }); 
db.get('submit_data').createIndex({uid:1,tpl:1},{ unique: true });

const bindDb = (req,res,next)=>{
    req.db = db;
    req.config = config;
    next();
};

const {verifyToken} = require('./routes/token-utils');

app.use('/', bindDb, index);
app.use('/tpl-data', bindDb, tplData);
app.use('/biz-flow', bindDb, verifyToken, bizFlow);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
