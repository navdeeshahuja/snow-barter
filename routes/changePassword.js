var express = require('express');
var router = express.Router();
var db = require('../config_db');

/* GET home page. */
router.get('/', function(req, res, next) {


  var message = req.query.message || "";

  res.render('changePassword', {message: message});
  
  

});

module.exports = router;
