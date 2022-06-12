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
 * @name getInvertedstring
 * @path {GET} 
 * @param {function} todoController.getTodos - A controller callback
 */

const route = require('./routes/iecho.router')
app.use('/iecho', route);



// catch 404 and forward to error handler
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
      error: {}
    });
  });
  
  
module.exports = app;