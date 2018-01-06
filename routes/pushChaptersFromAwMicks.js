var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')

/* GET home page. */
router.post('/', function(req, res, next) {
  
  var chapterId = req.body.chapterId;
  var chapterPassword = req.body.chapterPassword;
  var chapterName = req.body.chapterName;
  var key = req.body.key;

  if( chapterId == "" || chapterId == undefined ||
  	 chapterPassword == "" || chapterPassword == undefined ||
  	 chapterName == "" || chapterName == undefined ||
  	 key == "" || key == undefined || key != variables.pushingPassword)
  {
  	res.send("Please Fuck Off! ERR_CODE 1");
  	return;
  }

  var chapter = new db.chaptersTable();

  chapter[variables.seRField2] = chapterId;
  chapter[variables.cpaField2] = chapterPassword;
  chapter[variables.peeField6] = chapterName;

  chapter.save(function(err, savedObject)
  {
  	if(err)
  	{
  		res.send("Please Fuck Off! ERR_CODE 2");
  		return;
  	}

  	res.send(savedObject);

  });


  

});

module.exports = router;
