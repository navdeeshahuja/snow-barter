var express = require('express');
var router = express.Router();
var db = require('../config_db');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('push', {});
  

});

module.exports = router;
