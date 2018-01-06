var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

var getResponseFromLink = require('./getResponseFromLink');


router.post('/', function(req, res, next) {

  	res.send("Open Sourced na :(");
  });

module.exports = router;
