const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//express server 
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/**
 * Get the invert string named 
 * @name 
 * @path {GET} 
 * @param {function} route - router
 */
const route = require('./routes/iecho.router')
app.use('/', route);



/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  

/**  error handler
  * production error handler   
  * no stacktraces leaked to user
  */
  app.use(function(err, req, res, next) {
    res.status( err.status || 500);
    res.json({
      message: err.message,
      error: "ruta invalida"
    });
  });
  
  
module.exports = app;