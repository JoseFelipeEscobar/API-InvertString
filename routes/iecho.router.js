/**
 * Routers
 * @module iecho.routers
 */

var express = require('express');
var router = express.Router();
const controller=require('../controller/iecho.controller')

/**
 * Sent text to invert and 
 *
 * @name router
 * @path {GET} /iecho
 * @params {string} text : is the text we want to invert
 * @param {function} controller.invertString - A controller callback
 */
router.get('/iecho', controller.invertString);


module.exports = router;