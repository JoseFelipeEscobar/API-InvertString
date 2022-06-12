var express = require('express');
var router = express.Router();
const controller=require('../controller/iecho.controller')

/**
 * Sent text to invert and 
 *
 * @name Download Files
 * @path {GET} /iecho
 * @query {text} [string] will limit the download to just these file types.
 */
router.get('/', controller.invertCadena);

module.exports = router;